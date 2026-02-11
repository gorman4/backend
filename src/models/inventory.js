const mongoose = require("mongoose")

const InventorySchema = new mongoose.Schema({
    itemname: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    origin: String,
    destination: String,
    currentposition: String,
    location: {
        long: {
            type: Number,
            required: true
        },
        lat: {
            type: Number,
            required: true
        }
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Inventory", InventorySchema)