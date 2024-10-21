const {Schema, model} = require('mongoose');

const feedbackSchema = new Schema({
    name:{type: String, required: true},
    email:{type: String, required: true},
    message:{type: String, required: true},
}, {timestamps: true});

const Feedback = new model("Feedback", feedbackSchema);

module.exports = Feedback;