const orderModel = require('../models/order.model');
const productModel = require('../models/product.model');
const mongoService = require('../services/mongo.service');
const orderService = require('../services/order.service');
const logger = require('../utils/logger');

exports.listAll = async (request, response) => {
  try {
    const page = Number(request.query.page || 1);
    const limit = Number(request.query.limit || 20);
    const skip = limit * (page - 1);
    const { status } = request.query;
    const query = {};

    if (limit > 10000) {
      return response
        .status(422)
        .send({ message: 'Limit is higher than 10000.' });
    }

    if (status) {
      query.status = status;
    }

    const orders = await mongoService.get(query, skip, limit, orderModel);

    if (orders.length < 1) {
      return response.status(204).send({ message: 'No orders to return' });
    }

    const count = await orderModel.countDocuments();

    const pageNumber = Math.ceil(count / limit);
    const hasMorePages = pageNumber > page;

    return response
      .status(200)
      .send({ orders, totalPages: pageNumber, hasMorePages });
  } catch (e) {
    logger.error(e);
    return response
      .status(500)
      .send({ message: 'Internal error when try recovered datas!' });
  }
};

exports.listAllWithoutPaginate = async (request, response) => {
  try {
    const orders = await mongoService.getAll({}, orderModel);

    if (orders.length < 1) {
      return response.status(204).send({ message: 'No orders to return' });
    }

    return response.status(200).send(orders);
  } catch (e) {
    logger.error(e);
    return response
      .status(500)
      .send({ message: 'Internal error when try recovered datas!' });
  }
};

exports.getById = async (request, response) => {
  try {
    const { id } = request.params;
    const order = await mongoService.getById(id, orderModel);

    if (!order) {
      return response.status(404).send({ message: 'Order not Found!' });
    }

    return response.status(200).send(order);
  } catch (e) {
    logger.error(e);
    return response
      .status(500)
      .send({ message: 'Internal error when try recovered datas!' });
  }
};

exports.create = async (request, response) => {
  try {
    const { body } = request;
    const { products } = body;

    let hasStock = true;
    const productsUpdate = await Promise.all(products.map(async (pct) => {
      const product = await mongoService.getById(pct.product_id, productModel);

      if (product.available < pct.quantity) {
        hasStock = false;
      }
      return {
        available: product.available,
        id: product._id,
        qty: pct.quantity,
      };
    }));

    if (!hasStock) {
      return response
        .status(422)
        .send({ message: 'The order has unavailable products!' });
    }

    const orderCreated = await mongoService.post(body, orderModel);

    const order = await mongoService.getById(orderCreated._id, orderModel);

    await orderService.generateReportAndSendEmail({ order });

    await Promise.all(productsUpdate.map(async (pct) => {
      const available = pct.available - pct.qty;
      await mongoService.patch({ available }, pct._id, productModel);
    }));

    return response.status(201).send({ order });
  } catch (e) {
    logger.error(e);
    return response
      .status(500)
      .send({ message: 'Internal error when try recovered datas!' });
  }
};

exports.update = async (request, response) => {
  try {
    const { id } = request.params;
    const { body } = request;

    const order = await mongoService.patch(body, id, orderModel);

    return response.status(200).send({ order });
  } catch (e) {
    logger.error(e);
    return response
      .status(500)
      .send({ message: 'Internal error when try recovered datas!' });
  }
};

exports.delete = async (request, response) => {
  try {
    const { id } = request.params;

    await mongoService.delete(id, orderModel);

    return response.status(200).send(true);
  } catch (e) {
    logger.error(e);
    return response
      .status(500)
      .send({ message: 'Internal error when try recovered datas!' });
  }
};

exports.generateReportAndSendEmail = async (request, response) => {
  try {
    const { id } = request.params;

    const product = await mongoService.delete(id, productModel);

    return response.status(200).send({ product });
  } catch (e) {
    logger.error(e);
    return response
      .status(500)
      .send({ message: 'Internal error when try recovered datas!' });
  }
};
