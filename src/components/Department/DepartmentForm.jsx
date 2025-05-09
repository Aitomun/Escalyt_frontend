import { useState } from "react";
import axios from "axios";
import Button from "./ButtonDepartment";
import TextInput from "./TextInputDepartment";
import closeIcon from "../../assets/x-close.svg";
import Modal from "./SuccessModelDepartment";
import Profile from '../../assets/Profile.svg';

const DepartmentForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ department: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = import.meta.env.VITE_API_TOKEN;

  const submitHandle = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${baseUrl}/api/admin/create-department`,
        {
          departmentName: formData.department,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 201) {
        setShowModal(true);
        setFormData({ department: "" });
      } else {
        setError(response.data || "Failed to create department. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        setError(`Error: ${error.response.data.message || 'An error occurred'}`);
      } else if (error.request) {
        setError("No response received from server. Please try again.");
      } else {
        setError("An error occurred while sending the request. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      {!showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative w-full max-w-[300px] bg-white rounded p-4">
            <div className="flex items-center justify-between mb-4">
              <img src={Profile} alt="Profile" />
              <img src={closeIcon} alt="Close" className="cursor-pointer" />
            </div>

            <h5 className="font-medium text-dark text-left mb-4">
              Create New Department
            </h5>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <TextInput
              value={formData.department}
              label="Department Name"
              placeholder="Department Name"
              setValue={(data) => {
                setFormData((prevData) => ({ ...prevData, department: data }));
              }}
            />
            <Button onClick={submitHandle} disabled={loading} />
          </div>
        </div>
      )}
      {showModal && (
        <Modal closeModal={() => setShowModal(false)} />
      )}
    </section>
  );
};

export default DepartmentForm;
