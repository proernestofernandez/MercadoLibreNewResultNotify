var mongoose = require('mongoose');
const Item = mongoose.model('item');
var vehicle = mongoose.model('vehicle');
var query = mongoose.model('query');
var item_query = mongoose.model('item_query');


//GET - Retorna un usuario con el id proporcionado
exports.find_item_by_id = function (id, callback) {
    User.findById(id, function (err, item) {
        if (err) callback(err);
        callback(null, item);
    })
};


//GET - Retorna items con el el query id proporcionado
exports.findItemsByParams = function (query_id) {

    let items = [];
    if (!query_id) {
        items = await Item.find({ 'usuario_creacion': creator_nickname })
    }
    if (!query_id) {
        User.find(function (err, user) {
            if (err) callback(err);
            callback(null, user);
        })
    } else {
        User.find({ 'nickname': nickname }, function (err, user) {
            if (err) callback(err);
            callback(null, user);
        })
    }
};


//POST - Crea un usuario en la BD
exports.add_item = function (user_param, callback) {

    review.body = req.body.body;
    review.save()
        .then((result) => {
            User.findOne({ username: review.username }, (err, user) => {
                if (user) {
                    // The below two lines will add the newly saved review's 
                    // ObjectID to the the User's reviews array field
                    user.reviews.push(review);
                    user.save();
                    res.json({ message: 'Review created!' });
                }
            });
        })
        .catch((error) => {
            res.status(500).json({ error });
        });



    const new_user = Object.assign(new User, user_param)

    new_user.save(function (err, saved_user) {
        if (err) callback(new Error("No se pudo crear el usuario"));
        callback(null, saved_user)
    });
};

