import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./AuthRouter.css";

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                formData
            );

            // ✅ Save token
            // ✅ Save everything together (including token)
            localStorage.setItem("user", JSON.stringify({
                _id: res.data._id,
                username: res.data.username,
                email: res.data.email,
                userType: res.data.userType,
                token: res.data.token
            }));

            // (optional) you can still keep this if other parts use it
            localStorage.setItem("token", res.data.token);


            // 🔐 Redirect properly
            if (res.data.userType === "admin") {
                navigate("/admin");
            } else {
                navigate("/products");
            }

        } catch (err) {
            console.log(err);
            alert(err.response?.data?.message || "Invalid Credentials");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Welcome Back</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <div className="password-field">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <span onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <button type="submit">Login</button>
                </form>

                <p className="auth-link">
                    Don't have an account?{" "}
                    <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
