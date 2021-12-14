const { body, validationResult } = require('express-validator');
const jwt = require("jwt-simple");
const crypto = require('crypto');
const moment = require("moment");
const mongoose = require('mongoose');
const LoginToken = mongoose.model('logintoken');
const users_service = require('../services/userService');



exports.login = async (req, res, next) => {

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    let loginParams = req.body;

    let user = await users_service.find_user_by_nickname(loginParams.nickname);
    if (!user) {
      user = await users_service.find_user_by_email(loginParams.email);
    }
    if (!user || user.password !== crypto.createHash("sha256").update(loginParams.password).digest("hex")) {
      return res.status(401).send({
        errors: [{
          msg: "Incorrect email/password",
          param: "email/password",
          location: "body"
        }]
      })
    }
    // Creo token nuevo
    let token;
    token = createToken(user);

    let newloginToken = new LoginToken();
    newloginToken.token = token;
    newloginToken.email = user.email;

    let savedLoginToken = await LoginToken.findOneAndUpdate({ 'email': user.email }, { 'token': token });

    if (!savedLoginToken) {
      savedLoginToken = await newloginToken.save();
    }

    res.status(200).send({ token: token })
    console.log('Logged in ' + user.email + ' success.')
  } catch (err) {
    return next(err)
  }
}


exports.logout = async function (req, res, next) {
  userCredentials = req.body;
  try {
    await LoginToken.findOneAndDelete({ 'email': userCredentials.email });
    res.status(200).send("Sesión cerrada.");
  } catch (err) {
    console.log(err);
    return next(err);
  }
}


exports.ensureAuthenticated = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .send({
        errors: [{
          msg: "Your request does not have an authorization header.",
          param: "Authorization",
          location: "Header"
        }]
      });
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    var payload = jwt.decode(token, process.env.TOKEN_SECRET);
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({
        errors: [{
          msg: "The token has expired.",
          param: "Authorization",
          location: "Header"
        }]
      });
    }
  } catch (e) {
    return res.status(500).send({
      errors: [{
        msg: "An error has occurred: (ensureAuthenticated) - " + e.message,
        param: "Authorization",
        location: "Header"
      }]
    });
  }
  const email = payload.sub;

  const savedToken = await LoginToken.findOne({ 'email': email });

  // Comparo con el token guardado en tokens.txt
  if (!savedToken || savedToken.token !== token) {
    return res.status(401).send({
      errors: [{
        msg: "The token has expired.",
        param: "Authorization",
        location: "Header"
      }]
    });
  } else {
    next();
  }
};


exports.getUserFromToken = function (AuthHeader) {
  const authorization = AuthHeader.split(" ")[1];
  const decoded = jwt.decode(authorization, process.env.TOKEN_SECRET);
  return decoded.sub;
};

exports.validate = (method) => {
  switch (method) {
    case 'login': {
      return [
        body('password', 'password doesnt exists').exists(),
        body('nickname', 'Invalid nickname').exists() || body('email', 'Invalid email').exists().isEmail(),
      ]
    }
  }
}

var createToken = function (user) {
  var payload = {
    sub: user.email,
    iat: moment().unix(),
    exp: moment().add(1, "days").unix(),
  };
  return jwt.encode(payload, process.env.TOKEN_SECRET);
};