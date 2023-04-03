const mongoose = require('mongoose');
const dataSchema = mongoose.Schema({
    userEmail: { type: String },
    typeId: { type: mongoose.Schema.Types.ObjectId },
    amount: { type: Number },
    note: { type: String },
    createdDate: { type: Date, default: Date.now() }
}, { versionKey: false });
const expensesModel = mongoose.model('expenses', dataSchema);
module.exports = expensesModel