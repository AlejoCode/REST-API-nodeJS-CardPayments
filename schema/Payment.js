const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    description: String,
    amount: Number,
    cardToken: String,
    numberFees: String,
    paymentMethod: String,
    referenceNumber: Number,
    status: Boolean,
    createdAt: Date,
    updatedAt: Date
});

var paymentModel = mongoose.model("payments", paymentSchema);

module.exports = paymentModel;