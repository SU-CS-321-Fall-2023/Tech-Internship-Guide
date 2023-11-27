const mongoose  = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    updated: {
        type: Date,
        default: Date.now
    },
    favoriteBlocks: [],
    password: {
        type: String,
        required: true
    }
})

const userModel = mongoose.model("users", userSchema, "users")
module.exports = userModel