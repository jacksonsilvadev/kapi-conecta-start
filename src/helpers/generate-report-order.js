const pdf = require('pdf-creator-node');
const fs = require('fs');
const path = require('path');

const directoryPath = path.resolve(__dirname, '../templates');

module.exports = async ({ order }) => {
  // Read HTML Template
  const html = fs.readFileSync(`${directoryPath}/order-pdf.html`, 'utf8');
  const options = {
    format: 'A3',
    orientation: 'portrait',
    border: '10mm',
    header: {
      height: '45mm',
      contents: '<div style="text-align: center;">Author: Jackson Silva</div>',
    },
  };

  const document = {
    html,
    data: {
      order,
      products: order.products
    },
    path: `./src/reports/${order._id}.pdf`,
    type: '',
  };

  return pdf.create(document, options);
};
