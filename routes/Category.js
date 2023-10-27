const express = require('express');
const { createCategory, getCategories } = require('../controller/Category');

const router = express.Router();

router.get('/', getCategories)
    .post('/', createCategory)

exports.router = router;