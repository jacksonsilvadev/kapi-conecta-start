const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema(
  {
    sku: {
      type: String,
      required: true,
    },
    ean: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    available: {
      type: Number,
      required: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model('Product', schema);
