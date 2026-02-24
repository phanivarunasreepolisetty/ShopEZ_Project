import { useState } from "react";
import axios from "axios";
// ❌ Removed AdminHeader import

function AdminAddProduct() {

    const [product, setProduct] = useState({
        name: "",
        description: "",
        image: "",
        sizes: [],
        gender: "",
        category: "",
        price: "",
        discount: ""
    });

    const user = JSON.parse(localStorage.getItem("user"));

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleSizeChange = (size) => {
        if (product.sizes.includes(size)) {
            setProduct({
                ...product,
                sizes: product.sizes.filter((s) => s !== size)
            });
        } else {
            setProduct({
                ...product,
                sizes: [...product.sizes, size]
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user?.token) {
            alert("Unauthorized. Please login again.");
            return;
        }

        try {
            await axios.post(
                "http://localhost:5000/api/admin/add-product",
                {
                    ...product,
                    price: Number(product.price),
                    discount: Number(product.discount || 0)
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
            );

            alert("Product added successfully ✅");

            setProduct({
                name: "",
                description: "",
                image: "",
                sizes: [],
                gender: "",
                category: "",
                price: "",
                discount: ""
            });

        } catch (error) {
            console.log(error.response?.data);
            alert("Error adding product ❌");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Add Product</h2>

            <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>

                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    name="description"
                    placeholder="Product Description"
                    value={product.description}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={product.image}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <h4>Available Sizes</h4>
                {["S", "M", "L", "XL"].map(size => (
                    <label key={size} style={{ marginRight: "10px" }}>
                        <input
                            type="checkbox"
                            checked={product.sizes.includes(size)}
                            onChange={() => handleSizeChange(size)}
                        />
                        {size}
                    </label>
                ))}

                <br /><br />

                <h4>Gender</h4>
                {["Men", "Women", "Unisex"].map(g => (
                    <label key={g} style={{ marginRight: "10px" }}>
                        <input
                            type="radio"
                            name="gender"
                            value={g}
                            checked={product.gender === g}
                            onChange={handleChange}
                        />
                        {g}
                    </label>
                ))}

                <br /><br />

                <h4>Category</h4>
                <select
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Category</option>
                    <option value="mobiles">Mobiles</option>
                    <option value="groceries">Groceries</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="sports">Sports</option>
                </select>

                <br /><br />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    name="discount"
                    placeholder="Discount (%)"
                    value={product.discount}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">Add Product</button>

            </form>
        </div>
    );
}

export default AdminAddProduct;
