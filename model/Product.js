const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, min: [0, 'wrong min price'], required: true },
    discountPercentage: { type: Number, min: [0, 'wrong min discountPercent'], max: [99], required: true },
    rating: { type: Number, min: [0, 'wrong min rating'], max: [5], required: true, default: 0 },
    stock: { type: Number, min: [0, 'wrong min stock'], required: true, default: 0 },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: { type: Array, required: true },
    deleted: { type: Boolean, required: true, default: false },
});

// Create a virtual field 'id' that returns the '_id' as 'id'
const virtual = ProductSchema.virtual('id');
virtual.get(() => this._id);

// Set the toJSON options for the schemaz
ProductSchema.set('toJSON', {
    virtuals: true, // Include virtual fields in the JSON representation
    versionKey: false, // Exclude the '__v' field
    transform: (doc, ret) => { delete ret._id } // Remove the '_id' field
});

// Export the Mongoose model for 'Product' using the defined schema
exports.Product = mongoose.model('Product', ProductSchema);