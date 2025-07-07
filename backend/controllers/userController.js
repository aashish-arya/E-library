import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userModel.findOne({ email })
        if (user) {
            return res.status(400).json({ success: false, message: 'User already exist' })
        }

        // hashing of password
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        // creating user in database
        const createdUser = await userModel.create({
            name,
            email,
            password: hashed
        })

        // setting token
        const token = jwt.sign({ _id: createdUser._id, email: createdUser.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 3600000
        });

        res.json({ success: true, message: "New user Created" })
    } catch (error) {
        console.error('signup:-', error)
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' })
        }
        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 3600000
        });

        res.json({ success: true, message: 'LoggedIn Successfully', user: user.name })
    } catch (error) {
        console.log("Login error", error);
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}
const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 3600000
        });
        res.status(200).json({ success: true, message: "Logout Succesfully.." })
    } catch (error) {
        console.error('Logout Error', error);
        res.status(500).json({ success: false, message: "Internal Server Error." })
    }
}
export {
    signup,
    login,
    logout
}