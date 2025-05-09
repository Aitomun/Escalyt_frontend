import React from 'react';
import { useParams } from 'react-router-dom';

import SectionView from '../components/adminDashboardTicket/SectionView';

const TicketEmployeePage = () => {
    const { employeeId, ticketId } = useParams();

    // Use import.meta.env to access environment variables
    const token = import.meta.env.VITE_API_TOKEN;

    return (
        <div className="container mx-auto mt-8">
            <SectionView ticketId={ticketId} employeeId={employeeId} token={token} />
        </div>
    );
};

export default TicketEmployeePage;
