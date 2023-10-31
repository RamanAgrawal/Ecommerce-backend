const mongoose = require('mongoose')
const { addCommonSchemaOptions } = require('../utils');
const { Schema } = mongoose;

const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },

    quantity: {
        type: Number,
        required: true
    }
})


addCommonSchemaOptions(CartSchema);

exports.Cart = mongoose.model('Cart', CartSchema);