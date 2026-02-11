const mongoose = require("mongoose");
//set user schema
const UserSchema = new mongoose.Schema({
        email: { type: String, required: true },
        password: { type: String, required: true }
    }, {
        timestamps: true
    }

);
module.exports = mongoose.model("User", UserSchema)