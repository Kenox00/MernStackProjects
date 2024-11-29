import React from "react";
import styles from "./Dashboard.module.css";
import { FaBoxOpen, FaUsers, FaShoppingCart, FaThLarge, FaUser } from "react-icons/fa";
import ProductTable from "../ProductTable/ProductTable";
import {  useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate("/add-product");
  };
  const handleCategories = () => {
    navigate("/category");
  }

  return (
    <>
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <FaBoxOpen className={styles.iconLarge} />
        <h1 className={styles.title}>Warehouse Inventory System</h1>
      </div>

      {/* Content Section */}
      <div className={styles.content}>
        <div className={styles.card} onClick={handleAddProduct}>
          <FaBoxOpen className={styles.icon} />
          <p>Add Product</p>
        </div>
        <div className={styles.card}>
          <FaUser className={styles.icon} />
          <p>Customer</p>
        </div>
        <div className={styles.card}>
          <FaShoppingCart className={styles.icon} />
          <p>Orders</p>
        </div>
        <div className={styles.card} onClick={handleCategories}>
          <FaThLarge className={styles.icon} />
          <p>Categories</p>
        </div>
        <div className={styles.card}>
          <FaUsers className={styles.icon} />
          <p>Users</p>
        </div>
      </div>
    </div>
    <ProductTable/>
    </>
  );
};

export default Dashboard;
