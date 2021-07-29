const express = require('express');

const router = express.Router();

const orderController = require('../../controllers/order.controller');

router.get('/order', orderController.listAll);
router.get('/order-without-pagination', orderController.listAllWithoutPaginate);
router.get('/order/:id', orderController.getById);
router.post('/order', orderController.create);
router.patch('/order/:id', orderController.update);
router.delete('/order/:id', orderController.delete);

module.exports = router;
