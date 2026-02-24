import { useState } from "react";
import "./Shop.css";

function Shop() {
    const [showAccount, setShowAccount] = useState(false);

    const user = {
        username: "John Doe",
        email: "john@example.com",
        orders: 4,
    };

    return (
        <div className="shop-container">
            {/* HEADER */}
            <header className="shop-header">
                <div className="logo">SHOPEZ</div>

                <input
                    type="text"
                    placeholder="Search products..."
                    className="search-bar"
                />

                <div className="nav-links">
                    <span>Home</span>
                    <span>Cart</span>
                    <span>Orders</span>
                    <span onClick={() => setShowAccount(!showAccount)}>
                        Account
                    </span>
                </div>
            </header>

            {/* ACCOUNT POPUP */}
            {showAccount && (
                <div className="account-popup">
                    <h3>{user.username}</h3>
                    <p>{user.email}</p>
                    <p>Total Orders: {user.orders}</p>
                </div>
            )}

            {/* BODY */}
            <div className="shop-body">
                {/* LEFT FILTER PANEL */}
                <div className="filters">
                    <h2>Filters</h2>

                    <h3>Categories</h3>
                    <ul>
                        <li>Mobiles</li>
                        <li>Electronics</li>
                        <li>Sports-Equipment</li>
                        <li>Groceries</li>
                        <li>Fashion</li>
                    </ul>
                </div>

                {/* CENTER PRODUCTS */}
                <div className="categories-grid">
                    <div className="category-card mobiles">Mobiles</div>
                    <div className="category-card electronics">Electronics</div>
                    <div className="category-card sports">Sports</div>
                    <div className="category-card groceries">Groceries</div>
                    <div className="category-card fashion">Fashion</div>
                </div>
            </div>
        </div>
    );
}

export default Shop;
