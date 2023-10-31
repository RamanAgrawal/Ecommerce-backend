// controllers/cartController.js
const { Cart } = require('../model/Cart');

// Add an item to the user's cart
exports.addToCart = async (req, res) => {
  try {
    const cart = new Cart(req.body)
    const doc = await cart.save();
    const result=await doc.populate('product');
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an item in the user's cart
exports.updateCartItem = async (req, res) => {
  const { id } = req.params;
  console.log(id,req.body);
  try {
    const cart = await Cart.findByIdAndUpdate(id, req.body,{
      new:true
    });
    console.log(cart);
    const result = await cart.populate('product');
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

// Remove an item from the user's cart
exports.removeFromCart = async (req, res) => {
  const { id } = req.params;

  try {
    await Cart.findByIdAndDelete(id);
    res.status(200).json(id)
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};



// Get the user's cart
exports.getUserCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cartItem = await Cart.find({ user: id }).populate('product')
    // .populate('user').exec();

    res.status(200).json(cartItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
