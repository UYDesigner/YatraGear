const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User')

// register the new user ---------------------------------
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        // console.log("Email already exists!")
        return res.json({ success: false, error: true, message: "Email already exists!" });
    }
    try {

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName, email, password: hashPassword
        })

        await newUser.save();
        res.status(200).json({
            success: true,
            error: false,
            message: "You can now log in."
        })


    } catch (error) {
        // console.log("register submit karne me problem hai bhai", error)
        res.status(500).json({
            success: false,
            error: true,
            message: "Some error occured"
        })
    }
}


// login the user --------------------------------------------------
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const checkUser = await User.findOne({ email })

    try {
        if (!checkUser) {
            // console.log("no such email exist")
            return res.json({ success: false, error: true, message: "User doesn't exists! Please resigter first" });
        }

        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password)
        if (!checkPasswordMatch) {
            // console.log("incurrect password")
            return res.json({ success: false, error: true, message: "Invalid Password! try again" });
        }

        const token = jwt.sign({
            id: checkUser._id,
            role: checkUser.role,
            email: checkUser.email,
            userName : checkUser.userName
        }, 'CLIENT_SECRET_KET', { expiresIn: '60m' })

        res.cookie('token', token, { httpOnly: true, secure: false }).json({
            success: true,
            error: false,
            user: {
                email: checkUser.email,
                userName: checkUser.userName,
                role: checkUser.role,
                id: checkUser._id
            },
            message: "Enjoy our services"
        })

    } catch (error) {
        // console.log("login mein problem hai ", error)
        res.status(500).json({
            success: false,
            error: true,
            message: "Some error occured"
        })
    }
}


// logout the user -------------------------------------------------
const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token").json({
            success: true,
            error: false,
            message: "Logged out successfully"

        })

    } catch (error) {
        res.json({
            success: false,
            error: true,
            message: "Something went wrong"
        })
    }


}


const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({
        success: false,
        error: true,
        message: "Unauthorised user!"
    })

    try {
        const decoded = jwt.verify(token, 'CLIENT_SECRET_KET')
        req.user = decoded; 
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            success: false,
            error: true,
            message: "Unauthorised user!"
        })
    }


}





module.exports = { registerUser, loginUser, logoutUser , authMiddleware}