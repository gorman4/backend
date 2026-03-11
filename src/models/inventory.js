const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    uuid: {
        type: String,
        required: true,
        unique: true,
    },

    receivername: {
        type: String,
        required: true,
    },
    receiveraddress: {
        type: String,
        required: true,
    },
    receiveremail: {
        type: String,
        required: true,
    },
    receiverphone: {
        type: String,
        required: true,
    },

    itemname: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    weight: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
    deliverymode: {
        type: String,
        required: true,
    },
    completion: {
        type: Number,
        required: true,
    },

    tracknumber: {
        type: String,
        required: true,
    },
    origin: String,
    destination: String,
    currentposition: String,
    location: {
        name: {
            type: String,
            required: true,
        },
        long: {
            type: Number,
            required: false,
        },
        lat: {
            type: Number,
            required: false,
        },
        isMoving: {
            type: Boolean,
            default: false,
            required: false,
        },
        direction: {
            type: String,
            enum: ["north", "south", "east", "west"],
            required: false,
        },
    },
    status: {
        type: String,
        require: true,
    },
    expecteddelivery: {
        type: String,
        required: true,
    },
    itemimage: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
}, );

module.exports = mongoose.model("Inventory", InventorySchema);