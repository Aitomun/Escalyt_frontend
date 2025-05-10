import React, { useState, useEffect } from 'react';
import featuredIcon from '../../assets/Featured.svg';
import xButton from '../../assets/close.svg';
import TicketNotification from './TicketNotification';
import { useNavigate } from 'react-router-dom';

const URLS = {
  CATEGORY: "http://localhost:8080/api/admin/categories",
  TICKET: (id) => `http://localhost:8080/api/tickets/create/${id}`,
};

const token = localStorage.getItem("token");

function TicketForm() {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoryError, setCategoryError] = useState(null);
  const [fileName, setFileName] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    priority: "LOW",
    description: "",
    attachment: null,
    categoryId: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch(URLS.CATEGORY, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setCategories(json.categories || []);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setCategoryError("Failed to load categories");
      })
      .finally(() => setLoadingCategories(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, attachment: file }));
    setFileName(file ? file.name : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.categoryId === 0) {
      console.error("Category ID is not selected");
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (key !== 'attachment') formDataToSend.append(key, val);
    });
    if (formData.attachment) {
      formDataToSend.append('file', formData.attachment);
    }

    try {
      const response = await fetch(URLS.TICKET(formData.categoryId), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        setShowModal(true);
      } else {
        console.error("Failed to create ticket");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCloseModal = () => {
    navigate(-1);
  };

  return (
    <div>
      {showModal ? (
        <TicketNotification showModal={showModal} handleCloseModal={handleCloseModal} />
      ) : (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <div className="flex justify-between items-center mb-4">
              <img src={featuredIcon} alt="Featured Icon" className="h-10 w-10" />
              <button onClick={handleCloseModal}>
                <img src={xButton} alt="Close Button" className="h-10 w-10" />
              </button>
            </div>
            <h2 className="text-lg font-medium mb-4 text-left">Create New Ticket</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title">Title <span className="text-red-500">*</span></label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required className="w-full border border-blue-400 py-2 px-3" />
              </div>
              <div>
                <label htmlFor="location">Location <span className="text-red-500">*</span></label>
                <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required className="w-full border border-blue-400 py-2 px-3" />
              </div>
              <div>
                <label htmlFor="categoryId">Category <span className="text-red-500">*</span></label>
                <select id="categoryId" name="categoryId" value={formData.categoryId} onChange={handleChange} required className="w-full border border-blue-400 py-2 px-3">
                  <option value="0">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="priority">Priority <span className="text-red-500">*</span></label>
                <select id="priority" name="priority" value={formData.priority} onChange={handleChange} className="w-full border border-blue-400 py-2 px-3">
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>
              </div>
              <div>
                <label htmlFor="description">Description <span className="text-red-500">*</span></label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} required className="w-full border border-blue-400 py-2 px-3" />
              </div>
              <div className="border-2 border-dashed border-gray-300 py-2 px-3 h-24">
                <label htmlFor="attachment" className="text-center text-gray-500 cursor-pointer block">Drop your files here or <span className="underline text-blue-400">browse</span></label>
                <input type="file" id="attachment" name="attachment" onChange={handleFileChange} className="hidden" />
                {fileName && <p className="text-center text-gray-500 mt-2">{fileName}</p>}
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white py-2 hover:bg-blue-600">Confirm</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicketForm;
