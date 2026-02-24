import { Link, useNavigate } from "react-router-dom";
import "./AdminHeader.css";

function AdminHeader() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <header className="admin-header">
            <div className="admin-logo">
                SHOPEZ Admin
            </div>

            <nav className="admin-nav">
                <Link to="/admin">Home</Link>
                <Link to="/admin/products">Products</Link>
                <Link to="/admin/users">Users</Link>
                <Link to="/admin/orders">Orders</Link>
                <Link to="/admin/add-product">New Product</Link>
                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </nav>
        </header>
    );
}

export default AdminHeader;
