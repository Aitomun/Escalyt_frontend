import React from 'react'
import { useState, useEffect } from 'react';
import { FaCheckSquare, FaSquare } from 'react-icons/fa';
import { formatDistanceToNow, parseISO, isValid } from 'date-fns';
import Checkbox from "../../assets/images/Checkbox.png"
import Counts from './Counts';
import Usernavbar from './Usernavbar';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
//const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYW1pZGVsZWdiZXRvbnlvbkBnbWFpbC5jb20iLCJpYXQiOjE3MjI3OTIxMDUsImV4cCI6MTcyMjk2NDkwNX0.7NTHOK1F5k2XlMAmHDSMFkKRKChbFimafD8JG18mYUI';

const formatDateDistance = (dateString) => {
  if (!dateString) return 'Invalid date';

  const date = parseISO(dateString);
  if (!isValid(date)) return 'Invalid date';

  return formatDistanceToNow(date, { addSuffix: true });
};



export default function Table() {
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [tickets, setTickets] = useState([]);

  
  //const token = import.meta.env.VITE_API_TOKEN;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
         const token = localStorage.getItem('token'); // Replace with your method of retrieving the token
        if (!token) {
          throw new Error('No token found');
        }

        const res = await fetch(`${baseUrl}/api/tickets/user/recent`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }

        });

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await res.json();
        console.log('Fetched data:', data);

        // Extract the content array from the response
        if (data && Array.isArray(data.content)) {
          setTickets(data.content);
        } else {
          console.error('Fetched data does not have a content array:', data);
        }

      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchTickets();

  }, []);



  // Function to handle clicking on tick box
  const handleTickClick = (id) => {
    setSelectedTickets((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((ticketId) => ticketId !== id)
        : [...prevSelected, id]
    );
  };

  return (


    <div className='flex h-full w-full flex-col gap-3 bg-slate-50 px-1% py-3  transition-all 
  //     duration-500 ease-in-out md:px-[5%] lg:px-[1%]' >
      <Usernavbar />
      <Counts />
      <div className="bg-white p-4 px-4% py-8 m-9 rounded-lg">
        <h2 className="text-xl font-normal mb-4">Recent Activities</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className=" bg-blue-100 text-left">
                <th className="p-2 text-sm items-center cursor-pointer w-8 h-0 " >
                  <img src={Checkbox} alt='checkbox' />
                </th>
                <th className="p-2 text-sm cursor-pointer text-gray-700" >
                  Ticket Number
                </th>
                <th className="p-2 text-sm cursor-pointer text-gray-700">
                  Title
                </th>
                <th className="p-2 cursor-pointer" onClick={() => handleHeaderClick('Priority')}>
                  <div className="inline-flex items-center  text-gray-700 text-sm">
                    Priority
                    <i className="material-icons text-gray-600 ml-2">swap_vert</i>
                  </div>
                </th>
                <th className="p-2 cursor-pointer" onClick={() => handleHeaderClick('Assignee')}>
                  <div className="inline-flex items-center text-sm text-gray-700">
                    Assignee
                    <i className="material-icons text-gray-600 ml-2">swap_vert</i>
                  </div>
                </th>
                <th className="p-2 cursor-pointer" onClick={() => handleHeaderClick('Status')}>
                  <div className="inline-flex items-center text-sm text-gray-700">
                    Status
                    <i className="material-icons text-gray-600 ml-2 ">swap_vert</i>
                  </div>
                </th>
                <th className="p-2 cursor-pointer" onClick={() => handleHeaderClick('Category')}>
                  <div className="inline-flex items-center text-sm text-gray-700">
                    Category
                    <i className="material-icons text-gray-600 ml-2 ">swap_vert</i>
                  </div>
                </th>
                <th className="p-2 text-sm  text-gray-700" >
                  Date Created
                </th>
                <th className="p-2 text-sm text-gray-700" >
                  Location
                </th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="text-left border-b">
                  <td className="p-1 text-sm cursor-pointer size-1" >
                    {/* {selectedTickets.includes(ticket.id) ? (
                    <FaCheckSquare className= "text-blue-500" size={5} />
                  ) : (
                    <FaSquare className="text-gray-400" size={5} />
                  )} */}
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={selectedTickets.includes(ticket.id)}
                      onChange={() => handleTickClick(ticket.id)}
                    />
                  </td>
                  <td className="p-2 text-gray-500 text-sm cursor-pointer" >
                    {ticket.id}
                  </td>
                  <td className="p-2 text-black text-sm cursor-pointer" >
                    {ticket.title}
                  </td>
                  <td className="p-2 text-sm flex items-center">
                    <span
                      className={`w-3 h-3 rounded-full mr-2 ${ticket.priority === 'HIGH' ? 'bg-red-500' :
                          ticket.priority === 'MEDIUM' ? 'bg-yellow-500' :
                            'bg-green-500'
                        }`}
                    ></span>
                    {ticket.priority}
                  </td>
                  <td className="p-2 text-gray-500 text-sm cursor-pointer" >
                    {ticket.assigneeId}
                  </td>
                  <td className="p-2 text-gray-500 text-sm cursor-pointer" >
                    {ticket.status}
                  </td>
                  <td className="p-2 text-gray-500 text-sm cursor-pointer" >
                    {ticket.categoryId}
                  </td>
                  <td className="p-2 text-gray-500 text-sm cursor-pointer">
                    {formatDateDistance(ticket.createdDate)}
                  </td>
                  <td className="p-2 text-gray-500 text-sm cursor-pointer" >
                    {ticket.location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  )
}
