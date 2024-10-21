const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
    link:{
        type: String,
        required: true,
    },
   
    photo: {
        data: Buffer,
        contentType: String 
    },

   
}, {timestamps:true});

module.exports = new mongoose.model("Banner", bannerSchema);