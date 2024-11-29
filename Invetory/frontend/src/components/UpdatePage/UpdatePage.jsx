import React, { useState, useEffect } from "react";
import styles from "./UpdatePage.module.css";
import { useNavigate } from "react-router-dom";
import { updateProduct } from "../../services/api"; // Import your API function
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";


const UpdatePage = ({ existingProductId }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Get user token for authorization
  const [product, setProduct] = useState({
    name: "",
    category: "",
    stock: "",
    description: "",
    _id: "",
  });

  // Pre-fill the form with the existing product data
  useEffect(() => {
    const productId = window.location.pathname.split("/")[2];
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [user.token]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productId = window.location.pathname.split("/")[2];

    try {
      // Call the updateProduct API
      const updatedProduct = await updateProduct(productId|| "", product, user.token);

      console.log("Product Updated:", updatedProduct.data);

      alert("Product updated successfully!");
      navigate("/"); // Redirect to the main page
    } catch (error) {
      console.error("Error updating product:", error.response?.data || error.message);
      alert("Failed to update the product. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/"); // Redirect to the main page
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Update Product</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Product Name */}
          <div className={styles.formGroup}>
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Category */}
          <div className={styles.formGroup}>
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={product.category}
              onChange={handleInputChange}
              placeholder="Enter product category"
              required
            />
          </div>

          {/* Stock */}
          <div className={styles.formGroup}>
            <label htmlFor="stock">Stock Quantity</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={product.stock}
              onChange={handleInputChange}
              placeholder="Enter stock quantity"
              min="0"
              required
            />
          </div>

          {/* Buttons */}
          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.backButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className={styles.nextButton}>
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePage;

