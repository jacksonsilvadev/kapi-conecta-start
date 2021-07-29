const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 465,
  secure: true,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_PASSWORD
  }
});

module.exports = async ({ order }) => {
  const mailOptions = {
    from: 'jackson.rodrigues@linkapi.com.br',
    to: 'jackson.rodrigues@linkapi.com.br',
    subject: `Order created ${order._id}`,
    text: `Order created on API ${order._id} with ${order.products.length} products`
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        logger.error(error);
        return reject(error);
      }
      logger.info(`${order._id} email sent ${info.response}`);
      return resolve(true);

    });
  });
};
