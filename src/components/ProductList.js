import React, { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import { Circles } from "react-loader-spinner";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const loggedInUserId = "1"; // Replace with actual user ID

  // Fetch products from the backend
  useEffect(() => {
    api
      .get("/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again.");
        setLoading(false);
      });
  }, []);

  // Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Add to Cart handler
  const handleAddToCart = (productId) => {
    api
      .post(`/users/addToCart/${loggedInUserId}/${productId}`)
      .then(() => toast.success("Product added to cart"))
      .catch((error) => toast.error("Failed to add product to cart."));
  };

  // Delete Product handler
  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/products/${productId}`);
        toast.success("Product deleted successfully!");
        // Remove the deleted product from the product list
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      } catch (error) {
        console.error("Error deleting product:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Failed to delete product.");
      }
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Product List</h1>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {error && <p className="text-danger text-center">{error}</p>}
      {loading ? (
        <div className="d-flex justify-content-center">
          <Circles color="#00BFFF" height={80} width={80} />
        </div>
      ) : (
        <>
          <div className="row">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <div key={product._id} className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">Price: ${product.price}</p>
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-success"
                          onClick={() => handleAddToCart(product._id)}
                        >
                          Add to Cart
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No products found.</p>
            )}
          </div>
          {filteredProducts.length > productsPerPage && (
            <div className="d-flex justify-content-center my-4">
              <button
                className="btn btn-primary me-2"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className="btn btn-primary"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
