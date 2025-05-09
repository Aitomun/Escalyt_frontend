import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminHomeDashboard from '../AdminDashboard/AdminHomeDashboard';
import AdminTicketsDashboard from '../AdminDashboard/AdminTicketsDashboard';
import EmailConfirmationPage from '../AdminDashboard/EmailConfirmationPage';
import EmailConfirmationFailurePage from '../AdminDashboard/EmailConfirmationFailurePage';
import SignedOutPage from '../AdminDashboard/SignedOutPage';
import useAuth from './hooksauth/useAuth';


const App = () => {
  useAuth();

  return (
    <Routes>
      <Route path="/admindashboard" element={<AdminHomeDashboard />} />
      <Route path="/adminticketsdashboard" element={<AdminTicketsDashboard />} />
      <Route path="/email-confirmation-success" element={<EmailConfirmationPage />} />
      <Route path="/email-confirmation-failure" element={<EmailConfirmationFailurePage />} />
      <Route path="*" element={<SignedOutPage />} />
      
    </Routes>
  );
};

export default App;
