const User = require("../models/user") // Import user model for further manipulation
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");


//Generate JWT token
const generateToken = (userId) => {
    return jwt.sign({
            id: userId,
        },
        process.env.JWT_SECRET, {
            expiresIn: "7d",
        }
    )
};

//@desc Register a new user
//@route POST /api/v1/register
//@access Public
const registerUser = async(req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction()

    try {
        //get resquest sent
        const { email, password } = req.body;
        //Check if user already exist
        const userExists = await User.findOne({ email });
        if (userExists) {
            await session.abortTransaction()
            session.endSession()
            return res.status(400).json({
                message: "User already exist!!!"
            })
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //Create new user
        const user = await User.create([{
            email,
            password: hashedPassword
        }], { session });
        //generate token
        const token = generateToken(user[0]._id)

        //conclude transaction
        await session.commitTransaction();
        session.endSession();


        console.log("User created", user._id);
        //Return user data with JWT
        res.status(201).json({
            _id: user[0]._id,
            email: email,
            token: token,
            message: "Account creation was successful"
        })


    } catch (err) {
        console.error("Error registering user: ", err);
        res.status(500).json({
            message: "Server error",
            error: err.message
        })

    }


}


//@des login user
//@route POST /api/v1/login
//@public
const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;
        //find if user exist
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password!"
            })

        }
        //compare password to hashed password
        const isMatch = await bcrypt.compare(password, user.password)
            //if no match
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password!"
            })
        }
        //Generate token
        const token = generateToken(user._id)
            //Return User data with Jwt
        res.json({
            _id: user._id,
            email: user.email,
            token: token
        })



    } catch (err) {
        res.status(500).json({
            message: `internal server error : ${err}`

        })
        console.error("Error login user in:", err)
    }


}

module.exports = {
    registerUser,
    loginUser

}