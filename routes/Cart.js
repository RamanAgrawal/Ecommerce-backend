const express = require('express');
const { getUserCart, addToCart, removeFromCart, updateCartItem } = require('../controller/Cart');

const router = express.Router();

router.get('/:id',getUserCart)
.post('/',addToCart)
.delete('/:id',removeFromCart)
.patch('/:id',updateCartItem)

exports.router = router;