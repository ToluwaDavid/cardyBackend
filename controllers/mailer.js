import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import ENV from "../config.js";

//https://ethereal.email/create
// let nodeConfig = {
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false,
//   auth: {
//     user: ENV.EMAIL,
//     pass: ENV.PASSWORD,
//   },
// };

// let transporter = nodemailer.createTransport(nodeConfig);

// let MailGenerator = new Mailgen({
//   theme: "default",
//   product: {
//     name: "Mailgen",
//     link: "https://mailgen.js/",
//   },
// });

// /** POST: http://localhost:8080/api/registerMail
//  *
//  * @param : {
//  * 'username' : "example123",
//  * 'password' : "admin123",
//  * 'text' : ""
//  * 'subject' : "",
//  * }
//  */
// export const registerMail = async (req, res) => {
//   const { username, userEmail, text, subject } = req.body;

//   //body of the email
//   var email = {
//     body: {
//       name: username,
//       intro: text || "Welcome to bizcard, we are excited to have you here",
//       outro:
//         "Need help, or have any question ? Just reply this mail and we will love to help     ",
//     },
//   };
//   var emailBody = MailGenerator.generate(email);
//   let message = {
//     from: ENV.EMAIL,
//     to: userEmail,
//     subject: subject || "Signup Sucessful",
//     html: emailBody,
//   };

//   //Send mail
//   transporter
//     .sendMail(message)
//     .then(() => {
//       return res
//         .status(201)
//         .send({ msg: "You should receive an email from us" });
//     })
//     .catch((error) => res.status(500).send({ error }));
// };

export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });
  let config = {
    service: "gmail",
    auth: {
      user: ENV.USER,
      pass: ENV.USERPASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let email = {
    body: {
      name: username,
      intro: text || "Welcome to Cardly, we are excited to have you here",
      outro:
        "Need help, or have any question ? Just reply this mail and we will love to help     ",
    },
  };
  let emailBody = MailGenerator.generate(email);
  let message = {
    from: ENV.EMAIL,
    to: userEmail,
    subject: subject || "Signup Sucessful",
    html: emailBody,
  };
  //Send mail
  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(201)
        .send({ msg: "You should receive an email from us" });
    })
    .catch((error) => res.status(500).send({ error }));
};
