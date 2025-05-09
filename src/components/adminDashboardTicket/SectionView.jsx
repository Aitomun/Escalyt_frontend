import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DetailsSection from './TicketDetailsAdmin'; // Update the import path based on your file structure
import TicketResolveSection from './MarkedAsResolved'; // Import the TicketResolveSection component
import CommentSection from './CommentAdmin'; // Import the CommentSection component
import Header from './Header';
import Attachment from './Attachment';
const SectionView = ({ ticketId, employeeId, token }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Function to check token validity by making a dummy API request
        const checkTokenValidity = async () => {
            try {
                // Making a simple request to verify the token (you can replace this with a suitable endpoint)
                await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/tickets/details/${ticketId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    // If the token is invalid, redirect to login
                    navigate('/login');
                }
            }
        };

        checkTokenValidity();
    }, [ticketId, token, navigate]);

    return (
        <div className="section-view">
            <Header/>
            <TicketResolveSection ticketId={ticketId} employeeId={employeeId} token={token} />

            <DetailsSection ticketId={ticketId} employeeId={employeeId} token={token} />
            <Attachment/>

            <CommentSection ticketId={ticketId} employeeId={employeeId} token={token} />
        </div>
    );
};

export default SectionView;
