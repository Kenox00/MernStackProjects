import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProductTable.module.css";
import { AuthContext } from "../../context/AuthContext";
import { deleteProduct } from "../../services/api";

const ProductTable = () => {
  const [products, setProducts] = React.useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/products', {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          console.error("Error data:", data);
        } else if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Expected an array of products");
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [user.token, navigate]);

  const handleUpdateClick = (productId) => {
    navigate(`/update-product/${productId}`);
  };
  const handleDetailsClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleDeleteClick = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteProduct(productId, user.token);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error.response?.data || error.message);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className={styles.tableContainer}>
      <h2 className={styles.tableTitle}>Product List</h2>
      <table className={styles.productTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td onClick={() => handleDetailsClick(product._id)}>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>
                <button
                  className={styles.updateButton}
                  onClick={() => handleUpdateClick(product._id)}
                >
                  Update
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteClick(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;

