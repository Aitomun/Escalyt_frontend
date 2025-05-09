import React, { useState } from 'react';
import escalogo from '../../assets/images/esca-logo.svg';
import forgotIcon from '../../assets/images/login.svg';
import settingsImage from '../../assets/images/engine.svg';
import tickIcon from '../../assets/images/tick-icon.svg';
import closeIcon from '../../assets/images/close-icon.svg';
import style from './ForgotPassword.module.css';
import axios from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/forgot-password', { email });
      if (response.status === 200) {
        setShowModal(true);
      }
    } catch (error) {
      console.error('There was an error sending the reset link:', error);
    }
  };

  return (
    <>
      <nav className={style['nav-bar']}>
        <img src={escalogo} alt="Escalayt logo" /><span className={style['p_color']}>Escalayt</span>
      </nav>

      <div className={style['forgot-password-container']}>
        <div className={style['forgot-password-card']}>
          <div className={style['forgot-password-header']}>
            <div className={style['forgot-password-icon']}>
              <img src={forgotIcon} alt="Forgot icon" />
            </div>
            <h2>Forgot Password</h2>
            <p>Enter your email address below and we'll send you a link to reset your password.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <label className={style.forgot_label} htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Email input"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className={`${style['submit-button']} bg_p_color`}>Send Reset Link</button>
          </form>
        </div>

        <div className={style['password-image']}>
          <img src={settingsImage} alt="Settings" className={style['settings-image']} />
        </div>
      </div>

      {showModal && (
        <div className={style['modal-overlay']}>
          <div className={style.modal}>
            <div className={style['modal-header']}>
              <div className={style['modal-icon']}>
                <img src={tickIcon} alt="Tick icon" />
              </div>
              <button className={style['close-button']} onClick={() => setShowModal(false)}>
                <img src={closeIcon} alt="Close icon" />
              </button>
            </div>
            <div className={style['modal-body']}>
              <h2>Check Your Email</h2>
              <p>We have sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.</p>
              <button className={style['confirm-button']} onClick={() => setShowModal(false)}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
