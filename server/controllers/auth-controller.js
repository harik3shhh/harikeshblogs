const { hashPassword, comparePassword } = require("../helpers/helper");
const User = require("../models/user-model");
const JWT = require("jsonwebtoken")


//* REGISTRATION LOGIC
const register = async(req, res)=>{
   try {

    //o check for all the fields. 
    const {name, email, phone, password, cpassword, security} = req.body;
    if(!name || !email || !phone || !password || ! cpassword){
        res.status(400).send({
            success: false,
            message: "All Fields are required"
        });
    }


    //o check if email already exists or not.
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(200).send({
            success: false,
            message: "Email already exists",
        })
    };

    //* password hashing
    const hashedPassword = await hashPassword(password);


    //o save user 
    const user = await User.create({
        name, email, phone, password: hashedPassword, cpassword
    });

    res.status(201).send({
        success: true,
        message: "Registration Successful",
        user,
    });
    
   } catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message: "Something went wrong while registering",
        error,
    })
   }
};


//* LOGIN LOGIC 
const login = async(req, res)=>{
    
    try {

        //* get all the fields from the user.
        const {email, password } = req.body;
        if(!email || !password){
            return res.status(401).send({
                success: false,
                message: "All fields required",
            });
        };

        //* check if user exists or not in database.
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).send({
                success: false,
                message: "Invalid email or password",
            });
        };

        //* compare and match the password. 
        const match = await comparePassword(password, user.password);
        if(!match){
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            });
        };

        //* generate token
        const token = await JWT.sign(
            { _id: user._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn: "3d"},
            );


        //* token is generated when user successfully logins.
        res.status(200).send({
            success: true,
            message: "Login successful",
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                
            },
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error logging in!"
        })
    }
};


//* test admin access
const testAdmin = (req, res)=>{
    try {
        res.status(200).send({
            success: true,
            message: "Admin route accessed."
        })
    } catch (error) {
        console.log(error);
    }
}

//* Give Admin Access to User
const adminAccess = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        // Validate role value
        if (role !== 0 && role !== 1) {
            return res.status(400).send({
                success: false,
                message: "Invalid role value"
            });
        }

        // Find user by ID and update the role
        const user = await User.findByIdAndUpdate(id, {
            $set: { role: role }
        }, { new: true });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).send({
            success: true,
            message: "User role updated",
            user
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        });
    }
};



//* Get all user admin 
const getAllUser = async(req, res)=>{
    try {
        const allusers = await User.find({}).select("-password");
        res.status(200).send({
            success: true,
            message: "Users Fetched !",
            allusers
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Faild to fetch users.",
            error
        })
    }
}


//* Delete user 
const deleteUser = async(req, res)=>{
    try {
        const {id} = req.params;
        const deletedUser= await User.findByIdAndDelete(id);
        res.status(200).send({
            success: true, 
            message: "User Deleted Successfully.",
            deletedUser,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in deleting user.",
            error
        })
    }
}

//* users count.
const userCountController = async(req, res)=>{
    try {
        const totalUser = await User.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            message: "Fetched total users.",
            totalUser
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Unable to fetch count of ther users.",
            error
        })
    }
}


//* Update profile user.


//* REVIEWS FROM THE USER => MONGODB


module.exports = {register, login, testAdmin, getAllUser, deleteUser, adminAccess, userCountController}