import React, { useEffect, useState, useContext } from "react";
import "./SellerAllProducts.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
// Icon
import Product from "../../../assets/SellerAsset/product.png";
// Context
import { userContext } from "../../../Context/userContext";
import { Link } from "react-router-dom";

function SellerAllProducts() {
  const [data, setData] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const { currentUser } = useContext(userContext);

  useEffect(() => {
    if (currentUser) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/products/seller/${currentUser._id}`
          );
          setData(response.data.product);
        } catch (error) {
          console.error("Error fetching data", error.message);
        }
      };
      fetchData();
    }
  }, [currentUser]);

  const confirmDelete = (productId) => {
    setProductToDelete(productId);
    setShowConfirmation(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/products/${productToDelete}`
      );
      setData((prevData) =>
        prevData.filter((product) => product._id !== productToDelete)
      );
      toast.success("Product deleted successfully!"); // Show success toast
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error deleting product", error.message);
      toast.error("Error deleting product. Please try again."); // Show error toast
    }
  };

  return (
    <div
      className={`SellerAllProduct-Container ${
        showConfirmation ? "disabled-buttons" : ""
      }`}
    >
      {/* Navbar */}
      <div className="SellerAllProduct-Nav">
        <div className="SellerAllProduct-heading">
          <img src={Product} alt="Product Icon" />
          <h2>All Products</h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="SellerAllProduct-Product-Container">
        {data.length > 0 ? (
          data.map((product) => (
            <div key={product._id} className="SellerAllProduct-Product">
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}/uploads/${
                  product.image
                }`}
                alt="Product"
              />
              <p className="Product-Name">{product.name}</p>
              <p>
                <span>&#8377;</span>
                {product.price}
              </p>
              <p>{product.category[0]}</p>
              <p>{product.gender}</p>
              <div className="SellerAllProduct-buttons">
                <Link to={`/dashboard/all-product/edit-product/${product._id}`}>
                  <button className="button-4">Edit</button>
                </Link>
                <button
                  className="button-4-2"
                  onClick={() => confirmDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="No-Product">
            <p>You have no products</p>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <>
          <div className="confirmation-modal-overlay" />
          <div className="confirmation-modal">
            <h3>Are you sure you want to delete this product?</h3>
            <div className="modal-buttons">
              <button className="button-4-2" onClick={handleDelete}>
                Delete
              </button>
              <button
                className="button-4"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}

      <ToastContainer
        position="top-center"
        autoClose={5000}
        newestOnTop={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </div>
  );
}

export default SellerAllProducts;
