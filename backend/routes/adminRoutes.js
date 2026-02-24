const express = require("express");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

/* ============================= */
/* ===== DASHBOARD STATS ====== */
/* ============================= */
router.get("/stats", protect, adminOnly, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();

        res.json({ totalUsers, totalProducts, totalOrders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* ============================= */
/* ===== ALL USERS ============ */
/* ============================= */
router.get("/users", protect, adminOnly, async (req, res) => {
    try {
        const users = await User.find();

        const usersWithOrders = await Promise.all(
            users.map(async (user) => {
                const orderCount = await Order.countDocuments({
                    userId: user._id.toString()
                });

                return {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    userType: user.userType,
                    orderCount
                };
            })
        );

        res.json(usersWithOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* ============================= */
/* ===== ALL PRODUCTS ========= */
/* ============================= */
router.get("/products", protect, adminOnly, async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* ============================= */
/* ===== ADD PRODUCT ========== */
/* ============================= */
router.post("/add-product", protect, adminOnly, async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Add Product Error:", error.message);
        res.status(500).json({ message: error.message });
    }
});

/* ============================= */
/* ===== ALL ORDERS =========== */
/* ============================= */
router.get("/orders", protect, adminOnly, async (req, res) => {
    try {
        const orders = await Order.find().sort({ orderDate: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
