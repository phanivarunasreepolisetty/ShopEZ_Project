const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: String,
    name: String,
    email: String,
    mobile: String,
    address: String,
    pincode: String,
    paymentMethod: String,
    orderDate: Date,
    deliveryDate: Date,

    // ✅ NEW FIELD (for cancel feature)
    status: {
        type: String,
        default: "Placed"
    },

    products: [
        {
            title: String,
            description: String,
            mainImg: String,
            size: String,
            quantity: Number,
            price: Number,
            discount: Number,
        },
    ],
});

module.exports = mongoose.model("Order", orderSchema);
