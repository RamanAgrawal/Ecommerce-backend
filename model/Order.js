const mongoose = require('mongoose')
const { addCommonSchemaOptions } = require('../utils');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    items: {type:[{product:{ type: Schema.Types.ObjectId, ref: 'Product' },quantity:Number}],required:true},
    totalAmount:{type:Number,required:true},
    totalItems:{type:Number,required:true},
    selectedAddress:{},
    user:{type:Schema.Types.ObjectId,ref:'User',required:true},
    PaymentMethod:{type:String,required:true},
    status:{type:String,enum:['pending','confirmed','delivered','cancelled'],default:'pending'}
})


addCommonSchemaOptions(OrderSchema);

exports.Order = mongoose.model('Order', OrderSchema);