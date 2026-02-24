import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/products/${id}`)
            .then((res) => {
                const productData = {
                    ...res.data,
                    mainImg: res.data.mainImg || res.data.image || "",
                };

                setProduct(productData);
            })
            .catch((err) => console.log(err));
    }, [id]);

    if (!product) return <h2>Loading...</h2>;

    const discountedPrice =
        product.price - (product.price * (product.discount || 0)) / 100;

    const handleAddToCart = () => {
        addToCart(
            {
                ...product,
                mainImg: product.mainImg,
            },
            quantity
        );

        navigate("/cart");
    };

    const handleOrderNow = () => {
        addToCart(
            {
                ...product,
                mainImg: product.mainImg,
            },
            quantity
        );

        navigate("/checkout");
    };

    return (
        <div
            style={{
                padding: "40px",
                display: "flex",
                gap: "50px",
            }}
        >
            {/* IMAGE */}
            <div>
                <img
                    src={product.mainImg}
                    alt={product.name}
                    style={{
                        width: "400px",
                        borderRadius: "10px",
                    }}
                />
            </div>

            {/* DETAILS */}
            <div>
                <h2>{product.name}</h2>
                <p>{product.description}</p>

                <h3>
                    ₹{discountedPrice.toFixed(2)}
                    <span
                        style={{
                            textDecoration: "line-through",
                            marginLeft: "15px",
                            color: "gray",
                        }}
                    >
                        ₹{product.price}
                    </span>
                    <span
                        style={{
                            marginLeft: "15px",
                            color: "green",
                        }}
                    >
                        {product.discount}% OFF
                    </span>
                </h3>

                <br />

                <label>Quantity: </label>
                <select
                    value={quantity}
                    onChange={(e) =>
                        setQuantity(Number(e.target.value))
                    }
                >
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>

                <br />
                <br />

                <button
                    onClick={handleAddToCart}
                    style={{
                        padding: "12px 25px",
                        background: "#ff3f6c",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        marginRight: "15px",
                        cursor: "pointer",
                    }}
                >
                    Add to Cart
                </button>

                <button
                    onClick={handleOrderNow}
                    style={{
                        padding: "12px 25px",
                        background: "green",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Order Now
                </button>
            </div>
        </div>
    );
}

export default ProductDetails;
