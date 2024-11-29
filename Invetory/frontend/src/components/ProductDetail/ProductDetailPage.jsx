import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "./ProductDetailPage.module.css";
import { stockInProduct, stockOutProduct } from "../../services/api"; // Import stock management functions
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext for user authentication

const ProductDetailPage = () => {
  const [product, setProduct] = useState({});
  const [stock, setStock] = useState(0);
  const { user } = useContext(AuthContext); // Context to get authenticated user and token

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productId = window.location.pathname.split("/")[2]; 
        const response = await axios.get(
          `http://localhost:4000/api/products/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setProduct(response.data);
        setStock(response.data.stock);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [user.token]);

  const handleStockUpdate = async (type, amount) => {
    if (!user || !user.token) {
      alert("User is not authenticated.");
      return;
    }
  
    const data = { stock: amount }; // Changed from amount to stock
    try {
      if (type === "in") {
        await stockInProduct(product._id, data, user.token);
        setStock(stock + amount);
      } else if (type === "out") {
        if (stock >= amount) {
          await stockOutProduct(product._id, data, user.token);
          setStock(stock - amount);
        } else {
          alert("Insufficient stock!");
        }
      }
    } catch (error) {
      console.error(`Failed to ${type === "in" ? "stock in" : "stock out"}:`, error);
      alert("Failed to update stock. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const amount = parseInt(e.target.amount.value, 10); // Parse the quantity input
    const type = e.target.stockType.value; // Get the selected stock action

    if (!isNaN(amount) && amount > 0) {
      handleStockUpdate(type, amount); // Perform stock update
    } else {
      alert("Please enter a valid number!");
    }

    e.target.reset(); // Reset the form after submission
  };

  return (
    <div className={styles.container}>
      {/* Left Section: Product Details */}
      <div className={styles.productDetails}>
        <h1>{product.name}</h1>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Stock Available:</strong> {stock}</p>
      </div>

      {/* Right Section: Stock In/Out Form */}
      <div className={styles.stockForm}>
        <h2>Manage Stock</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="amount">Quantity:</label>
            <input type="number" id="amount" name="amount" min="1" required />
          </div>
          <div className={styles.formGroup}>
            <label>Action:</label>
            <div className={styles.radioGroup}>
              <input
                type="radio"
                id="stockIn"
                name="stockType"
                value="in"
                defaultChecked
              />
              <label htmlFor="stockIn">Stock In</label>
              <input
                type="radio"
                id="stockOut"
                name="stockType"
                value="out"
              />
              <label htmlFor="stockOut">Stock Out</label>
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>
            Update Stock
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetailPage;