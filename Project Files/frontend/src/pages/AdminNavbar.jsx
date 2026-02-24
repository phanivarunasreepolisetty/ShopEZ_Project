import { Link } from "react-router-dom";

function AdminNavbar() {
    return (
        <div className="admin-header">
            <h2>SHOPEZ Admin</h2>

            <nav>
                <Link to="/admin">Home</Link>
                <Link to="/admin/users">Users</Link>
                <Link to="/admin/products">Products</Link>
                <Link to="/admin/orders">Orders</Link>
                <Link to="/admin/add-product">New Product</Link>
                <Link to="/login">Logout</Link>
            </nav>

        </div>
    );
}

export default AdminNavbar;
