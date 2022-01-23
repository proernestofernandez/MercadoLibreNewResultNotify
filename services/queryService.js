const mongoose = require('mongoose');
const Query = mongoose.model('query');
const ItemQuery = mongoose.model('item_query');
const Item = mongoose.model('item');

const https = require('https');
const users_service = require('./userService');
const converters = require('../utils/converters');
var ObjectId = require('mongoose').Types.ObjectId;
const emailGmail = require('../utils/emailGmail');



//GET - Retorna un query con el id proporcionado
exports.find_query_by_id = async (id) => {
    console.log("JOJOJ")
    console.log(id)
    const query = await Query.findById(id);
    return query;
};


//GET - Retorna todas las queries con el nickname del creador proporcionado
exports.findQueriesByParams = async (creator_nickname) => {
    let queries = [];
    if (!creator_nickname) {
        queries = await Query.find(); // will return Worf and La Forge
    } else {
        queries = await Query.find({ 'usuario_creacion': creator_nickname })
    }
    return queries;
};


//POST - Create query in DB
exports.add_query = async (query_param) => {

    const new_query = Object.assign(new Query, query_param);

    return await new_query.save();
};


isUpdateItems = async (itemML, oldItemResult) => {
    let updateItem = false;
    if ((oldItemResult?.id_item_ml === itemML?.id_item_ml) && (
        oldItemResult?.titulo !== itemML?.titulo ||
        oldItemResult?.precio !== itemML?.precio ||
        oldItemResult?.specific_item !== itemML?.specific_item)
    ) {
        updateItem = true;
        console.log("Hay diferencia")
    }
    return updateItem;
}

//Create item_query in DB
exports.add_items_query = async (items, query) => {
    var newItemQuery;
    const user = await users_service.find_user_by_nickname(query.usuario_creacion);
    console.log(user)
    const oldItemsQueryResult = await ItemQuery.find({ query: new ObjectId(query._id), user: new ObjectId(user._id) });
    var updateItemList = [];
    var newItemList = [];

    await items.reduce(async (preProm, itemResult) => {
        await preProm
        var saveItem = true;

        const itemML = await converters.ml_item_to_item(itemResult);

        await oldItemsQueryResult.reduce(async (preProm2, itemQueryResult) => {
            await preProm2;
            const oldItemResult = await Item.findOne({ _id: new ObjectId(itemQueryResult.item) });
            if ((oldItemResult?.id_item_ml === itemML?.id_item_ml)) {
                saveItem = false;
            }
            if (await isUpdateItems(itemML, oldItemResult)) {
                const changedItem = {
                    ...items,
                    oldTitulo: oldItemResult.titulo,
                    oldPrecio: oldItemResult.precio,
                    oldSpecificItem: oldItemResult.specific_item
                }
                oldItemResult.titulo = itemML?.titulo;
                oldItemResult.precio = itemML?.precio;
                oldItemResult.specific_item = itemML?.specific_item;
                await oldItemResult.save();
                // TODO notificar POR mail;
                updateItemList.push(changedItem);
            }
            return Promise.resolve()
        }, Promise.resolve());

        if (saveItem) {
            const savedItem = await itemML.save();
            newItemQuery = await Object.assign(new ItemQuery);
            newItemQuery.query = query;
            newItemQuery.item = savedItem;

            newItemQuery.user = user;
            await newItemQuery.save();
            // TODO notificar POR mail;
            newItemList.push(savedItem);
        }
        return Promise.resolve()
    }, Promise.resolve());

    if (updateItemList.length || newItemList.length) {
        console.log("Enviando mails")
        emailGmail.sendNotificationEmail(updateItemList, newItemList, query, user);
    }
};

//PUT - Excecute specific query BD
exports.execute_query = async (query) => {

    var result = query.path.match(/https:\/\/(.*.com)(.*)/)
    hostname_param = result[1]
    path_param = result[2] + "q=" + query.query

    if (typeof query.parameters !== 'undefined') {
        query.parameters.forEach(function (value, key) {
            path_param += "&" + key + "=" + value
        });
    }

    const options = {
        hostname: hostname_param,
        port: 443,
        path: path_param,
        method: 'GET'
    }
    return await doQuery(options, query);
};



exports.execute_all_queries_from_db = async () => {

    const savedQueries = await Query.find();
    savedQueries.forEach(query => {
        this.execute_query(query);
    });
};


exports.find_query_by_params = function (nickname, callback) {

    if (!nickname) {
        return Query.find(function (err, user) {
            if (err) callback(err);
            callback(null, user);
        })
    } else {
        return Query.find({ 'usuario_creacion': nickname }, function (err, user) {
            if (err) callback(err);
            callback(null, user);
        })
    }
};


doQuery = async (options, query) => {
    console.log(options)
    console.log(query)
    return new Promise(resolve => {


        const req = https.request(options, res => {
            var body = "";

            res.on("data", (chunk) => {
                body += chunk;
            });

            res.on('end', async function () {
                var list = JSON.parse(body);
                await this.add_items_query(list.results, query);

                resolve(list)


            }.bind(this));

            res.on('error', error => {
                console.error(error)
            })
        })
        req.end()


    });
}