const express = require('express');

const ordersRoute = require('./orders/order.routes');
const productsRoute = require('./products/product.routes');

const routes = express.Router();

routes.use(productsRoute);
routes.use(ordersRoute);

module.exports = routes;
