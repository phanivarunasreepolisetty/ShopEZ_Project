import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios
            .get("http://localhost:5000/api/admin/orders", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setOrders(res.data))
            .catch((err) =>
                console.log("Error fetching orders:", err)
            );
    }, []);

    return (
        <div className="admin-orders-container">
            <h2>All Orders</h2>

            {orders.map((order) => (
                <div
                    key={order._id}
                    style={{
                        marginBottom: "20px",
                        border: "1px solid #ccc",
                        padding: "15px",
                        borderRadius: "6px"
                    }}
                >
                    <p><strong>Name:</strong> {order.name}</p>
                    <p><strong>Email:</strong> {order.email}</p>
                    <p><strong>Address:</strong> {order.address}</p>
                    <p>
                        <strong>Order Date:</strong>{" "}
                        {new Date(order.orderDate).toLocaleDateString()}
                    </p>

                    <hr />

                    <h4>Ordered Products:</h4>

                    {order.products?.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "15px",
                                gap: "20px"
                            }}
                        >
                            <img
                                src={item.mainImg}
                                alt={item.title}
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                    border: "1px solid #ddd"
                                }}
                                onError={(e) => {
                                    e.target.src =
                                        "https://via.placeholder.com/100";
                                }}
                            />

                            <div>
                                <p><strong>Product:</strong> {item.title}</p>
                                <p><strong>Price:</strong> ₹{item.price}</p>
                                <p><strong>Quantity:</strong> {item.quantity}</p>
                                <p><strong>Size:</strong> {item.size}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default AdminOrders;
