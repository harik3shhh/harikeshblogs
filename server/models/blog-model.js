const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    slug:{
        type: String,
        required: true,

    },
    caption:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
  
    category: {
        type: mongoose.ObjectId,
        ref:  "Category",
        required: true
    },
   
    photo: {
        data: Buffer,
        contentType: String 
    },

    author :{
        type: String,
        required: true,
    },

    publishDate :{
        type: String,
        required: true,
    },

   
}, {timestamps:true});

module.exports = new mongoose.model("Blog", blogSchema);