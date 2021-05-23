var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var Item  = mongoose.model('item');
//const item_categories = require('../models/items');


exports.ml_item_to_item = async function(item) {
    
    var new_item = Object.assign(new Item);
    new_item.id_item_ml = item.id;
    new_item.titulo =    item.title;
    new_item.precio =  item.price;
    new_item.unidad =  item.currency_id;
    new_item.condicion =  item.condition;
    new_item.link =  item.permalink;
    new_item.lugar =   item.address.city_name;
    new_item.fecha_fin =  item.stop_time;
    new_item.item_category = "CARS_MOTORCYCLES_VANS";
    new_item.specific_item = "algo";
    return new_item;
};