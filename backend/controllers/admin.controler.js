import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model.js';
import { User } from '../models/user.model.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}); // Fetch all users
        return res.status(200).json({
            success: true,
           count: users.length,
            users,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

export const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const tokenData = { id: admin._id };
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${admin.username}`,
            success: true
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0, httpOnly: true }).json({
            message: "Logged out successfully.",
            success: true
        });
    } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).json({
            message: "Logout failed.",
            success: false,
            error: error.message
        });
    }
};
