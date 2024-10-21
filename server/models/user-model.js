const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: Number,
        required: true
    },

    password: {
        type: String,
        required: true,
    },

    cpassword: {
        type: String,
        required: true,
    },

    savedBlogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }],

    role: {
        type: Number,
        default: 0
    },
},{timestamps: true});

const User = new mongoose.model("User", userSchema);
module.exports = User;