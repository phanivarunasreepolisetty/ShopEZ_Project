import { useState } from "react";
import API from "../api/axios";

function AddProduct() {
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

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleAdd = async () => {
        try {
            await API.post("/admin/add-product", product);
            alert("Product added successfully");
        } catch (err) {
            console.log(err.response?.data);
            alert("Error adding product");
        }
    };

    return (
        <div>
            <h2>Add Product</h2>

            <input
                name="name"
                placeholder="Name"
                onChange={handleChange}
            />

            <input
                name="description"
                placeholder="Description"
                onChange={handleChange}
            />

            <input
                name="image"
                placeholder="Image URL"
                onChange={handleChange}
            />

            <input
                name="price"
                placeholder="Price"
                onChange={handleChange}
            />

            <input
                name="discount"
                placeholder="Discount"
                onChange={handleChange}
            />

            <input
                name="category"
                placeholder="Category"
                onChange={handleChange}
            />

            <input
                name="gender"
                placeholder="Gender"
                onChange={handleChange}
            />

            <button onClick={handleAdd}>Add</button>
        </div>
    );
}

export default AddProduct;
