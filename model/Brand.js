const mongoose = require('mongoose');
const { Schema } = mongoose;

const BrandSchema = new Schema({
    value: { type: String, required: true ,unique:true },
    label: { type: String, required: true ,unique:true },
    // checked:{type:Boolean}

});

// Create a virtual field 'id' that returns the '_id' as 'id'
const virtual = BrandSchema.virtual('id');
virtual.get(() => this._id);

// Set the toJSON options for the schemaz
BrandSchema.set('toJSON', {
    virtuals: true, // Include virtual fields in the JSON representation
    versionKey: false, // Exclude the '__v' field
    transform: (doc, ret) => { delete ret._id } // Remove the '_id' field
});

// Export the Mongoose model for 'Brand' using the defined schema
exports.Brand = mongoose.model('Brand', BrandSchema);