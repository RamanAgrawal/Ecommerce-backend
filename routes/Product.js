const express = require('express');
const { createProduct, getProducts } = require('../controller/Product');

const router = express.Router();

router.post('/', createProduct)
    .get('/', getProducts);

exports.router = router;