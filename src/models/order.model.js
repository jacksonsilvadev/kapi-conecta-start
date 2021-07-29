const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema(
  {
    order_number: {
      type: String,
      required: true,
    },
    billing_address: {
      type: String,
      required: true,
    },
    shipping_address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['openned', 'invoiced', 'separation', 'canceled', 'closed'],
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    products: [
      {
        product_id: {
          type: String,
        },
        quantity: {
          type: Number,
        },
        unit_price: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', schema);
