import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RatingModal from '../rate_ticket/RateTicket'; // Import your modal component

const TicketResolveSection = ({ ticketId }) => {
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/tickets/details/${ticketId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTicket(response.data);
      } catch (err) {
        setError('Error fetching ticket details: ' + err.message);
      }
    };

    fetchTicketDetails();
  }, [ticketId, apiBaseUrl, token]);

  if (error) return <div className="text-red-600">{error}</div>;
  if (!ticket) return <p>Loading ticket details...</p>;

  return (
    <div className="flex items-center justify-between mt-5 p-4 rounded-lg  mb-4">
      {/* Back Arrow and Ticket Title */}
      <div className="flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 hover:text-blue-800 transition duration-200 ease-in-out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h2 className="ml-4 text-lg font-normal text-gray-700">{ticket.title}</h2>
      </div>

      {/* Rate Ticket Resolution Button */}
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center justify-center w-80 h-12 bg-blue-500 text-white font-normal rounded shadow-md hover:bg-blue-500 transition duration-200 ease-in-out"
      >
        Rate Ticket Resolution
      </button>

      {/* Rating Modal */}
      {showModal && (
        <RatingModal onClose={() => setShowModal(false)} ticketId={ticketId} />  // Pass ticketId here
      )}
    </div>
  );
};

export default TicketResolveSection;
