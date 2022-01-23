const nodemailer = require('nodemailer');
require('dotenv').config()


//GET - Retorna un query con el id proporcionado
exports.sendNotificationEmail = async (updateItemList, newItemList, query, user) => {

  html = "";


  html += " ACTUALIZACIONES: <br>";

  await updateItemList.reduce(async (preProm, item) => {
    await preProm;
    if (item.titulo !== item.oldTitulo) {
      html = html + item.oldTitulo + " => " + item.titulo + "<br>"
    }
    if (item.precio !== item.oldPrecio) {
      html = html + item.oldPrecio + " => " + item.precio + "<br>"
    }
    if (item.specific_item !== item.oldSpecificItem) {
      html = html + item.oldSpecificItem + " => " + item.specific_item + "<br>"
    }
    html = html + item.titulo + " " + item.precio + " " + item.link + " <br> <br>"
    return Promise.resolve()
  }, Promise.resolve());

  html = html + " <br> NUEVOS: <br>";
  await newItemList.reduce(async (preProm2, item2) => {
    await preProm2;
    html = html + item2.titulo + " " + item2.precio + " " + item2.link + "<br> <br>"
    return Promise.resolve()
  }, Promise.resolve());


  html = html + " <br> QUERY: <br>";
  html = html + query.query;

  let transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  });

  message = {
    to: user.email,
    subject: "Cambos en " + query.nombre,
    // text: "Hello SMTP Email"
    html: "<h1>Cambios</h1>\n " + html
  }

  transport.sendMail(message, function (err, info) {
    if (err) {
      console.log("MAL")
      console.log(err)
    } else {
      console.log(info);
      console.log("OK")
    }
  })
};

