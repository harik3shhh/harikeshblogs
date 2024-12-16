const mongoose = require("mongoose");

// const DB = "mongodb://127.0.0.1:27017/blog"
const DB = process.env.DB_PASS

mongoose.connect(DB).then(()=>{
    console.log("CONNETED TO MONGODB !!!");
    
}).catch((error)=>{
    console.log("FAILED TO CONNECT", error);
    
});