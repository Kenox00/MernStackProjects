import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";

// Generate JWT Token
const createToken = (_id) => {
    return jwt.sign({ _id }, SECRET, { expiresIn: '3d' });
};

// Signup Function
export const Signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: "All fields must be filled" });
        }

        // Create user
        const user = await User.signup( email, password);
        const token = createToken(user._id);

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login Function
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: "All fields must be filled" });
        }

        // Login user
        const user = await User.login(email, password);
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
