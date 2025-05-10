import React, { useState, useEffect } from 'react';
import { FaCheckSquare, FaSquare, FaEllipsisV } from 'react-icons/fa';
import { formatDistanceToNow, parseISO, isValid } from 'date-fns';
import Checkbox from '../../assets/images/Checkbox.png'
// escalyt-main-service/src/assets/images/Checkbox.png
import Usernavbar from './Usernavbar'
import { useNavigate } from 'react-router-dom';
import TicketForm from '../createTicket/TicketForm';


const formatDateDistance = (dateString) => {
  if (!dateString) return 'Invalid date';

  const date = parseISO(dateString);
  if (!isValid(date)) return 'Invalid date';

  return formatDistanceToNow(date, { addSuffix: true });
};


const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Mytickets = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter state
  const [priorityFilter, setPriorityFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [assigneeFilter, setAssigneeFilter] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
         const token = localStorage.getItem('token'); // Replace with your method of retrieving the token
      if (!token) {
        throw new Error('No token found');
      }
        const response = await fetch(`${baseUrl}/api/tickets/list-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  useEffect(() => {
    const fetchFilteredTickets = async () => {
      try {
         const token = localStorage.getItem('token'); // Replace with your method of retrieving the token
      if (!token) {
        throw new Error('No token found');
      }

        const filters = {
          priority: priorityFilter,
          status: statusFilter,
          category: categoryFilter,
          assignee: assigneeFilter,
        };

        const response = await fetch(`${baseUrl}/api/tickets/filter`, {
            
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(filters),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching filtered tickets:', error);
      }
    };

    fetchFilteredTickets();
  }, [priorityFilter, statusFilter, categoryFilter, assigneeFilter]);

  const handleHeaderClick = (header) => {
    const order = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(header);
    setSortOrder(order);
    sortTickets(header, order);
  };

  const sortTickets = (field, order) => {
    const sortedTickets = [...tickets].sort((a, b) => {
      if (order === 'asc') {
        return a[field] > b[field] ? 1 : -1;
      }
      return a[field] < b[field] ? 1 : -1;
    });
    setTickets(sortedTickets);
  };

  const handleTickClick = (id) => {
    setSelectedTickets((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((ticketId) => ticketId !== id)
        : [...prevSelected, id]
    );
  };

  const openModal = (ticket) => {
    setSelectedTicket(ticket);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTicket(null);
    setModalOpen(false);
  };

  const handleFilterChange = (filterType, value) => {
    const updateFilter = (filterArray, value) => {
      return filterArray.includes(value)
        ? filterArray.filter((item) => item !== value)
        : [...filterArray, value];
    };
// To filter tickets
    switch (filterType) {
      case 'priority':
        setPriorityFilter(updateFilter(priorityFilter, value));
        break;
      case 'status':
        setStatusFilter(updateFilter(statusFilter, value));
        break;
      case 'category':
        setCategoryFilter(updateFilter(categoryFilter, value));
        break;
      case 'assignee':
        setAssigneeFilter(updateFilter(assigneeFilter, value));
        break;
      default:
        break;
    }
  };

  //To delete tickets
  const handleDelete = async (id) => {
    try {
         const token = localStorage.getItem('token'); // Replace with your method of retrieving the token
      if (!token) {
        throw new Error('No token found');
      }
      const response = await fetch(`${baseUrl}/api/tickets/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setTickets(tickets.filter((ticket) => ticket !== id));
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

//Handle Resolved tickets
const handleResolve = async (id) => {
  
    try {
         const token = localStorage.getItem('token'); // Replace with your method of retrieving the token
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.post(`${baseUrl}/api/tickets/resolve/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('Ticket resolved successfully:', response.data);
      toast.success('Ticket resolved successfully');
      // Handle the success scenario, e.g., updating the UI or notifying the user
    } catch (error) {
      console.error('Error resolving ticket:', error.response ? error.response.data : error.message);
      toast.error('Error resolving ticket');
      // Handle the error scenario, e.g., showing an error message to the user
    }
  };

  //Handle the three dots 
const handleTableDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  return (
    <main  className='flex h-full w-full flex-col gap-3 bg-slate-50 px-1% py-3% transition-all 
    duration-500 ease-in-out md:px-[5%] lg:px-[1%]'>
        <Usernavbar/>
   
    <div className="container mx-auto ">
      <div className="flex gap-2">
        <div className="w-1/6 p-4 bg-gray-300 rounded-lg shadow-md">
          <h2 className="text-xl font-normal mb-3">Filters</h2>
          <div className="mb-4">
            <label className=" text-gray-700 font-normal mb-2">Sort by</label>
            <select className="w-full p-2 border border-blue-300 rounded" onChange={(e) => handleHeaderClick(e.target.value)}>
              <option value="">Select</option>
              <option value="priority">Priority</option>
              <option value="status">Status</option>
              <option value="status">Category</option>
              <option value="assignee">Assignee</option>
            </select>
          </div>
          <div className="mb-4">
            <label className=" text-gray-700 font-light mb-2">Priority</label>
            <div className="flex flex-col p-2 text-black-500 text-sm cursor-pointer" onChange={(e) => handleHeaderClick(e.target.value)}>
              {['HIGH', 'MEDIUM', 'LOW'].map((priority) => (
                <label key={priority} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={priorityFilter.includes(priority)}
                    onChange={() => handleFilterChange('priority', priority)}
                  />
                  <span className="ml-2">{priority}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className=" text-gray-700 font-light mb-2">Status</label>
            <div className="flex flex-col p-2 text-black-500 text-sm cursor-pointer" onChange={(e) => handleHeaderClick(e.target.value)}>
              {['OPEN', 'In-Progress', 'RESOLVED'].map((status) => (
                <label key={status} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={statusFilter.includes(status)}
                    onChange={() => handleFilterChange('status', status)}
                  />
                  <span className="ml-2">{status}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className=" text-gray-700 font-light mb-2">Category</label>
            <div className="flex flex-col p-2 text-black-500 text-sm cursor-pointer" onChange={(e) => handleHeaderClick(e.target.value)}>
              {['Plumbing', 'Electrical', 'HVAC'].map((category) => (
                <label key={category} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={categoryFilter.includes(category)}
                    onChange={() => handleFilterChange('category', category)}
                  />
                  <span className="ml-2">{category}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className=" text-gray-700 font-light mb-2">Assignee</label>
            <div className="flex flex-col p-2 text-black-500 text-sm cursor-pointer" onChange={(e) => handleHeaderClick(e.target.value)}>
              {['Abdul Ahmed', 'Tayo Ade', 'Chizzy Jack'].map((assignee) => (
                <label key={assignee} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={assigneeFilter.includes(assignee)}
                    onChange={() => handleFilterChange('assignee', assignee)}
                  />
                  <span className="ml-2">{assignee}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="w-5/6 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-normal mb-4">Tickets ({tickets.length})</h2>
          <a  useNavigate={<TicketForm/>}>
            <button className="bg-blue-500 text-white py-2 px-4 rounded mb-4 duration-100 ease-in-out hover:bg-slate-700 hover:text-white">
              Create Ticket
            </button>
          </a>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-blue-100 text-left">
                  <th className="p-4 text-sm text-gray-700"><img src={Checkbox} alt='checkbox' /></th>
                  <th className="p-4 text-sm  text-gray-700">Number</th>
                  <th className="p-4 text-sm text-gray-700">Title</th>
                  <th className="p-4 text-sm cursor-pointer" onClick={() => handleHeaderClick('priority')}>
                  <div className="inline-flex items-center text-sm text-gray-700">
                  Priority
                  <i className="material-icons text-gray-600 ml-2">swap_vert</i>
                </div>
                  </th>
                  <th className="p-4 text-sm cursor-pointer" onClick={() => handleHeaderClick('status')}>
                  <div className="inline-flex items-center text-sm text-gray-700">
                  Status
                  <i className="material-icons text-gray-600 ml-2">swap_vert</i>
                </div>
                  </th>
                  <th className="p-4 text-sm cursor-pointer" onClick={() => handleHeaderClick('assigneeId')}>
                  <div className="inline-flex items-center text-sm text-gray-700">
                  Assignee
                  <i className="material-icons text-gray-600 ml-2">swap_vert</i>
                </div>
                  </th>
                  <th className="p-4 text-sm cursor-pointer" onClick={() => handleHeaderClick('categoryId')}>
                  <div className="inline-flex items-center text-sm text-gray-700">
                  Category
                  <i className="material-icons text-gray-600 ml-2">swap_vert</i>
                </div>
                  </th>
                  <th className="p-4 text-sm text-gray-700">Date Created</th>
                  <th className="p-4 text-sm text-gray-700">Location</th>
                  <th className="p-4 text-sm"></th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="text-left border-b">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={selectedTickets.includes(ticket.id)}
                        onChange={() => handleTickClick(ticket.id)}
                      />
                    </td>
                    <td className="p-2 text-gray-500 text-sm cursor-pointer">{ticket.id}</td>
                    <td className="p-2 text-black text-sm cursor-pointer">{ticket.title}</td>
                    <td className="p-2 text-sm flex items-center">
                    <span
                    className={`w-3 h-3 rounded-full mr-2 ${
                      ticket.priority === 'HIGH' ? 'bg-red-500' :
                      ticket.priority === 'MEDIUM' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                  ></span>{ticket.priority}</td>
                    <td className="p-2 text-gray-500 text-sm ">{ticket.status}</td>
                    <td className="p-2 text-gray-500 text-sm ">{ticket.assignee}</td>
                    <td className="p-2 text-gray-500 text-sm ">{ticket.category}</td>
                    <td className="p-2 text-gray-500 text-sm ">{formatDateDistance(ticket.createdDate)}</td>
                    <td className="p-2 text-gray-500 text-sm ">{ticket.location}</td>
                    {/* <td className="p-2 text-gray-500 text-sm cursor-pointer">
                    <FaEllipsisV className="cursor-pointer" />
                    <div className="dropdown-content absolute hidden text-gray-700 pt-0">
                      <a
                        href="/view"
                        className="block px-4 py-2 text-sm"
                        onClick={() => openModal(ticket)}
                      >
                        View
                      </a>
                      <a
                        href="/delete"
                        className="block px-4 py-2 text-sm"
                        onClick={() => handleDelete(ticket.id)}
                      >
                        Delete
                      </a>
                    </div>
                  </td> */}


                <td className="p-2 text-gray-500 text-sm cursor-pointer">
                <button className='' onClick={() => handleTableDropdown(ticket.id)(!openDropdownId)}>⋮</button>
                {openDropdownId === ticket.id && (
                  <div className="absolute mt-3 w-30 bg-white rounded-md shadow-lg py-1 z-20">
                 <a href='/user/mytickets/view' ><button className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left" onClick={() => openModal(ticket)}>
                    View Details
                  </button></a>
                  <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left" onClick={() => handleResolve(id)}>
                    Resolve
                  </button>
                  <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left" onClick={() => handleDelete(id)}>
                    Delete
                  </button>
                </div>
                )}
              </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* {modalOpen && selectedTicket && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-semibold mb-4">{selectedTicket.title}</h2>
            <p><strong>Number:</strong> {selectedTicket.id}</p>
            <p><strong>Priority:</strong> {selectedTicket.priority}</p>
            <p><strong>Status:</strong> {selectedTicket.status}</p>
            <p><strong>Assignee:</strong> {selectedTicket.assigneeId}</p>
            <p><strong>Updated At:</strong> {formatDate(selectedTicket.updatedAt)}</p>
            <p><strong>Created At:</strong> {formatDate(selectedTicket.createdAt)}</p>

            <div className="mt-4">
              <button onClick={closeModal} className="bg-blue-500 text-white py-2 px-4 rounded">
                Close
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
    </main>
  );
};

export default Mytickets;

