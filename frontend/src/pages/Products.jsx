import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Products.css";

function Products() {
    const navigate = useNavigate();
    const location = useLocation();

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [sortType, setSortType] = useState("");

    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("search") || "";

    // ✅ FETCH PRODUCTS
    useEffect(() => {
        axios
            .get("http://localhost:5000/api/products")
            .then((res) => {
                setProducts(res.data);
                setFilteredProducts(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    // ✅ MAIN FILTER LOGIC
    useEffect(() => {
        let updated = [...products];

        // 🔎 SEARCH
        if (searchQuery.trim() !== "") {
            const search = searchQuery.toLowerCase();
            updated = updated.filter((product) =>
                product.name?.toLowerCase().includes(search) ||
                product.category?.toLowerCase().includes(search) ||
                product.gender?.toLowerCase().includes(search)
            );
        }

        // 📂 CATEGORY FILTER
        if (selectedCategory !== "") {
            updated = updated.filter(
                (product) =>
                    product.category?.toLowerCase().trim() ===
                    selectedCategory.toLowerCase().trim()
            );
        }

        // 👕 GENDER FILTER
        if (selectedGender !== "") {
            updated = updated.filter(
                (product) =>
                    product.gender?.toLowerCase().trim() ===
                    selectedGender.toLowerCase().trim()
            );
        }

        // 📊 SORTING (important: use new array)
        if (sortType === "low") {
            updated = [...updated].sort((a, b) => a.price - b.price);
        }

        if (sortType === "high") {
            updated = [...updated].sort((a, b) => b.price - a.price);
        }

        if (sortType === "discount") {
            updated = [...updated].sort(
                (a, b) => (b.discount || 0) - (a.discount || 0)
            );
        }

        setFilteredProducts(updated);

    }, [products, searchQuery, selectedCategory, selectedGender, sortType]);

    return (
        <div className="products-layout">

            {/* SIDEBAR */}
            <div className="sidebar">
                <h3>Filters</h3>

                {/* SORT */}
                <h4>Sort By</h4>
                <div className="filter-group">
                    <label>
                        <input
                            type="radio"
                            name="sort"
                            checked={sortType === "low"}
                            onChange={() => setSortType("low")}
                        />
                        Price (Low to High)
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="sort"
                            checked={sortType === "high"}
                            onChange={() => setSortType("high")}
                        />
                        Price (High to Low)
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="sort"
                            checked={sortType === "discount"}
                            onChange={() => setSortType("discount")}
                        />
                        Discount
                    </label>
                </div>

                {/* CATEGORY */}
                <h4>Categories</h4>
                <div className="filter-group">
                    {["Mobiles", "Groceries", "Electronics", "Fashion", "Sports"].map((cat) => (
                        <label key={cat}>
                            <input
                                type="radio"
                                name="category"
                                checked={selectedCategory === cat}
                                onChange={() => setSelectedCategory(cat)}
                            />
                            {cat}
                        </label>
                    ))}

                    <label>
                        <input
                            type="radio"
                            name="category"
                            checked={selectedCategory === ""}
                            onChange={() => setSelectedCategory("")}
                        />
                        All
                    </label>
                </div>

                {/* GENDER */}
                <h4>Gender</h4>
                <div className="filter-group">
                    {["Men", "Women", "Unisex"].map((gen) => (
                        <label key={gen}>
                            <input
                                type="radio"
                                name="gender"
                                checked={selectedGender === gen}
                                onChange={() => setSelectedGender(gen)}
                            />
                            {gen}
                        </label>
                    ))}

                    <label>
                        <input
                            type="radio"
                            name="gender"
                            checked={selectedGender === ""}
                            onChange={() => setSelectedGender("")}
                        />
                        All
                    </label>
                </div>
            </div>

            {/* PRODUCTS */}
            <div className="products-content">
                <h2 className="page-title">
                    {searchQuery
                        ? `${searchQuery} Products`
                        : selectedCategory
                            ? `${selectedCategory} Products`
                            : "All Products"}
                </h2>

                <div className="products-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => {
                            const discountedPrice =
                                product.price -
                                (product.price * (product.discount || 0)) / 100;

                            return (
                                <div
                                    className="product-card"
                                    key={product._id}
                                    onClick={() =>
                                        navigate(`/product/${product._id}`)
                                    }
                                    style={{ cursor: "pointer" }}
                                >
                                    <img src={product.image} alt={product.name} />
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <p>
                                        {product.category} | {product.gender}
                                    </p>
                                    <div>
                                        <span>₹{discountedPrice}</span>{" "}
                                        <span>₹{product.price}</span>{" "}
                                        <span>{product.discount || 0}% off</span>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p style={{ marginTop: "20px" }}>
                            No products found.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Products;
