const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// Add to Cart
router.post("/add", async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const cart = await Cart.create({
            userId,
            productId,
            quantity
        });

        res.json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// Get Cart by user
router.get("/:userId", async (req, res) => {
    try {
        const cart = await Cart.find({
            userId: req.params.userId
        }).populate("productId");

        res.json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
