import React from 'react';
import xButton from '../../assets/close.svg';
import CheckButton from '../../assets/Featured-check.svg';

function TicketNotification({ showModal, handleCloseModal }) {
 // if (!showModal) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg p-6 w-96 relative'>
        <div className='flex justify-between items-center mb-4'>
          <img src={CheckButton} alt="The Check Button" className='h-8 w-8' />
          <button onClick={handleCloseModal}>
            <img src={xButton} alt="The Close Button" className='h-8 w-8' />
          </button>
        </div>
        <h2 className='text-lg font-medium mb-4 text-left text-black'>New Ticket Created</h2>
        <p className='text-gray-700 text-left mb-4'>A new ticket has been created. Please review the details and assign it to the appropriate team for resolution.</p>
        <button className='w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600' onClick={handleCloseModal}>Confirm</button>
      </div>
    </div>
  );
}

export default TicketNotification;
