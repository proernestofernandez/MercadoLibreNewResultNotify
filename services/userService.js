const mongoose = require('mongoose');
require("../models/user");
const crypto = require('crypto');


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
    let user = await User.findOne({ 'nickname': nickname });
    return user;
};

//GET - Retorna un usuario con el email proporcionado
exports.find_user_by_email = async (email) => {
    let user = await User.findOne({ 'email': email });
    return user;
};

//POST - Crea un usuario en la BD
exports.add_user = async (user_param) => {
    try {
        const new_user = await Object.assign(new User, user_param)
        new_user.password = crypto.createHash("sha256").update(user_param.password).digest("hex")
        const saved_user = await new_user.save();
        return saved_user;
    } catch (err) {
        return "Error al crear el usuario. Puede que ya exista el nickname o email proporcionado.";
    }

};

exports.test_user;

