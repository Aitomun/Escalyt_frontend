import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TicketResolveSection = ({ ticketId }) => {
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = import.meta.env.VITE_API_TOKEN;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/tickets/details/${ticketId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTicket(response.data);
        setResolved(response.data.resolved); // Set the resolved state based on ticket data
      } catch (err) {
        setError('Error fetching ticket details: ' + err.message);
      }
    };

    fetchTicketDetails();
  }, [ticketId, apiBaseUrl, token]);

  const handleResolveTicket = async () => {
    if (resolved) {
      setError('Ticket is already resolved.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await resolveTicket(ticketId, token);
      // After resolving, fetch the updated ticket details
      await fetchTicketDetails();
      setResolved(true);
    } catch (err) {
      setError('Failed to resolve ticket: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const resolveTicket = async (ticketId, token) => {
    try {
      await axios.put(`${apiBaseUrl}/api/tickets/resolve/${ticketId}`, {}, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      throw new Error('Failed to resolve ticket: ' + error.message);
    }
  };

  // Fetch updated ticket details
  const fetchTicketDetails = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/api/tickets/details/${ticketId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTicket(response.data);
      setResolved(response.data.resolved); // Update the resolved state
    } catch (err) {
      setError('Error fetching ticket details: ' + err.message);
    }
  };

  if (error) return <div className="text-red-600">{error}</div>;
  if (!ticket) return <p>Loading ticket details...</p>;

  return (
    <div className="flex items-center justify-between p-4 rounded-lg mb-4 mt-6"> {/* Added mt-6 to move the section down */}
      {/* Back Arrow and Ticket Title */}
      <div className="flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 hover:text-blue-500 transition duration-200 ease-in-out py-1 leading-tight"
          >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h2 className="ml-4 text-lg font-normal text-gray-700">{ticket.title}</h2>
      </div>

      {/* Resolve Button */}
      {!resolved && (
        <button
          onClick={handleResolveTicket}
          disabled={loading}
          className={`flex items-center justify-center w-24 h-10 bg-blue-500 text-white font-normal rounded shadow-md hover:bg-blue-500 transition duration-200 ease-in-out ${loading && 'cursor-not-allowed'}`}
        >
          {loading ? (
            <svg
              className="animate-spin h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          ) : (
            "RESOLVE"
          )}
        </button>
      )}

      {/* Error Message for Already Resolved Ticket */}
      {resolved && (
        <div className="text-red-600 mt-2">Ticket is already resolved.</div>
      )}
    </div>
  );
};

export default TicketResolveSection;
