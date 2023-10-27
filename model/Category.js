const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
    value: { type: String, required: true ,unique:true },
    label: { type: String, required: true ,unique:true },
    // checked:{type:Boolean}

});

// Create a virtual field 'id' that returns the '_id' as 'id'
const virtual = CategorySchema.virtual('id');
virtual.get(() => this._id);

// Set the toJSON options for the schemaz
CategorySchema.set('toJSON', {
    virtuals: true, // Include virtual fields in the JSON representation
    versionKey: false, // Exclude the '__v' field
    transform: (doc, ret) => { delete ret._id } // Remove the '_id' field
});

// Export the Mongoose model for 'Category' using the defined schema
exports.Category = mongoose.model('Category', CategorySchema);