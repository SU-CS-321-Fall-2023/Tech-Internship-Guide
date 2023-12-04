const mongoose = require('mongoose')

const faqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
})

const faqModel = mongoose.model("freqQuestions", faqSchema, "freqQuestions")
module.exports = faqModel