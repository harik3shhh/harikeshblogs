const mongoose = require("mongoose");

const DB = "mongodb://127.0.0.1:27017/blog"

mongoose.connect(DB).then(()=>{
    console.log("CONNETED TO MONGODB !!!");
    
}).catch((error)=>{
    console.log("FAILED TO CONNECT", error);
    
});