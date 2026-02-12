const mongoose = require("mongoose")

const InventorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    uuid: {
        type: String,
        required: true
    },

    itemname: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    tracknumber: {
        type: String,
        required: true

    },
    origin: String,
    destination: String,
    currentposition: String,
    location: {
        name: {
            type: String,
            required: true
        },
        long: {
            type: Number,
            required: false
        },
        lat: {
            type: Number,
            required: false
        }
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Inventory", InventorySchema)