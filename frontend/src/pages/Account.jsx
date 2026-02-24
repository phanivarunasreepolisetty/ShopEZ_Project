import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Account() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!storedUser || !token) {
            navigate("/login");
            return;
        }

        setUser(storedUser);

        // Fetch user orders
        axios.get("http://localhost:5000/api/orders/my-orders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setOrders(res.data);
            })
            .catch((err) => {
                console.log("Error fetching orders:", err);
            });

    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (!user) return null;

    return (
        <div style={{ padding: "40px" }}>
            <h2>My Account</h2>

            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Number of Orders:</strong> {orders.length}</p>

            <button
                onClick={handleLogout}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    background: "red",
                    color: "white",
                    border: "none"
                }}
            >
                Logout
            </button>
        </div>
    );
}

export default Account;
