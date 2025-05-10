import Button from "../button";
import TextInput from "../input";
import TextArea from "../TextArea";
import logo from "../../../assets/logo.svg";
import closeIcon from "../../../assets/x-close.svg";
import Modal from "../SuccessModal";
import { useState } from "react";
import axios from "axios";
import styles from "./category.module.css";

const CategoryForm = ({ onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ categoryName: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");

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

      if (response.data.responseCode === "005") {
        setShowModal(true);
        setFormData({ categoryName: "", description: "" });
      } else {
        setError(response.data.responseMessage || "Failed to create category. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "An error occurred.");
      } else if (error.request) {
        setError("No response received from server.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.category}>
      <div className={styles.subContainer}>
        {!showModal ? (
          <div>
            <img
              src={closeIcon}
              className={styles.closeIcon}
              alt="Close"
              onClick={onClose} // ✅ use the prop to close parent
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                cursor: 'pointer',
                width: '20px'
              }}
            />
            <img src={logo} alt="Logo" />
            <h5 className={styles.formHeader}>Create New Category</h5>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <TextInput
              value={formData.categoryName}
              label="Category Name"
              placeholder="Category Name"
              setValue={(data) =>
                setFormData((prev) => ({ ...prev, categoryName: data }))
              }
            />
            <TextArea
              value={formData.description}
              label="Description"
              placeholder="Description"
              setValue={(data) =>
                setFormData((prev) => ({ ...prev, description: data }))
              }
            />
            <Button onClick={submitHandle} disabled={loading} />
          </div>
        ) : (
          <Modal closeModal={() => setShowModal(false)} />
        )}
      </div>
    </section>
  );
};

export default CategoryForm;
