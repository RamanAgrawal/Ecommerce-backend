const { request } = require('express');
const {Order} =require('../model/Order');


exports.getOrdersByUser=async(req,res)=>{
    const {id}=req.params;
    try{
        const orders=await Order.find({user:id}).populate('user').populate('items.product');
        console.log(orders);
        res.status(200).json(orders);
    }catch(error){
        res.status(400).json({message:error.message});
    }
}

exports.getAllOrders=async(req,res)=>{
    let query = Order.find();
    let totalOrderQuery = Order.find();

    // Apply filters if specified in the query parameters
    if (req.query._sort && req.query._order) {
        // Sort the Orders based on query parameters
        query = query.sort({ [req.query._sort]: req.query._order });
    }

    // Count the total number of Orders that match the query
    const totalOrders = await totalOrderQuery.countDocuments().exec();

    if (req.query._page && req.query._limit) {
        // Implement pagination if _page and _limit parameters are provided
        const pageSize = parseInt(req.query._limit);
        const page = parseInt(req.query._page);
        query = query.skip((page - 1) * pageSize).limit(pageSize);
    }

    try {
        // Execute the query and retrieve the Orders
        const Orders = await query.populate('items.product').exec();

        // Set the 'X-Total-Count' header to indicate the total number of Orders
        res.set('X-Total-Count', totalOrders);

        // Respond with a 200 status code and the retrieved Orders
        res.status(200).json(Orders);
    } catch (error) {
        // If an error occurs, log it and respond with a 400 status code and the error message
        console.log(error);
        res.status(400).json(error.message);
    }
}

exports.createOrder=async(req,res)=>{ //create order
    try{
        const order=new Order(req.body);
        const doc=await order.save();
        console.log(order);
        res.status(201).json(doc);
    }catch(error){
        res.status(400).json({message:error.message});
    }
}
exports.updateOrder=async(req,res)=>{
    const {id}=req.params;
    console.log(req.body,req.params);
    try {
        const order=await Order.findByIdAndUpdate(id,req.body,{new:true}).populate('items.product').populate('user');
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}