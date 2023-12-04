const mongoose = require('mongoose')

const storySchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    story: {
        type: String,
        required: true
    }
})

const storyModel = mongoose.model("stories", storySchema, "stories")
module.exports = storyModel