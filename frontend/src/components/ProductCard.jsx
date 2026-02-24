import API from "../api/axios";

function ProductCard({ product }) {

    const addToCart = async () => {
        try {
            await API.post("/cart/add", {
                productId: product._id,
                quantity: 1
            });
            alert("Added to cart");
        } catch (error) {
            alert("Login first");
        }
    };

    return (
        <div style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>₹{product.price}</p>
            <button onClick={addToCart}>Add to Cart</button>
        </div>
    );
}

export default ProductCard;
