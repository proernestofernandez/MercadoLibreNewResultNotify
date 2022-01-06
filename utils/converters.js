var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Item = mongoose.model('item');
//const item_categories = require('../models/items');


exports.ml_item_to_item = async function (item) {

    var new_item = Object.assign(new Item);
    new_item.id_item_ml = item.id;
    new_item.titulo = item.title;
    new_item.precio = item.price;
    new_item.unidad = item.currency_id;
    new_item.condicion = item.condition;
    new_item.link = item.permalink;
    new_item.lugar = item.address.city_name;
    new_item.fecha_fin = item.stop_time;
    new_item.item_category = "CARS_MOTORCYCLES_VANS";
    new_item.specific_item = "algo";
    return new_item;
};


exports.newFormattedDate = function () {

    function twoDigitPad(num) {
        return num < 10 ? "0" + num : num;
    }

    let patternStr = 'yyyy-MM-dd HH:mm tt';

    var date = new Date().toLocaleString("iso", { timeZone: "America/Montevideo" });

    var yyyy = date.split("/")[2].split(",")[0],
        MM = twoDigitPad(date.split("/")[0]),
        dd = twoDigitPad(date.split("/")[1]),
        HH = twoDigitPad(date.split(", ")[1].split(":")[0]),
        mm = twoDigitPad(date.split(":")[1]),
        tt = twoDigitPad(date.split(" ")[2]);

    // checks to see if month name will be used
    patternStr = patternStr
        .replace('HH', HH)
        .replace('mm', mm)
        .replace('MM', MM)
        .replace('dd', dd)
        .replace('yyyy', yyyy)
        .replace('tt', tt);

    return patternStr;
};
