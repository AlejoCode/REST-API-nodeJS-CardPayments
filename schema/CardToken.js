const mongoose = require('mongoose');

const cardTokenSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cardNumber: Number,
    securityCode: Number,
    dueDate: String,
    cardHolder: String,
    cardHolderTypeId: String,
    cardHolderNumberId: Number,
    createdAt: Date,
    updatedAt: Date
});

var cardTokenModel = mongoose.model("creditCards", cardTokenSchema);

module.exports = cardTokenModel;