import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DetailsSection = ({ ticketId, employeeId, resolved }) => {
    const [userDetails, setUserDetails] = useState(null);
    const [ticketDetails, setTicketDetails] = useState(null);
    const [error, setError] = useState(null);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const token = import.meta.env.VITE_API_TOKEN;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTicketDetails = async () => {
            if (!ticketId) return;

            try {
                const response = await axios.get(
                    `${apiBaseUrl}/api/tickets/details/${ticketId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setTicketDetails(response.data);
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    navigate('/login');
                }
                setError('Error fetching ticket details: ' + err.message);
            }
        };

        fetchTicketDetails();
    }, [ticketId, apiBaseUrl, token, resolved]);

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            if (!employeeId) return;

            try {
                const response = await axios.get(
                    `${apiBaseUrl}/api/tickets/employee/${employeeId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setUserDetails(response.data);
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    navigate('/login');
                } else {
                    setError('Error fetching employee details: ' + err.message);
                }
            }
        };

        fetchEmployeeDetails();
    }, [employeeId, apiBaseUrl, token]);

    if (error) return <div>{error}</div>;

    return (
        <section className="flex justify-between p-6 mt-4 ">
            {/* User Details */}
            <div className="w-1/3 p-4 rounded-lg">
                {userDetails ? (
                    <>
                        <h2 className="text-xl font-light mb-2">User Details</h2>
                        <div className="text-lg font-extralight">
                            <div>Full Name: <span className="font-normal">{userDetails.fullName}</span></div>
                            <div>Position: <span className="font-normal">{userDetails.position}</span></div>
                            <div>Email: <span className="font-normal">{userDetails.email}</span></div>
                            <div>Department: <span className="font-normal">{userDetails.department}</span></div>
                            <div>Phone Number: <span className="font-normal">{userDetails.phoneNumber}</span></div>
                        </div>
                    </>
                ) : (
                    <p>Loading user details...</p>
                )}
            </div>

            {/* Ticket Details */}
            <div className="w-1/3 p-4 rounded-lg">
                {ticketDetails ? (
                    <>
                        <h2 className="text-xl font-light mb-2">Ticket Details</h2>
                        <div className="text-lg font-extralight">
                            <div>Title: <span className="font-normal ">{ticketDetails.title}</span></div>
                            <div>Priority: <span className="font-normal">{ticketDetails.priority}</span></div>
                            <div>Status: <span className="font-normal">{ticketDetails.status}</span></div>
                            <div>Location: <span className="font-normal">{ticketDetails.location}</span></div>
                            <div>Description: <span className="font-normal">{ticketDetails.description}</span></div>
                            <div>Category: <span className="font-normal">{ticketDetails.categoryId}</span></div>
                        </div>
                    </>
                ) : (
                    <p>Loading ticket details...</p>
                )}
            </div>
        </section>
    );
};

export default DetailsSection;

