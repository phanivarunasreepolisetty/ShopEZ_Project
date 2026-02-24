import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminUsers.css";

function AdminUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get("http://localhost:5000/api/admin/users", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.log("Error fetching users:", err);
            });

    }, []);

    return (
        <div className="admin-users-container">
            <h2>All Users</h2>

            <div className="users-grid">
                {users.map((user) => (
                    <div key={user._id} className="user-card">
                        <p><strong>User Id</strong></p>
                        <p>{user._id}</p>

                        <p><strong>User Name</strong></p>
                        <p>{user.username}</p>

                        <p><strong>Email Address</strong></p>
                        <p>{user.email}</p>

                        <p><strong>Orders</strong></p>
                        <p>{user.orders ? user.orders.length : 0}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminUsers;
