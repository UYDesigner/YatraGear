const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User')

// register the new user
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.json({ success: false, error: true, message: "Email already exists!" });
    }
    try {
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ userName, email, password: hashPassword });
        await newUser.save();
        res.status(200).json({ success: true, error: false, message: "You can now log in." })
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Some error occurred" })
    }
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email });
    try {
        if (!checkUser) {
            return res.json({ success: false, error: true, message: "User doesn't exist! Please register first." });
        }
        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password)
        if (!checkPasswordMatch) {
            return res.json({ success: false, error: true, message: "Invalid password! Try again." });
        }

        const token = jwt.sign({
            id: checkUser._id,
            role: checkUser.role,
            email: checkUser.email,
            userName: checkUser.userName
        }, process.env.JWT_SECRET, { expiresIn: '7d' })   // ✅ changed here

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,          // must be true on https
            sameSite: 'None',      // cross-origin support
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        }).json({
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
        res.status(500).json({ success: false, error: true, message: "Some error occurred" })
    }
}

// logout
const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token").json({ success: true, error: false, message: "Logged out successfully" })
    } catch (error) {
        res.json({ success: false, error: true, message: "Something went wrong" })
    }
}

// auth middleware
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, error: true, message: "Unauthorized user!" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)  // ✅ changed here
        req.user = decoded;
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ success: false, error: true, message: "Unauthorized user!" })
    }
}

module.exports = { registerUser, loginUser, logoutUser, authMiddleware }
