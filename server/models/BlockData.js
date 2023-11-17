const mongoose = require('mongoose')

const blockSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
})

const blockModel = mongoose.model("blockDatas", blockSchema, "blockDatas")
module.exports = blockModel