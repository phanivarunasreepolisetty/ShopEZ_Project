const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");


/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
    try {
        const { username, email, password, userType } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            userType: userType || "customer"
        });

        await user.save();

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            userType: user.userType
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            {
                id: user._id,
                userType: user.userType
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            userType: user.userType,
            token: generateToken(user._id)
        });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
