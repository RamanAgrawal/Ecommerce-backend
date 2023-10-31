const mongoose=require('mongoose');
const { addCommonSchemaOptions } = require('../utils');

const {Schema}=mongoose;
// Define the address schema
const AddressSchema = new Schema({
    name: String,
    email: String,
    phoneNo: String,
    street: String,
    city: String,
    state: String,
    pincode: String,
});

// Define the user schema
const UserSchema = new Schema({
    name: {type:String,required:true},
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
    },
    password: {type:String,required:true},
    addresses: {type:[AddressSchema]}, // Embed addresses as an array of objects
    role: {type:String,required:true,default:'user'},
});

addCommonSchemaOptions(UserSchema);

exports.User=mongoose.model('User',UserSchema)