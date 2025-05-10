import React, { useState, useEffect, useRef } from 'react';
import { VscAccount } from "react-icons/vsc";
import { FaEllipsisV, FaBell } from 'react-icons/fa';
import Escalyt from '../../assets/images/logo.png';
import Bell from '../../assets/images/Bell.png'
import { useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_API_BASE_URL;


const Usernavbar = ( ) => {
  const [image, setImage] = useState();
  const [isOk, setResponse] = useState();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [initials, setInitials] = useState("");
  const notificationsRef = useRef(null);
  const profileOptionsRef = useRef(null);
  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem('token');
  navigate('/login');
};


   const token = localStorage.getItem('token'); // Replace with your method of retrieving the token
  if (!token) {
    throw new Error('No token found');
  }



  useEffect(() => {
    GetProfilePicture();
    fetchUserInitials();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (
        profileOptionsRef.current &&
        !profileOptionsRef.current.contains(event.target)
      ) {
        setShowProfileOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const GetProfilePicture = async () => {
    const headers = new Headers();
    
    const bearer = `Bearer ${token}`;

    headers.append("Authorization", bearer);
    headers.append("Content-type", 'image/jpeg');

    const options = {
      method: "GET",
      headers: headers,
    };

    //To fetch photos 
    await fetch(`${baseUrl}/v1.0/me/photo/$value`, options)
      .then(response => {
        response.blob().then((data) => {
          const reader = new FileReader();
          reader.readAsDataURL(data);
          reader.onload = () => {
            const base64data = reader.result;
            setImage(base64data);
            setResponse(response.ok);
          };
        });
      });
  };

  const fetchUserInitials = async () => {
    const headers = new Headers();
    //const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYW1pZGVsZWdiZXRvbnlvbkBnbWFpbC5jb20iLCJpYXQiOjE3MjI3OTIxMDUsImV4cCI6MTcyMjk2NDkwNX0.7NTHOK1F5k2XlMAmHDSMFkKRKChbFimafD8JG18mYUI';
    const bearer = `Bearer ${token}`;
    headers.append("Authorization", bearer);

    const options = {
      method: "GET",
      headers: headers,
    };

    //to fetch user details/ name
    await fetch(`${baseUrl}/api/auth/authenticated-user`, options)
      .then(response => response.json())
      .then(data => {
        const firstName = data.firstName || "";
        const lastName = data.lastName || "";
        const userInitials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
        setInitials(userInitials);
      });
  };

  return (
    <div>
      <header className="flex justify-between items-center py-4 px-4">
        <div className="flex items-center w-119 h-210 cursor-pointer md:flex translate-all px-2 py-2">
          <img src={Escalyt} alt='logo' className="w-full h-auto" />
        </div>
        <div className='flex space-x-3 gap-3'>
          <div className="flex items-center space-x-4">
            <a href='/user/dashboard'>
              <button className="text-black-600 font-semibold rounded-full md:flex translate-all px-2 py-2 text-md  duration-700 ease-in-out ">
                Dashboard
              </button>
            </a>
            <a href='/user/mytickets'>
              <button className="text-black-600 rounded-full md:flex translate-all px-2 py-2 text-md font-normal  duration-700 ease-in-out ">
                My Tickets
              </button>
            </a>
          </div>
          <div className='flex items-baseline gap-4 px-2 py-2'>
            <div className="relative">
              < img src= {Bell} alt="bell"
                onClick={() => setShowNotifications(!showNotifications)}
                className="cursor-pointer"
              />
              {showNotifications && (
                <div
                  ref={notificationsRef}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-50"
                >
                  <div className="p-2">No new notifications</div>
                </div>
              )}
            </div>
            <div className="relative">
              <div
                className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer px-2 py-2 text-md font-normal duration-700 ease-in-out hover:bg-slate-700 hover:text-white"
                onClick={() => setShowProfileOptions(!showProfileOptions)}
              >
                {initials}
              </div>
              {showProfileOptions && (
                <div
                  ref={profileOptionsRef}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-50"
                >
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Update Profile</button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Notifications</button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100">My Tickets</button>
                  <button  onClick={handleLogout}className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="relative grid justify-items-end px-4">
        <select className="px-1 py-1 bg-white border border-blue-500">
          <option>This year</option>
          <option>Last month</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </div>
  );
};

export default Usernavbar;
