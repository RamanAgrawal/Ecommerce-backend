"use strict";
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "update.mycommerce@gmail.com",
    pass: process.env.MAIL_PSW,
  },
});
exports.sendMail = async ({ to, subject, text, html }) => {
  const info = await transporter.sendMail({
    from: '"MY-Commerce" <update.mycommerce@gmail.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  });
  return info;
};
