import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

function Cart() {
    const { cartItems, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    const total = cartItems.reduce(
        (acc, item) =>
            acc +
            (item.price - (item.price * (item.discount || 0)) / 100) *
            item.quantity,
        0
    );

    return (
        <div className="cart-page">
            <h2 className="cart-title">Your Cart</h2>

            {cartItems.length === 0 ? (
                <p className="empty-cart">No items in cart.</p>
            ) : (
                <>
                    <div className="cart-container">
                        {cartItems.map((item) => (
                            <div key={item._id} className="cart-item">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                />

                                <div className="cart-details">
                                    <h4>{item.name}</h4>

                                    <p>Quantity: {item.quantity}</p>

                                    <p className="price">
                                        ₹
                                        {(
                                            item.price -
                                            (item.price *
                                                (item.discount || 0)) /
                                            100
                                        ).toFixed(2)}
                                    </p>

                                    <button
                                        className="remove-btn"
                                        onClick={() =>
                                            removeFromCart(item._id)
                                        }
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-total">
                        Total: ₹{total.toFixed(2)}
                    </div>

                    <div style={{ textAlign: "center" }}>
                        {/* Optional Checkout Button */}
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;
