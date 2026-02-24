import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminProducts.css";

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    setError("Admin not logged in");
                    setLoading(false);
                    return;
                }

                const res = await axios.get(
                    "http://localhost:5000/api/admin/products",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setProducts(res.data);
                setLoading(false);

            } catch (err) {
                console.log("Error fetching products:", err.response?.data || err.message);
                setError("Failed to load products");
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="admin-products-container">
            <h2>All Products</h2>

            {loading && <p>Loading products...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && products.length === 0 && (
                <p>No products found.</p>
            )}

            <div className="products-grid">
                {products.map((product) => (
                    <div key={product._id} className="product-card">

                        <img
                            src={product.image || "https://via.placeholder.com/300"}
                            alt={product.name}
                            onError={(e) => {
                                e.target.src = "https://via.placeholder.com/300";
                            }}
                            style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "cover",
                                borderRadius: "8px"
                            }}
                        />

                        <h3>{product.name}</h3>

                        <p><strong>Price:</strong> ₹{product.price}</p>

                        {product.discount > 0 && (
                            <p style={{ color: "green" }}>
                                <strong>Discount:</strong> {product.discount}%
                            </p>
                        )}

                        <p><strong>Category:</strong> {product.category}</p>

                        {product.gender && (
                            <p><strong>Gender:</strong> {product.gender}</p>
                        )}

                        {product.sizes && product.sizes.length > 0 && (
                            <p><strong>Sizes:</strong> {product.sizes.join(", ")}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminProducts;
