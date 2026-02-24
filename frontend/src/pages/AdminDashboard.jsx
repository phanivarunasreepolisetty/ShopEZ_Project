import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0
    });

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.log("No token found");
            return;
        }

        axios.get("http://localhost:5000/api/admin/stats", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setStats(res.data);
            })
            .catch(error => {
                console.log("API ERROR:", error.response?.data || error.message);
            });

    }, []);

    return (
        <div className="dashboard-container">
            <div className="dashboard-cards">

                <div className="card">
                    <h2>Total Users</h2>
                    <p>{stats.totalUsers}</p>
                    <button onClick={() => navigate("/admin/users")}>
                        View all
                    </button>
                </div>

                <div className="card">
                    <h2>Total Products</h2>
                    <p>{stats.totalProducts}</p>
                    <button onClick={() => navigate("/admin/products")}>
                        View all
                    </button>
                </div>

                <div className="card">
                    <h2>All Orders</h2>
                    <p>{stats.totalOrders}</p>
                    <button onClick={() => navigate("/admin/orders")}>
                        View all
                    </button>
                </div>

                <div className="card">
                    <h2>Add Product</h2>
                    <p>(new)</p>
                    <button onClick={() => navigate("/admin/add-product")}>
                        Add now
                    </button>
                </div>

            </div>
        </div>
    );
}

export default AdminDashboard;
