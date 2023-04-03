const mongoose = require('mongoose');
const otpsSchema = mongoose.Schema({
    email:{type:String},
    otp:{type:String},
    status:{type:Number, default:0},
    createdDate:{type:Date, default:Date.now()}
}, {versionKey:false});

const otpsModel = mongoose.model('otps', otpsSchema);
module.exports = otpsModel;