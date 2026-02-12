const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema({
    flighttype: { type: String, require: true },
    emailaddress: { type: String, require: true },
    departurecountry: { type: String, require: true },
    totalweight: { type: String, require: true, min: 0 },
    recipientcountry: { type: String, require: true },
    expecteddeliverydate: { type: String, require: true },
    status: { type: String, require: true }


}, {
    timestamps: true
});

module.exports = mongoose.model("Quote", QuoteSchema)