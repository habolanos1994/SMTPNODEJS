const nodemailer = require("nodemailer");

async function sendsmtp(smtpto , smtpmessage) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.global.dish.com",
      tls: {
        rejectUnauthorized: false,
      },
      port: 25,
      secure: false,
      auth: {
        user: "",
        pass: "",
      },
    });

    transporter.sendMail({
      from: '"Test2Engineer" <smtp@ElpTE.dish.com>',
      to: smtpto,
      subject: "automated smtp email",
      text: smtpmessage,
    })
    .then(info => {
      console.log("Message sent: %s", info.messageId);
      resolve(info.messageId);
    })
    .catch(err => {
      console.error(`Error sending email: ${err.message}`);
      reject(err);
    });
  });
}

module.exports = { sendsmtp };
