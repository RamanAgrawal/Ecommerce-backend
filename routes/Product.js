const express = require('express');
const { createProduct, getProducts, getProductById, updateProduct } = require('../controller/Product');

const router = express.Router();

router.post('/', createProduct)
    .get('/', getProducts)
    .get('/:id', getProductById)
    .patch('/:id',updateProduct)

exports.router = router;