import React, { useState, useEffect } from 'react';
import featuredIcon from '../../assets/Featured.svg';
import xButton from '../../assets/close.svg';
import TicketNotification from './TicketNotification';
import { useFetchCategory } from './File';

const URLS = {
  CATEGORY: "http://localhost:8080/api/admin/category",
  TICKET: (id) => `http://localhost:8080/api/tickets/create/${id}`,
};

const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb3lhbGlodW5tYUBnbWFpbC5jb20iLCJpYXQiOjE3MjI5NTg4NTAsImV4cCI6MTcyMzEzMTY1MH0.MNEvBdp1vdddwknAAxaPe_RQrH163I1n70MYgyJ87r4"; // Replace with actual token

function TicketForm() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    priority: "LOW",
    description: "",
    attachment: null,
    categoryId: 0,
  });

  const [fileName, setFileName] = useState("");

  const { data: categories, isError, isLoading } = useFetchCategory(URLS.CATEGORY, token);

  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      attachment: e.target.files[0],
    }));
    setFileName(file ? file.name : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { categoryId, ...restFormData } = formData;

    if (categoryId === 0) {
      console.error("Category ID is not selected");
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(restFormData).forEach(key => formDataToSend.append(key, restFormData[key]));
    if (formData.attachment) {
      formDataToSend.append('file', formData.attachment);
    }

    try {
      const response = await fetch(URLS.TICKET(categoryId), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        setShowModal(true);
      } else {
        console.error("Failed to create ticket", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


 useEffect(() => {
    if (isError) {
      console.error("Error fetching categories");
    } else if (isLoading) {
      console.log("Loading categories...");
    } else {
      console.log("Categories:", categories); // Check the structure here
    }
  }, [categories, isError, isLoading]);

  

  return (
    <div>
      {showModal ? <TicketNotification showModal={showModal} handleCloseModal={handleCloseModal} /> :( 

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
      <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title <span className='text-red-500'>*</span></label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        className="mt-1 block w-full border border-blue-400 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-600 focus:border-blue-500"
      />
    </div>
    <div>
      <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location <span className='text-red-500'>*</span></label>
      <input
        type="text"
        id="location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
        className="mt-1 block w-full border border-blue-400 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-600 focus:border-blue-500"
      />
    </div>
    <div>
      <label htmlFor="category" className="block text-sm font-medium text-gray-700"> Category  <span className='text-red-500'>*</span></label>
      <select
        id="category"
        name="categoryId"
        value={formData.categoryId}
        onChange={handleChange}
        required
        className="appearance-none mt-1 block w-full border border-blue-400 shadow-sm py-2 px-3 pr-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        style={{ background: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='blue' width='18' height='18'><path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' /></svg>") no-repeat right 0.5rem center` }}
      >
         <option value="0">Select Category</option>
       {categories.length > 0 ? (
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.categoryName}
                      </option>
                    ))
                  ) : (
                    <option value="">Select Option</option>
                  )}
      </select>
    </div>
    <div>
      <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority Level <span className='text-red-500'>*</span></label>
      <select
        id="priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        required
        className="appearance-none mt-1 block w-full border border-blue-400 shadow-sm py-2 px-3 pr-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        style={{ background: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='blue' width='18' height='18'><path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' /></svg>") no-repeat right 0.5rem center` }}
      >
        <option value="HIGH">High</option>
        <option value="MEDIUM">Medium</option>
        <option value="LOW">Low</option>
      </select>
    </div>
    <div>
      <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description <span className='text-red-500'>*</span></label>
      <textarea
        id="description"
        name="description"
        placeholder='Input'
        value={formData.description}
        onChange={handleChange}
        required
        className="mt-1 block w-full border border-blue-400 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div className="mt-1 block w-full border-2 border-dashed border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-24">
    <div>
                <label htmlFor="fileInput" className="block text-center text-gray-500 cursor-pointer pt-4">
                  Drop your files here or <span className="underline text-blue-400" onClick={() => document.getElementById('attachment').click()}>browse</span>
                </label>
                <p className="text-gray-400 text-xs mt-1 text-center">Maximum size: 50MB</p>
                <input
                  type="file"
                  id="attachment"
                  name="attachment"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {fileName && <p className="text-center text-gray-500 mt-2">{fileName}</p>}
              </div>
              </div>
    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 px-4  hover:bg-blue-600"
    >
      Confirm
    </button>
  </form>
</div>
</div> 


      )}
      
     
    </div>
  );
}

export default TicketForm;
