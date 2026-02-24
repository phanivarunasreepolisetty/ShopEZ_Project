import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Checkout.css";

function Checkout() {
    const { cartItems = [], clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const storedData = JSON.parse(localStorage.getItem("user"));
    const user = storedData?.user ? storedData.user : storedData;

    const [formData, setFormData] = useState({
        address: "",
        mobile: "",
        pincode: "",
        paymentMethod: "COD",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const confirmOrder = async () => {
        if (!formData.address || !formData.mobile || !formData.pincode) {
            alert("Please fill all delivery details");
            return;
        }

        if (cartItems.length === 0) {
            alert("Your cart is empty");
            return;
        }

        if (!user || !user._id) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        if (loading) return;

        setLoading(true);

        try {
            const orderData = {
                userId: user._id,
                name: user.username,
                email: user.email,
                mobile: formData.mobile,
                address: formData.address,
                pincode: formData.pincode,
                paymentMethod: formData.paymentMethod,
                orderDate: new Date(),
                deliveryDate: new Date(
                    Date.now() + 5 * 24 * 60 * 60 * 1000
                ),
                products: cartItems.map((item) => ({
                    title: item.name || item.title || "",
                    description: item.description || "",
                    mainImg: item.mainImg || item.mainImage || "",
                    size: item.size || "M",
                    quantity: item.quantity || 1,
                    price: item.price || 0,
                    discount: item.discount || 0,
                })),
            };

            await axios.post(
                "http://localhost:5000/api/orders",
                orderData
            );

            alert("Order Placed Successfully!");

            if (typeof clearCart === "function") {
                clearCart();
            }

            navigate("/orders");

        } catch (error) {
            console.log(
                "Order Error:",
                error.response?.data || error.message
            );
            alert("Order failed. Check backend.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout-page">
            <h2>Delivery Details</h2>

            <div className="checkout-form">
                <input
                    type="text"
                    name="address"
                    placeholder="Enter Address"
                    value={formData.address}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="mobile"
                    placeholder="Enter Mobile Number"
                    value={formData.mobile}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="pincode"
                    placeholder="Enter Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                />

                <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                >
                    <option value="COD">Cash On Delivery</option>
                    <option value="UPI">UPI</option>
                    <option value="Card">Debit/Credit Card</option>
                </select>

                <button
                    className="confirm-btn"
                    onClick={confirmOrder}
                    disabled={loading}
                >
                    {loading ? "Placing Order..." : "Confirm Delivery"}
                </button>
            </div>
        </div>
    );
}

export default Checkout;
