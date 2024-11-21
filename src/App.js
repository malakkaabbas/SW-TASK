import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import CartPage from "./pages/CartPage";
import ProductDetail from "./components/ProductDetail";
import DeleteProduct from "./components/DeleteProduct"; 
import AddUserForm from "./components/AddUserForm"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const loggedInUserId = localStorage.getItem("userId") || "1";

  return (
    <Router>
      <ToastContainer />
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Shopping System
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/cart/${loggedInUserId}`}>
                  Shopping Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/delete-product">
                  Delete Product
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-user">
                  Add User
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/cart/:id" element={<CartPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/delete-product" element={<DeleteProduct />} />
        <Route path="/add-user" element={<AddUserForm />} />
      </Routes>
    </Router>
  );
};

export default App;
