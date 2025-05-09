import Button from "../button";
import TextInput from "../input";
import TextArea from "../TextArea";
import logo from "../../../assets/logo.svg";
import closeIcon from "../../../assets/x-close.svg";
import Modal from "../SuccessModal";
import { useState } from "react";
import axios from "axios";
import styles from "./category.module.css";

const CategoryForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ categoryName: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Accessing environment variables
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpa2lzZWh0b2NodWt3dUBnbWFpbC5jb20iLCJpYXQiOjE3MjI3OTY3NDEsImV4cCI6MTcyMjk2OTU0MX0.wHHLjeakwbmyT08HehrDb63esMTh9UPg5nW0tdZlmyk";

  const submitHandle = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.post(
        `${baseUrl}/api/admin/new-category`,
        {
          categoryName: formData.categoryName,
          description: formData.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(token);
      console.log(formData.categoryName);
      console.log(formData.description);
  
      if (response.data.responseCode === "005") {
        setShowModal(true);
        setFormData({ categoryName: "", description: "" });
      } else {
        setError(response.data.responseMessage || "Failed to create category. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
  
        if (error.response.status === 401) {
          setError("Unauthorized access. Please check your credentials or login again.");
        } else {
          setError(`Error: ${error.response.data.message || 'An error occurred'}`);
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
        setError("No response received from server. Please try again.");
      } else {
        console.error("Error message:", error.message);
        setError("An error occurred while sending the request. Please try again.");
      }
      console.error("Error config:", error.config);
    } finally {
      setLoading(false);
    }
  };  

  return (
    <section className={styles.category}>
      <div className={styles.subContainer}>
        {!showModal && (
          <div>
            <img src={closeIcon} className={styles.closeIcon} alt="Close" />
            <img src={logo} alt="Logo" />
            <h5 className={styles.formHeader}>Create New Category</h5>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <TextInput
              value={formData.categoryName}
              label="Category Name"
              placeholder="Category Name"
              setValue={(data) => {
                setFormData((prevData) => ({ ...prevData, categoryName: data }));
              }}
            />
            <TextArea
              value={formData.description}
              label="Description"
              placeholder="Description"
              setValue={(data) => {
                setFormData((prevData) => ({ ...prevData, description: data }));
              }}
            />
            <Button onClick={submitHandle} disabled={loading} />
          </div>
        )}
        {showModal && (
          <Modal closeModal={() => setShowModal(false)} />
        )}
      </div>
    </section>
  );
};

export default CategoryForm;
