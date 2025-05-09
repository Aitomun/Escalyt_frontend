import React, { useState } from 'react';
import styles from './AdminProfileEdit.module.css';
 // Ensure the path is correct

const AdminProfileEdit = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    jobTitle: '',
    department: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  const handleSaveChanges = () => {
    console.log('Save changes clicked:', formData);
  };

  const handleBack = () => {
    window.history.back(); // Navigate to the previous page
  };

  return (
    <>
    <div>
    <div className={styles.button_container}>
        <button className={styles.back_button} onClick={handleBack}>
          ←
        </button>
        <button type="submit" className={styles.save_changes_button}>
              Save Changes
            </button>
        
        </div>
    </div>
    <div className={styles.page_container}>
      <div className={styles.profile_edit_container}>
        
        <form onSubmit={handleSubmit} className={styles.profile_edit_form}>
         
          <label htmlFor="fullName">
            First Name<span className={styles.asterisk}>*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">
            Last Name<span className={styles.asterisk}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="username">
            Username<span className={styles.asterisk}>*</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label htmlFor="jobTitle">
            Job Title<span className={styles.asterisk}>*</span>
          </label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
          />
          <label htmlFor="department">
            Department<span className={styles.asterisk}>*</span>
          </label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
          </select>
          <label htmlFor="password">
            PhoneNumber<span className={styles.asterisk}>*</span>
          </label>
          <input
            type="text"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
         
        </form>
      </div>
    </div>
    </>
  );
};


export default AdminProfileEdit;
