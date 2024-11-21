import React, { useState } from "react";
import api from "../api";
import { toast } from "react-toastify";

const DeleteProduct = () => {
  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!productId.trim()) {
      toast.error("Please enter a valid Product ID");
      return;
    }

    setLoading(true);

    try {
      await api.delete(`/products/${productId}`);
      toast.success("Product deleted successfully!");
      setProductId("");
    } catch (error) {
      console.error("Error deleting product:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to delete product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Delete Product</h1>
      <form onSubmit={handleDelete}>
        <div className="mb-3">
          <label htmlFor="productId" className="form-label">
            Product ID
          </label>
          <input
            type="text"
            className="form-control"
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-danger" disabled={loading}>
          {loading ? "Deleting..." : "Delete Product"}
        </button>
      </form>
    </div>
  );
};

export default DeleteProduct;
