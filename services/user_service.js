const mongoose = require('mongoose');
const user = require("../models/user");
const query = require("../models/query");
const item = require("../models/item");
const vehicle = require("../models/vehicle");
const item_query = require("../models/item_query");
const User = mongoose.model('user');


//GET - Retorna un usuario con el id proporcionado
exports.find_all_users = async () => {
    let users = await User.find()
    return users;
};

//GET - Retorna un usuario con el id proporcionado
exports.find_user_by_id = async (id) => {
    let user = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
        user = await User.findById(id)
    };
    return user;
};


//GET - Retorna un usuario con el nickname proporcionado
exports.find_user_by_nickname = async (nickname) => {
    let user;
    if (!nickname) {
        user = await User.findOne();
    } else {
        user = await User.findOne({ 'nickname': nickname });
    }
    return user;
};


//POST - Crea un usuario en la BD
exports.add_user = async (user_param) => {
    try {
        const new_user = await Object.assign(new User, user_param)
        const saved_user = await new_user.save();
        return saved_user;
    } catch (err) {
        return "Error al crear el usuario. Puede que ya exista el nickname o email proporcionado.";
    }

};

exports.test_user;

