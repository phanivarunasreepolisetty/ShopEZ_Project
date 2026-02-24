import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Orders.css";

function Orders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        axios.get("http://localhost:5000/api/orders/my-orders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setOrders(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    }, [navigate]);

    return (
        <div className="orders-container">
            <h2>My Orders</h2>

            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map((order, index) => (
                    <div key={index} className="order-box">

                        {order.products.map((product, i) => (
                            <div key={i} className="order-content">

                                {/* LEFT SIDE IMAGE */}
                                <div className="order-image">
                                    <img
                                        src={product.mainImg}
                                        alt={product.title}
                                    />
                                </div>

                                {/* RIGHT SIDE DETAILS */}
                                <div className="order-details">

                                    <h3>{product.title}</h3>

                                    <p><strong>Description:</strong> {product.description}</p>
                                    <p><strong>Price:</strong> ₹{product.price}</p>
                                    <p><strong>Discount:</strong> {product.discount}%</p>
                                    <p><strong>Quantity:</strong> {product.quantity}</p>

                                    <hr />

                                    <p><strong>Name:</strong> {order.name}</p>
                                    <p><strong>Email:</strong> {order.email}</p>
                                    <p><strong>Mobile:</strong> {order.mobile}</p>
                                    <p><strong>Address:</strong> {order.address}</p>
                                    <p><strong>Pincode:</strong> {order.pincode}</p>
                                    <p><strong>Payment:</strong> {order.paymentMethod}</p>
                                    <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                                    <p><strong>Delivery Date:</strong> {new Date(order.deliveryDate).toLocaleDateString()}</p>
                                    <p><strong>Status:</strong> {order.status}</p>

                                </div>

                            </div>
                        ))}

                    </div>
                ))
            )}
        </div>
    );
}

export default Orders;
