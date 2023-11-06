const express = require('express');
const { getOrdersByUser, createOrder, updateOrder, getAllOrders } = require('../controller/Order');
const router = express.Router();

router.get('/', getAllOrders)
    .get('/own', getOrdersByUser)
    .post('/', createOrder)
    .patch('/:id', updateOrder)

exports.router = router;