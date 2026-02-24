import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Header.css";

function Header({ simple }) {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const { cartItems } = useContext(CartContext);

    const user = JSON.parse(localStorage.getItem("user"));

    const handleSearch = () => {
        if (search.trim() !== "") {
            navigate(`/products?search=${search}`);
        }
    };

    return (
        <header className="header">

            {/* ✅ Logo clickable */}
            <Link to="/" className="logo">
                SHOPEZ
            </Link>

            {/* ✅ If simple mode → show ONLY logo */}
            {!simple && (
                <>
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>

                    <div className="nav-buttons">

                        <Link to="/" className="nav-btn">
                            Home
                        </Link>

                        <Link to="/products" className="nav-btn">
                            Products
                        </Link>

                        <Link to="/cart" className="nav-btn cart-link">
                            <FaShoppingCart />
                            Cart
                            {cartItems.length > 0 && (
                                <span className="cart-count">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>

                        <Link to="/orders" className="nav-btn">
                            Orders
                        </Link>

                        <Link to="/account" className="nav-btn">
                            <FaUserCircle />
                            {user ? user.username : "Account"}
                        </Link>
                    </div>
                </>
            )}
        </header>
    );
}

export default Header;
