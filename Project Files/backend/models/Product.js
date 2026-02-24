const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },

        sizes: [
            {
                type: String
            }
        ],

        gender: {
            type: String,
            enum: ["Men", "Women", "Unisex"]
        },

        category: {
            type: String,
            enum: ["mobiles", "groceries", "electronics", "fashion", "sports"],
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        discount: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
