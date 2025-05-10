import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DepartmentForm from './components/Department/DepartmentForm';
import ResetPassword from './components/resetPassword/ResetPassword';
import CategoryForm from './components/create_category/categoryForm';
import Table from './components/user-dashboard/Table'
import Mytickets from './components/user-dashboard/Mytickets'
import ForgotPassword from './components/forgot_password/ForgotPassword';
import RateTicket from './components/rate_ticket/RateTicket';

import Login from './components/login/Login';
import CreateTicket from './components/createTicket/TicketForm'

import Signup from './components/signup/Signup';
import AddEmployee from './components/AddUser/AddEmployee';
import AdminHomeDashboard from './components/AdminDashboard/AdminHomeDashboard';
import AdminTicketsDashboard from './components/AdminDashboard/AdminTicketsDashboard'; 
import EmailConfirmationPage from './components/AdminDashboard/EmailConfirmationPage'; 
import EmailConfirmationFailurePage from './components/AdminDashboard/EmailConfirmationFailurePage';
import SignedOutPage from './components/AdminDashboard/SignedOutPage'; 
import withAuth from './withAuth';
import AdminProfileEdit from './components/EditUserDetails/AdminProfileEdit';
import TicketUserPage from './pages/TicketUserPage';
import TicketAdminPage from './pages/TicketAdminPage';




function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/create-department' element={<DepartmentForm/>} />
          <Route path='/reset-password'element={ <ResetPassword/>} />
          <Route path='/create-category' element={<CategoryForm/>}/>
          <Route path="/user/dashboard" element={<Table />} />
          <Route path="/user/mytickets" element={< div className='m-'><Mytickets /></div>} />
          <Route  path='/forgot_password' element= { <ForgotPassword />}/>
          <Route path='/rate-ticket' element= { <RateTicket />} />

          <Route path='/login' element= {<Login/>}></Route>
          <Route path='/create-ticket' element={<CreateTicket/>}/>

          <Route path='/signup' element={<Signup />} />
          <Route path='/add-user' element={<AddEmployee />} />
          <Route path="/admin/addEmployee" element={<AddEmployee />} />


          <Route path='/admin/dashboard' element={<AdminHomeDashboard />} />
          <Route path="/adminticketsdashboard" element={<AdminTicketsDashboard />} />
<Route path="/email-confirmation-success" element={<EmailConfirmationPage />} />
          <Route path="/email-confirmation-failure" element={<EmailConfirmationFailurePage />} />
          <Route path="/signed-out" element={<SignedOutPage />} />
          <Route path="/signed-out" element={withAuth(SignedOutPage)} />
          <Route path='/edit-details' element={ <AdminProfileEdit />}/>
          <Route path='/ticket-user/:employeeId/:ticketId' element={<TicketUserPage />} />
          <Route path='/ticket-admin/:employeeId/:ticketId' element={<TicketAdminPage />} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
