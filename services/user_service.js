var mongoose = require('mongoose');
var User  = mongoose.model('user');


//GET - Retorna un usuario con el id proporcionado
exports.find_user_by_id = function(id, callback) {
    User.findById(id, function (err, user) {
        if(err) callback(err);
        callback(null,user);
    })
};


//GET - Retorna un usuario con el nickname proporcionado
exports.find_user_by_params = async (nickname) => {
    let user;
    if (!nickname) {
        user = await User.findOne();
    }else {
        user = await User.findOne({'nickname': nickname });
    }
    return user;
};


//POST - Crea un usuario en la BD
exports.add_user = function(user_param, callback) {

    const new_user = Object.assign(new User, user_param)
    
    new_user.save( function(err, saved_user) {
        if(err) callback(new Error("No se pudo crear el usuario"));
        callback(null,saved_user)
    });
};


//TEST
exports.test_user = async () => {

    await console.log("AIGA");
    await setTimeout(function() { console.log("AIGA 1"); }, 3000);
    await console.log("AIGA 2");
return "AIGA";
};

exports.test_user;

