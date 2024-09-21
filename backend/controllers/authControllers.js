// authControllers.js
import User from '../models/Schema.js';
import { hashPassword, comparePassword } from '../helpers/auth.js';
import jwt from 'jsonwebtoken';

export const test = (req, res) => {
    res.json('test is working fine');
};

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if all required fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Username, email, and password are required" });
        }

        // Check password length
        if (password.length < 6) {
            return res.status(400).json({ error: "Password should be at least 6 characters long" });
        }

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create the new user
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        return res.status(201).json(user);
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email === 1) {
            // Duplicate email error
            return res.status(400).json({ error: "Email already exists" });
        }
        console.error("Error registering user:", error);
        return res.status(500).json({ error: "Server error during user registration" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                error: "No user found with this email address."
            });
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(400).json({
                error: 'Incorrect password'
            });
        }

        // Generate JWT token with expiration
        jwt.sign(
            { email: user.email, id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: "Error generating token" });
                }

                // Response data
                const responseData = {
                    token,
                    user: {
                        _id: user._id,
                        username: user.username,
                        email: user.email
                    }
                };

                res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' }).json(responseData);
            }
        );
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error during login" });
    }
};

export const getProfile = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).json({ error: "Token is missing" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userDoc = await User.findById(decodedToken.id);

        if (!userDoc) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({
            _id: userDoc._id,
            username: userDoc.username,
            email: userDoc.email
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Invalid token" });
        }
        return res.status(500).json({ error: "Server error" });
    }
};
