import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../services/api";
import styles from "./AddProduct.module.css";
import { AuthContext } from "../../context/AuthContext";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Added:", product);
    createProduct(product, user.token).then(() => {
      alert("Product added successfully!");
      setProduct({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
      });
      navigate("/");
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Add New Product</h1>
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
            <button type="button" className={styles.backButton} onClick={handleBack}>
              Back
            </button>
            <button type="submit" className={styles.nextButton}>
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

