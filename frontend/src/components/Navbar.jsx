import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">

                {/* Logo */}
                <div className="logo">
                    <span className="logo-icon">🛍️</span>
                    <h2>SHOPEZ</h2>
                </div>

                {/* Links */}
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/cart">Cart</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/admin">Admin</Link>
                </div>

                {/* Button */}
                <div className="nav-btn">
                    <Link to="/" className="shop-btn">Shop Now</Link>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
