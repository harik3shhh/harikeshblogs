const mongoose = require("mongoose");

const youtubeSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true,
    },

    link:{
        type: String,
        required: true,
    },

    desc:{
        type: String,
        required: true,
    },
   
    photo: {
        data: Buffer,
        contentType: String 
    },

   
}, {timestamps:true});

module.exports = new mongoose.model("Youtube", youtubeSchema);