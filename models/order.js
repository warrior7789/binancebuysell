const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const OrderSchema = mongoose.Schema({
    symbol       : { type: String,default: null},    
    side         : { type: String,default: null},    
    quantity     : { type: String,default: null},
    price        : { type: String,default: null},
    order_type   : { type: String,default: null}, 
    status : { type: String,default: null},
    responce :{}

}, {
    timestamps: true
});


module.exports = mongoose.model('order', OrderSchema);