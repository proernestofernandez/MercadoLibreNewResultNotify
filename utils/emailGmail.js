const nodemailer = require('nodemailer');
require('dotenv').config();

//GET - Retorna un query con el id proporcionado
exports.sendNotificationEmail = async (updateItemList, newItemList, query, user) => {
  console.log(updateItemList);
  console.log(newItemList);
  console.log(query);
  console.log("🚀 ~ file: emailGmail.js ~ line 9 ~ user", user)
  html = " ACTUALIZACIONES: <br>";

  await updateItemList.reduce(async (preProm, item) => {
    await preProm;
    html = html + item.titulo + " " + item.precio + " <br> "
    return Promise.resolve()
}, Promise.resolve());

html = html + " <br> NUEVOS: <br>";
await newItemList.reduce(async (preProm2, item2) => {
  await preProm2;
  html = html + item2.titulo + " " + item2.precio + "<br> "
  return Promise.resolve()
}, Promise.resolve());

html = html + " <br> QUERY: <br>";
html = html + query.query;

  let transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user:  process.env.MAIL_USER,
      pass:  process.env.MAIL_PASSWORD
    }
  });

    message = {
      from: "from-example@email.com",
      to: "chisteoriental@mailinator.com",
      subject: "CAMBIOS",
      // text: "Hello SMTP Email"
      html: "<h1>Cambios</h1>\n "+ html
  }
      console.log("🚀 ~ file: emailGmail.js ~ line 44 ~ html", html)

  transport.sendMail(message, function(err, info) {
      if (err) {
          console.log("MAL")
        console.log(err)
      } else {
        console.log(info);
        console.log("OK")
      }
  })
};

