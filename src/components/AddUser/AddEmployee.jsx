import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AddEmployee.module.css';
import human from '../../assets/images/human.svg';
import closeIcon from '../../assets/images/close-icon.svg';
import successIcon from '../../assets/images/success-icon.svg';  // Ensure this path is correct
import loadingIcon from '../../assets/images/loadingIcon.png';  // Ensure this path is correct
import addIcon from '../../assets/images/add-icon.svg'; 
import { Link } from 'react-router-dom';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    department: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [departments, setDepartments] = useState([]);
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjZWVvZmZpY2lhbDAwMUBnbWFpbC5jb20iLCJpYXQiOjE3MjI5MzgxMTUsImV4cCI6MTcyMzExMDkxNX0.aEkS8A1Y11tG_6rF4fsBcn5JMw0UmKxgvAOUtdjPb94'; // Replace with your actual token or get it dynamically

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/departments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, [token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/admin/add-employee', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setModalMessage('New User has been created.');
      setShowModal(true);
      setIsLoading(false);
    } catch (error) {
      setModalMessage('An error occurred while adding the employee.');
      setShowModal(true);
      setIsLoading(false);
    }
  };

 
  return (
  <div className={styles.container}>
  <div className={styles.header}>
    <img src={human} alt="Icon" className={styles.icon} />
    <button className={styles.closeButton} onClick={() => setShowModal(false)}>
      <img src={closeIcon} alt="Close" />
    </button>
  </div>
  <h2 className={styles.title}>Create New User</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="firstName">First Name
          <span className={styles.asterisk}>*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lastName">Last Name
          <span className={styles.asterisk}>*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email
          <span className={styles.asterisk}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="position">Position
          <span className={styles.asterisk}>*</span>
          </label>
          <input
            type="text"
            id="position"
            name="position"
            placeholder="Position"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>

        {/* <div className={styles.formGroup}>
          <label htmlFor="category">Category
          <span className={styles.asterisk}>*</span>
          </label>
          <input
            type="text"
            id="category"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div> */}
        
        <div className={styles.formGroup}>
          <div className={styles.labelAndButton}>
            <label htmlFor="department">Department
            <span className={styles.asterisk}>*</span>
            </label>
            <Link to="/create-department" className={styles.addButton}>
              <img src={addIcon} alt="Add" />
            </Link>
          </div>
          <div className={styles.selectWrapper}>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select department</option>
              {departments.map((dept) => (
                <option key={dept.orgId} value={dept.departmentName}>{dept.departmentName}</option>
              ))}
            </select>
          </div>
        </div>



        <div className={styles.buttonGroup}>
          <button type="submit" disabled={isLoading}>
            Confirm
          </button>
        </div>
      </form>

{showModal && (
  <div className={styles.modalOverlay}>
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
      <img src={successIcon} alt="Success" className={styles.successIcon} />
        <button className={styles.closeButton} onClick={() => setShowModal(false)}>
          <img src={closeIcon} alt="Close" />
        </button>
      </div>
      <div className={styles.modalBody}>
        <h2>User Created Successfully</h2>
        <p>{modalMessage}</p>
      </div>
      <button onClick={() => setShowModal(false)} className={styles.confirmButton}>Confirm</button>
    </div>
  </div>
)}

      {isLoading && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalLoading}>
            <div className={styles.loading}>
              <img src={loadingIcon} alt="Loading" className={styles.loadingIcon} />
              <p>Loading...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default AddEmployee;

