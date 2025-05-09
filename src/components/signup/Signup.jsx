
import React, { useState } from 'react';
import axios from 'axios';
import signup from './Signup.module.css';
import escalogo from '../../assets/images/esca-logo.svg';
import signupicon from '../../assets/images/signupicon.png';
import eyeicon from '../../assets/images/eyeicon.svg';
import engine from '../../assets/images/engine.svg'; 
import tickicon from '../../assets/images/tick-icon.svg'; 
import closeIcon from '../../assets/images/close-icon.svg';
import loadingIcon from '../../assets/images/loadingIcon.png';

function Signup() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    department: '',
    position: '',
    category: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true); // Show loading modal 
      try {
        const response = await axios.post(`${baseUrl}/api/auth/register`, formData);
        setIsLoading(false); // Hide loading modal
        if (response.status === 200) {
          setModalMessage('We have sent a verification code to your email address. Please check your inbox and follow the instructions to verify your account.');
          setIsError(false);
          setShowModal(true);
        }
      } catch (error) {
        console.error(error);
        setModalMessage(error.response.data || 'An error occurred during registration.');
        setIsError(true);
        setShowModal(true);
      }
    } else {
      setModalMessage('Please fill in all required fields properly.');
      setIsError(true);
      setShowModal(true);
    }
  };

  const validateForm = () => {
    const requiredFields = [
      'email', 'username', 'password', 'confirmPassword',
      'firstName', 'lastName', 'phoneNumber', 'position'
    ];
    for (let field of requiredFields) {
      if (!formData[field]) {
        return false;
      }
    }
    return formData.password === formData.confirmPassword;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  return (
    <>
      <div className={signup.logoContainer}>
        <img src={escalogo} alt="Logo" className={signup.logo} />
      </div>

      <div className={signup.container}>
        <div className={signup.formContainer}>
          <div className={signup.iconContainer}>
            <img src={signupicon} alt="Signup Icon" className={signup.signupIcon} />
          </div>
          <h2 className={signup.title}>Sign up</h2>
          <p className={signup.subtitle}>Welcome back! Please enter your details.</p>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <div className={signup.formSection}>
                  <label className={signup.signupLabel} htmlFor="email">
                    Email Address<span className={signup.requiredSection}>*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={signup.inputPadding}
                    placeholder="Email Input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={signup.formSection}>
                  <label className={signup.signupLabel}  htmlFor="username">
                    Username<span className={signup.requiredSection}>*</span>
                  </label>
                  <input
                    id="username"
                    type="text"
                    className={signup.inputPadding}
                    placeholder="Text input"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={signup.formSection}>
                  <label className={signup.signupLabel}  htmlFor="password">
                    Password<span className={signup.requiredSection}>*</span>
                  </label>
                  <div className={signup.passwordContainer}>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className={signup.inputPadding}
                      placeholder="Password input"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <img
                      src={eyeicon}
                      alt="Toggle visibility"
                      className={signup.passwordToggle}
                      onClick={togglePasswordVisibility}
                    />
                  </div>
                </div>
                <div className={signup.formSection}>
                  <label className={signup.signupLabel}  htmlFor="confirmPassword">
                    Confirm Password<span className={signup.requiredSection}>*</span>
                  </label>
                  <div className={signup.passwordContainer}>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className={signup.inputPadding}
                      placeholder="Password input"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <img
                      src={eyeicon}
                      alt="Toggle visibility"
                      className={signup.passwordToggle}
                      onClick={toggleConfirmPasswordVisibility}
                    />
                  </div>
                </div>
                <button type="button" className={signup.confirmButton} onClick={nextStep}>
                  Continue
                </button>
              </>
            )}
            {step === 2 && (
              <>
                <div className={signup.formSection}>
                  <label  htmlFor="firstName" className={signup.signupLab}>
                    First Name<span className={signup.requiredSection}>*</span>
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className={signup.inputPadding}
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={signup.formSection}>
                  <label htmlFor="lastName" className={signup.signupLab}>
                    Last Name<span className={signup.requiredSection}>*</span>
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    className={signup.inputPadding}
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={signup.formSection}>
                  <label htmlFor="phoneNumber" className={signup.signupLab}>
                    Phone Number<span className={signup.requiredSection}>*</span>
                  </label>
                  <input
                    id="phoneNumber"
                    type="text"
                    className={signup.inputPadding}
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={signup.formSection}>
                  <label htmlFor="position" className={signup.signupLab}>
                    Position<span className={signup.requiredSection}>*</span>
                  </label>
                  <input
                    id="position"
                    type="text"
                    className={signup.inputPadding}
                    placeholder="Position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                  />
                </div>
              
                <div className={signup.buttonGroup}>
                  <button type="button" className={signup.backButton} onClick={previousStep}>
                    Back
                  </button>
                  <button type="submit" className={signup.confirmButton}>
                    Confirm
                  </button>
                </div>
              </>
            )}  
          </form>
        </div>
        <div className={signup.imageContainer}>
          <img src={engine} alt="Engine" className={signup.engineImage} />
        </div>
      </div>

      {isLoading && (
        <div className={signup.modalOverlay}>
          <div className={`${signup.modal} ${signup.loading}`}>
            <div className={signup.modalBody}>
              <img src={loadingIcon} alt="Loading" className={signup.loadingIcon} />
              <p>Loading...</p>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className={signup.modalOverlay}>
          <div className={`${signup.modal} ${isError ? signup.error : ''}`}>
            <div className={signup.modalHeader}>
              <div className={signup.modalIcon}>
                {!isError && <img src={tickicon} alt="tick icon" className={signup.tickIcon} />}
                {isError && <img src={closeIcon} alt="close icon" className={signup.closeIcon} />}
              </div>
              <button className={signup.closeButton} onClick={() => setShowModal(false)}>
                <img src={closeIcon} alt="close icon" />
              </button>
            </div>
            <div className={signup.modalBody}>
              <h2>{isError ? 'Error' : 'Check Your Email'}</h2>
              <p>{modalMessage}</p>
              <button className={signup.confirmButton} onClick={() => setShowModal(false)}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Signup;

