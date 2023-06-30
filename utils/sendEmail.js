const nodemailer = require("nodemailer");

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "hennadiiborysevych@meta.ua",
    pass: process.env.META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

module.exports = transport;
