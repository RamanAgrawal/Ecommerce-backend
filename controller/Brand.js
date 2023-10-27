// Import the Brand model from your project
const { Brand } = require("../model/Brand");

// Controller function for retrieving brands
exports.getBrands = async (req, res) => {
    try {
        // Fetch all brands from the database
        const brands = await Brand.find();

        // Respond with a 200 status code and the retrieved brands
        res.status(200).json(brands);
    } catch (err) {
        // If an error occurs, respond with a 400 status code and the error message
        res.status(400).json(err);
    }
};

// Controller function for creating a new brand
exports.createBrand = async (req, res) => {
    try {
        // Create a new brand instance using the request body
        const brand = new Brand(req.body);

        // Save the new brand to the database and await the response
        const response = await brand.save();

        // Respond with a 200 status code and the saved brand
        res.status(200).json(response);
    } catch (err) {
        // If an error occurs, respond with a 400 status code and the error message
        res.status(400).json(err);
    }
};
