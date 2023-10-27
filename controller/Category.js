// Import the Category model from your project
const { Category } = require("../model/Category");

// Controller function for retrieving categories
exports.getCategories = async (req, res) => {
    try {
        // Fetch all categories from the database
        const categories = await Category.find();

        // Respond with a 200 status code and the retrieved categories
        res.status(200).json(categories);
    } catch (err) {
        // If an error occurs, respond with a 400 status code and the error message
        res.status(400).json(err);
    }
};

// Controller function for creating a new category
exports.createCategory = async (req, res) => {
    try {
        // Create a new category instance using the request body
        const category = new Category(req.body);

        // Save the new category to the database and await the response
        const response = await category.save();

        // Respond with a 200 status code and the saved category
        res.status(200).json(response);
    } catch (err) {
        // If an error occurs, respond with a 400 status code and the error message
        res.status(400).json(err);
    }
};
