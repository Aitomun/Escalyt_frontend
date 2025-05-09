import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DetailsSection from './TicketDetailsUser'; // Update import path if necessary
import CommentSection from './CommentUser'; // Update import path if necessary
import HeaderUser from './HeaderUser';
import RateResolution from './RateResolution';
import AttachmentUser from './AttachmentUser';

const SectionViewUser = () => {
    const navigate = useNavigate();
    const { ticketId } = useParams(); // Extract ticketId from route params
    const token = import.meta.env.VITE_API_TOKEN; // Assuming token is stored in env variables or can be retrieved

    useEffect(() => {
        // Function to check token validity by making a dummy API request
        const checkTokenValidity = async () => {
            try {
                // Making a simple request to verify the token
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

        if (ticketId) {
            checkTokenValidity();
        }
    }, [ticketId, token, navigate]);

    return (
        <div className="section-view">
            <HeaderUser />
            <RateResolution ticketId={ticketId} token={token} />

            {ticketId && (
                <>
                    <DetailsSection />
                    <AttachmentUser />
                    <CommentSection ticketId={ticketId} token={token} />
                </>
            )}
        </div>
    );
};

export default SectionViewUser;
