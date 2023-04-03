const mongoose = require('mongoose');
const dataSchema = mongoose.Schema({
    userEmail: { type: String },
    name: { type: String },
    address: { type: String },
    phone: { type: String, unique: true },
    email: { type: String },
    createdDate: { type: Date, default: Date.now() }
}, { versionKey: false });
const suppliersModel = mongoose.model('suppliers', dataSchema);
module.exports = suppliersModel