import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import escalaytlogo from '../../assets/escalayt-logo.svg';
import Line from '../../assets/Line 1.svg';
import Bell from '../../assets/Bell.svg';

function Icon() {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        // Fetch user details to get the name
        const fetchUserDetails = async () => {
            const baseUrl = import.meta.env.VITE_API_BASE_URL;
            const token = localStorage.getItem('authToken');
            const options = {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            try {
                const response = await fetch(`${baseUrl}/api/auth/authenticated-user`, options);
                const data = await response.json();
                const fullName = `${data.firstName || ""} ${data.lastName || ""}`;
                setUserName(fullName);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []);

    // Generate initials from the user's name
    const getInitials = (name) => {
        const initials = name.split(' ').map(n => n[0]).join('');
        return initials.toUpperCase();
    };

    return (
<nav className="mt-0 p-0">
            <div className="flex items-center justify-between">
                <div className="flex items-center ml-10">
                    <img src={escalaytlogo} alt="Logo" className="h-8 w-8" />
                    <span className='font-bold ml-2 mt-1 text-blue-500'>Escalayt</span>
                </div>
                <div className="flex items-center space-x-8">
                    <div className="flex items-center space-x-2">
                        <Link to="/dashboard" className="text-gray-700">Dashboard</Link>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Link to="/tickets" className="text-gray-700">My Tickets</Link>
                    </div>
                    <div className="flex items-center space-x-2">
                        <img src={Line} alt="Icon3" className="h-6 w-6" />
                        <Link to="/your-target-url">
                            <img src={Bell} alt="Bell Icon" className="h-6 w-6" />
                        </Link>
                    </div>
                    <div className="flex items-center ml-4">
                        <Link to="/user-profile">
                            <div className="h-8 w-8 bg-blue-500 text-white flex items-center justify-center rounded-full">
                                {getInitials(userName)}
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Icon;
