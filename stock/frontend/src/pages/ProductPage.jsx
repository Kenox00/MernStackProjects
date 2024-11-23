import React, { useEffect, useState } from "react";
import {
  getProducts,
  stockInProduct,
  stockOutProduct,
  deleteProduct,
  updateProduct,
} from "../services/api";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "stock-in", "stock-out", or "update"
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formValues, setFormValues] = useState({ name: "", stock: 0 }); // Form for update
  const [stockQuantity, setStockQuantity] = useState(0); // Stock value entered for stock in/out
  const token = localStorage.getItem("token");

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(token);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [token]);

  // Handle Stock Update (Stock In or Stock Out)
  const handleStockUpdate = async () => {
    try {
      const data = { stock: stockQuantity };
      if (modalType === "stock-in") {
        await stockInProduct(selectedProduct._id, data, token);
        setMessage("Stock increased successfully.");
      } else if (modalType === "stock-out") {
        await stockOutProduct(selectedProduct._id, data, token);
        setMessage("Stock reduced successfully.");
      }
      // Refresh product list
      fetchProducts();
      closeModal();
    } catch (error) {
      setMessage(error.response?.data?.error || "Error updating stock.");
    }
  };

  // Handle Delete Product
  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId, token);
      setMessage("Product deleted successfully.");
      // Refresh product list
      fetchProducts();
    } catch (error) {
      setMessage(error.response?.data?.error || "Error deleting product.");
    }
  };

  // Handle Update Product
  const handleUpdate = async () => {
    try {
      await updateProduct(selectedProduct._id, formValues, token);
      setMessage("Product updated successfully.");
      // Refresh product list
      fetchProducts();
      closeModal();
    } catch (error) {
      setMessage(error.response?.data?.error || "Error updating product.");
    }
  };

  // Open Modal
  const openModal = (product, type) => {
    setSelectedProduct(product);
    setModalType(type);
    if (type === "update") {
      setFormValues({ name: product.name, stock: product.stock });
    }
    setShowModal(true);
  };

  // Close Modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setStockQuantity(0);
    setFormValues({ name: "", stock: 0 });
    setModalType("");
  };

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const response = await getProducts(token);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8">
      <nav className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <div className="flex items-center">
          <p className="mr-4">Welcome, {localStorage.getItem("username")}!</p>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("username");
              window.location.href = "/";
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Success/Error Message */}
      {message && <p className="text-green-500 mb-4">{message}</p>}

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md p-4 relative"
          >
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-4">Stock: {product.stock}</p>
            <div className="flex justify-between">
              <button
                onClick={() => openModal(product, "stock-in")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Stock In
              </button>
              <button
                onClick={() => openModal(product, "stock-out")}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Stock Out
              </button>
            </div>
            <div className="absolute top-2 right-2 flex space-x-2">
              <button
                onClick={() => openModal(product, "update")}
                className="text-gray-600 hover:text-blue-500"
              >
                <i className="fas fa-edit"></i>
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="text-gray-600 hover:text-red-500"
              >
               <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            {modalType === "update" ? (
              <>
                <h3 className="text-xl font-bold mb-4">Update Product</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdate();
                  }}
                >
                  {/* Product Name */}
                  <div className="mb-4">
                    <label className="block font-semibold mb-1">Name</label>
                    <input
                      type="text"
                      value={formValues.name}
                      onChange={(e) =>
                        setFormValues({ ...formValues, name: e.target.value })
                      }
                      required
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  {/* Stock Quantity */}
                  <div className="mb-4">
                    <label className="block font-semibold mb-1">Stock</label>
                    <input
                      type="number"
                      min="0"
                      value={formValues.stock}
                      onChange={(e) =>
                        setFormValues({ ...formValues, stock: e.target.value })
                      }
                      required
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  {/* Submit and Cancel Buttons */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-4">
                  {modalType === "stock-in" ? "Stock In" : "Stock Out"} -{" "}
                  {selectedProduct.name}
                </h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleStockUpdate();
                  }}
                >
                  {/* Stock Quantity */}
                  <div className="mb-4">
                    <label className="block font-semibold mb-1">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      value={stockQuantity}
                      onChange={(e) =>
                        setStockQuantity(parseInt(e.target.value))
                      }
                      required
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  {/* Submit and Cancel Buttons */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;