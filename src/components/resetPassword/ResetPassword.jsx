import React, { useState } from "react";
import picture from "../../assets/image 357.png";
import featuredicon from "../../assets/Featuredicon.svg";
import showPasswordIcon from "../../assets/showPasswordIcon.svg";
import hidePasswordIcon from "../../assets/showPasswordIcon.svg";
import Axios from "axios";
import Notification from "./Notification";
import { useSearchParams } from "react-router-dom";
import Navbar from "../login/Navbar";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayModal, setDisplayModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();

  // Toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Submit reset password form
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      // Get the reset token from the URL query parameters
      const resetToken = searchParams.get("token");

// Replace this with the actual token you need to include in the header
      const url = "http://localhost:8080/api/auth/reset?token=" + resetToken;

      const response = await Axios.post(
        url,
        {
          token: "jargon",
          newPassword: password,
          confirmNewPassword: confirmPassword,
        }
      );

      //console.log(response);
      setDisplayModal(true);
      setErrorMessage(""); // Clear error message
    } catch (error) {
      console.log(`Error ===> ${error}`);
      setErrorMessage(
        "An error occurred while resetting your password. Please try again."
      );
    }
  };

  const closeModal = () => {
    setDisplayModal(false);
  };

  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex bg-white p-14 rounded-lg space-x-8">
        <div className="shadow-sm">
          <div className="flex items-center justify-center">
            <img src={featuredicon} alt="Featured icon" />
          </div>
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Reset Your Password
          </h2>
          <p className="text-center mb-6 text-gray-600">
            Enter your new password below to reset your account password.
          </p>
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <label
                className="block text-left mb-2 text-sm font-bold text-gray-700 required-label"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                required
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage("");
                }}
              />
              <img
                src={showPassword ? hidePasswordIcon : showPasswordIcon}
                alt="Toggle password visibility"
                className="absolute right-3 top-9 cursor-pointer"
                onClick={toggleShowPassword}
              />
            </div>
            <div className="mb-6 relative">
              <label
                className="block text-left mb-2 text-sm font-bold text-gray-700 required-label"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                required
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrorMessage("");
                }}
              />
              <img
                src={showConfirmPassword ? hidePasswordIcon : showPasswordIcon}
                alt="Toggle password visibility"
                className="absolute right-3 top-9 cursor-pointer"
                onClick={toggleShowConfirmPassword}
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              Reset Password
            </button>
          </form>
        </div>
        <div className="flex items-center justify-center">
          <img
            src={picture}
            alt="Design illustration"
            className="w-[740px] h-[740px]"
          />
        </div>
      </div>
      {displayModal && <Notification closeModal={closeModal} />}
    </div>
    </>
  );
}

export default ResetPassword;
