const JWT = require("jsonwebtoken");
const User = require("../models/user-model");


//o CHECK IF USER IS LOGGED IN OR NOT
const requireSignIn = async(req, res, next)=>{
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET_KEY)
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
}


//o ADMIN ACCESS
const isAdmin = async(req, res, next)=>{
    try {
        const user = await User.findById(req.user._id);
        if(user.role !== 1){
            return res.status(401).send({
                success: false,
                message: "Unauthorized Accesss !"
            })
        }else{
            next();
        }
    } catch (error) {
        res.status(401).send({
            success: false,
            message: "Error in admin middleware",
            error
        })
    }
}

module.exports = {requireSignIn, isAdmin}