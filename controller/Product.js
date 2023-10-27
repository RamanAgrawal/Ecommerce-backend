// Import the Product model from your project
const { Product } = require("../model/Product");

// Controller function for creating a new product
exports.createProduct = async (req, res) => {
    try {
        // Create a new product instance using the request body
        const product = new Product(req.body);

        // Save the product to the database and await the response
        const response = await product.save();

        // Respond with a 201 status code and the saved product
        res.status(201).json(response);
    } catch (error) {
        // If an error occurs, log it and respond with a 400 status code and the error message
        console.log(error);
        res.status(400).json(error.message);
    }
}

// Controller function for retrieving products
exports.getProducts = async (req, res) => {
    // Initialize query and totalProductQuery to retrieve products
    let query = Product.find();
    let totalProductQuery = Product.find();

    // Apply filters if specified in the query parameters
    if (req.query.category) {
        query = query.where({ category: req.query.category });
        totalProductQuery = totalProductQuery.where({ category: req.query.category });
    }
    if (req.query.brand) {
        query = query.where({ brand: req.query.brand });
        totalProductQuery = totalProductQuery.where({ brand: req.query.brand });
    }
    if (req.query._sort && req.query._order) {
        // Sort the products based on query parameters
        query = query.sort({ [req.query._sort]: req.query._order });
    }

    // Count the total number of products that match the query
    const totalProducts = await totalProductQuery.countDocuments().exec();

    if (req.query._page && req.query._limit) {
        // Implement pagination if _page and _limit parameters are provided
        const pageSize = parseInt(req.query._limit);
        const page = parseInt(req.query._page);
        query = query.skip((page - 1) * pageSize).limit(pageSize);
    }

    try {
        // Execute the query and retrieve the products
        const products = await query.exec();

        // Set the 'X-Total-Count' header to indicate the total number of products
        res.set('X-Total-Count', totalProducts);

        // Respond with a 200 status code and the retrieved products
        res.status(200).json(products);
    } catch (error) {
        // If an error occurs, log it and respond with a 400 status code and the error message
        console.log(error);
        res.status(400).json(error.message);
    }
}


exports.getProductById = async (req, res) => {
    try {
        // Retrieve the product by id
        const product = await Product.findById(req.params.id).exec();

        // Respond with a 200 status code and the retrieved product
        res.status(200).json(product);
    } catch (error) {
        // If an error occurs, log it and respond with a 400 status code and the error message
        console.log(error);
        res.status(400).json(error.message);
    }
}

exports.updateProduct = async (req, res) => {
    try{
        const product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true}).exec();
        res.status(200).json(product);
    }catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
}