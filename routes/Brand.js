const express=require('express');
const {createBrand,getBrands}=require('../controller/Brand');

const router=express.Router();

router.get('/',getBrands)
.post('/',createBrand)

exports.router=router;