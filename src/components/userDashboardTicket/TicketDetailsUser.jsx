import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DetailsSection = () => {
    const [assigneeDetails, setAssigneeDetails] = useState(null);
    const [ticketDetails, setTicketDetails] = useState(null);
    const [error, setError] = useState(null);
    const { ticketId } = useParams(); // Extract ticketId from route params
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const token = import.meta.env.VITE_API_TOKEN;
    const navigate = useNavigate();

    // Fetch ticket details
    useEffect(() => {
        const fetchTicketDetails = async () => {
            if (!ticketId) return;

            try {
                const response = await axios.get(
                    `${apiBaseUrl}/api/tickets/details/${ticketId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setTicketDetails(response.data);

                // Fetch assignee details if assignee is present
                fetchAssigneeDetails(ticketId); 
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    navigate('/login');
                } else {
                    setError('Error fetching ticket details: ' + (err.response ? err.response.data.message : err.message));
                }
            }
        };

        fetchTicketDetails();
    }, [ticketId, apiBaseUrl, token, navigate]);

    // Fetch assignee details
    const fetchAssigneeDetails = async (ticketId) => {
        try {
            const response = await axios.get(
                `${apiBaseUrl}/api/tickets/assign/${ticketId}`, // Endpoint with path parameter
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setAssigneeDetails(response.data);
        } catch (err) {
            console.log('Error fetching assignee details:', err);
            if (err.response && err.response.status === 401) {
                navigate('/login');
            } else {
                setError('Error fetching assignee details: ' + (err.response ? err.response.data.message : err.message));
            }
        }
    };

    if (error) return <div className="text-red-600">{error}</div>;

    return (
        <section className="flex justify-between p-6 mt-4 ">
            {/* Ticket Details */}
            <div className="w-1/2 p-4 bg-white rounded-lg border-r border-gray-300">
                {ticketDetails ? (
                    <>
                        <h1 className="text-lg font-normal mb-2">Ticket Details</h1>
                        <div className="text-lg font-extralight">
                            <div>Title: <span className="font-normal">{ticketDetails.title}</span></div>
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

            {/* Assignee Details */}
            <div className="w-1/2 p-4 bg-white rounded-lg">
                {assigneeDetails ? (
                    <>
                        <h2 className="text-lg font-normal mb-2">Assignee Details</h2>
                        <div className="text-lg font-extralight">
                            <div>Name: <span className="font-normal">{assigneeDetails.name}</span></div>
                            <div>Email: <span className="font-normal">{assigneeDetails.email}</span></div>
                            <div>Position: <span className="font-normal">{assigneeDetails.position}</span></div>
                            <div>Phone Number: <span className="font-normal">{assigneeDetails.phoneNumber}</span></div>
                        </div>
                    </>
                ) : (
                    <p>Loading assignee details...</p>
                )}
            </div>
        </section>
    );
};

export default DetailsSection;
