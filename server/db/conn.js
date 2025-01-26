const mongoose = require("mongoose");

// const DB = "mongodb+srv://harikeshlinux:xPHFDSUKBRt7Msa0@cluster0.me0vkr7.mongodb.net/blog"
const DB = process.env.DB_PASS

mongoose.connect(DB).then(()=>{
    console.log("CONNETED TO MONGODB !!!");
    
}).catch((error)=>{
    console.log("FAILED TO CONNECT", error);
    
});
