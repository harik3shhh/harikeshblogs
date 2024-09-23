const bcrypt = require("bcrypt");

//o function for hashing password when user registers. too easy.
const hashPassword = async(password)=>{
    try {
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound);
        return hashedPassword;
    } catch (error) {
        console.log("Unable to hash password");
        console.log(error);
    }
};


//o comparing the actual password to hashed password for login
const comparePassword = async(password, hashedPassword)=>{
    return bcrypt.compare(password, hashedPassword);
};

module.exports= {hashPassword, comparePassword};