const express = require("express");
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");

const router = express.Router();

/* ================= VERIFY TOKEN MIDDLEWARE ================= */
const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};


/* ================= CREATE ORDER ================= */
router.post("/", async (req, res) => {
    try {

        const {
            userId,
            name,
            email,
            mobile,
            address,
            pincode,
            paymentMethod,
            products
        } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const newOrder = new Order({
            userId: userId.toString(),
            name,
            email,
            mobile,
            address,
            pincode,
            paymentMethod,
            orderDate: new Date(),
            deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            status: "Placed",

            products: products.map((item) => ({
                title: item.title || item.name,
                description: item.description || "",
                mainImg: item.mainImg || item.image || "",
                size: item.size || "",
                quantity: item.quantity,
                price: item.price,
                discount: item.discount || 0
            }))
        });

        await newOrder.save();

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order: newOrder
        });

    } catch (error) {
        console.log("CREATE ERROR:", error);
        res.status(500).json({ message: "Order failed" });
    }
});


/* ================= GET LOGGED-IN USER ORDERS ================= */
router.get("/my-orders", verifyToken, async (req, res) => {
    try {

        const userId = req.user.id;

        const orders = await Order.find({ userId }).sort({ orderDate: -1 });

        res.json(orders);

    } catch (error) {
        console.log("FETCH ERROR:", error);
        res.status(500).json({ message: error.message });
    }
});


/* ================= CANCEL ORDER ================= */
router.put("/cancel/:id", verifyToken, async (req, res) => {
    try {

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status: "Cancelled" },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Order cancelled successfully", order: updatedOrder });

    } catch (error) {
        console.log("CANCEL ERROR:", error);
        res.status(500).json({ message: error.message });
    }
});


/* ================= DELETE ORDER ================= */
router.delete("/:id", verifyToken, async (req, res) => {
    try {

        const deletedOrder = await Order.findByIdAndDelete(req.params.id);

        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Order deleted successfully" });

    } catch (error) {
        console.log("DELETE ERROR:", error);
        res.status(500).json({ message: error.message });
    }
});


/* ================= GET ALL ORDERS (ADMIN) ================= */
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find().sort({ orderDate: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
