import React from "react";
import checkicon from "../../assets/check-circle.svg";
import xicon from "../../assets/x-close.svg";
import { useNavigate } from "react-router-dom";

function Notification({ closeModal }) {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/login");
  };

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-200 bg-opacity-75">
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <div className="flex justify-between items-center mb-6">
            <div className="bg-blue-100 p-2 rounded-full">
              <img src={checkicon} alt="tick icon" className="w-6 h-6" />
            </div>
            <button className="bg-transparent border-none cursor-pointer" onClick={handleRedirect}>
              <img src={xicon} alt="close icon" className="w-6 h-6" />
            </button>
          </div>
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-4">
              Password Reset Successfully
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Your password has been reset successfully.You can now log in with
              your new password.{" "}
            </p>
            <button className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300 ease-in-out" onClick={handleRedirect}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
