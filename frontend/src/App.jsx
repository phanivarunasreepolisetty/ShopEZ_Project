import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminHeader from "./components/AdminHeader";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Account from "./pages/Account";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminOrders from "./pages/AdminOrders";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminUsers from "./pages/AdminUsers";
import AdminProducts from "./pages/AdminProducts";

function App() {
    return (
        <>
            <Routes>

                {/* Landing - No Header */}
                <Route path="/" element={<Landing />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Full Header Pages */}
                <Route
                    path="/home"
                    element={
                        <>
                            <Header />
                            <Home />
                        </>
                    }
                />

                <Route
                    path="/products"
                    element={
                        <>
                            <Header />
                            <Products />
                        </>
                    }
                />

                <Route
                    path="/product/:id"
                    element={
                        <>
                            <Header />
                            <ProductDetails />
                        </>
                    }
                />

                {/* ✅ Checkout Now Uses Simple Header (Like Cart) */}
                <Route
                    path="/checkout"
                    element={
                        <>
                            <Header simple />
                            <Checkout />
                        </>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <>
                            <Header />
                            <Profile />
                        </>
                    }
                />

                {/* Simple Header Pages */}
                <Route
                    path="/cart"
                    element={
                        <>
                            <Header simple />
                            <Cart />
                        </>
                    }
                />

                <Route
                    path="/orders"
                    element={
                        <>
                            <Header simple />
                            <Orders />
                        </>
                    }
                />

                <Route
                    path="/account"
                    element={
                        <>
                            <Header simple />
                            <ProtectedRoute>
                                <Account />
                            </ProtectedRoute>
                        </>
                    }
                />

                {/* Admin Pages */}
                <Route
                    path="/admin"
                    element={
                        <>
                            <AdminHeader />
                            <AdminDashboard />
                        </>
                    }
                />

                <Route
                    path="/admin/add-product"
                    element={
                        <>
                            <AdminHeader />
                            <AdminAddProduct />
                        </>
                    }
                />

                <Route
                    path="/admin/orders"
                    element={
                        <>
                            <AdminHeader />
                            <AdminOrders />
                        </>
                    }
                />

                <Route
                    path="/admin/users"
                    element={
                        <>
                            <AdminHeader />
                            <AdminUsers />
                        </>
                    }
                />

                <Route
                    path="/admin/products"
                    element={
                        <>
                            <AdminHeader />
                            <AdminProducts />
                        </>
                    }
                />

            </Routes>

            {/* Footer everywhere */}
            <Footer />
        </>
    );
}

export default App;
