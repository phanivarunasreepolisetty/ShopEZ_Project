import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {

    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            fetchOrders();
        }
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/orders/my-orders",
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
            );

            setOrders(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/profile");
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>My Profile</h2>

            <h3>Name: {user?.username}</h3>
            <h3>Email: {user?.email}</h3>

            <h3>Total Orders: {orders.length}</h3>

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Profile;
