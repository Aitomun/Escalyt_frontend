// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import style from './Login.module.css';
import logo from '../../assets/logo.svg';
import eyeicon from '../../assets/eyeicon.svg';
import engine from '../../assets/engine.svg';
import loginIcon from '../../assets/loginIcon.svg';
import Navbar from './Navbar';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';



const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    

    const handleLogin = async () => {
        setLoading(true); // Show spinner
        try {
            const response = await axios.post(`${baseUrl}/api/auth/login`, formData);
            console.log("Login Response:", response);

            if (response.data.loginInfo && response.data.loginInfo.token) {
                const { token } = response.data.loginInfo;

                console.log("Token:", token);

                // Save the token to local storage
                localStorage.setItem('token', token);

                // Get user details using the token
                const userResponse = await axios.get(`${baseUrl}/api/auth/authenticated-user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("User Response:", userResponse);
                const role = userResponse.data.role;
                console.log(role);

                // Redirect the user
                if (role === 'ADMIN') {
                    navigate('/admin/dashboard');
                } else if (role === 'USER') {
                    navigate('/user/dashboard');
                } else {
                    setErrorMessage('Unknown role');
                }
            } else {
                setErrorMessage('Token not found');
            }
        } catch (error) {
            console.error("Login Error:", error);
            setErrorMessage('Invalid credentials');
        } finally {
            setLoading(false); // Hide spinner
        }
    };

    return (
        <>
            <Navbar />
            {loading && <Spinner />} {/* Render spinner while loading */}
            <div className={style.login_container}>
                <div className={style.login_box}>
                    <img src={loginIcon} alt="Login Icon" className={style.login_icon} />
                    <h2>Log in to your account</h2>
                    <p>Welcome back! Please enter your details.</p>
                    <div className={style.form_group}>
                        <label htmlFor="email">Email<span className={style.required}>*</span></label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={style.form_group}>
                        <label htmlFor="password">Password<span className={style.required}>*</span></label>
                        <div className={style.password_container}>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder=" Enter Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <img
                                src={eyeicon}
                                alt="Toggle Password Visibility"
                                className={style.password_toggle_icon}
                                onClick={togglePasswordVisibility}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                    <a href="/forgot_password" className={style.forgot_password}>Forgot password?</a>
                    {errorMessage && <p className={style.error_message}>{errorMessage}</p>}
                    <button className={style.login_button} onClick={handleLogin}>Confirm</button>
                </div>
                <div className={style.image_container}>
                    <img src={engine} alt="Decorative" />
                </div>
            </div>
        </>
    );
};

export default Login;
