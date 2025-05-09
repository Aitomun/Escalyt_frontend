import React, { useEffect, useState } from 'react'
import Inprogress from '../../assets/images/settings.png'
import Open from '../../assets/images/Openmsg.png'
import Total from '../../assets/images/files.png'
import Resolved from '../../assets/images/Tick.png'

//const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYW1pZGVsZWdiZXRvbnlvbkBnbWFpbC5jb20iLCJpYXQiOjE3MjI3OTIxMDUsImV4cCI6MTcyMjk2NDkwNX0.7NTHOK1F5k2XlMAmHDSMFkKRKChbFimafD8JG18mYUI';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Counts = () => {
  const [counts, setCounts] = useState([{open: 0, inReview: 0, resolved: 0}]);
  

  useEffect(() => {
  const fetchCounts = async () => {
    try {
      const token = localStorage.getItem('token'); // Replace with your method of retrieving the token
      if (!token) {
        throw new Error('No token found');
      }

      const res = await fetch(`${baseUrl}/api/tickets/count`, {
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
      console.log(data);
      setCounts(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  fetchCounts();
}, []);


  return (
    <div >

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 px-12 pt-16">
        <div className="bg-blue-50 p-4 rounded-lg drop-shadow-lg md:drop-shadow-xl hover:bg-blue-100">
          <div className='flex justify-between'>
            <div>
              <p className="text-blue-600 font-semibold">Total Tickets</p>
            </div>
            <div>
              <img src={Total} alt='Total' ></img>
            </div>
          </div>

          <p className="text-2xl font-normal">{counts? String(counts.inReview + counts.open + counts.resolved) : 0}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg drop-shadow-lg md:drop-shadow-xl hover:bg-red-100">
          <div className='flex justify-between'>
            <div>
              <p className="text-red-600 font-semibold">Open Tickets</p>
            </div>
            <div>
              <img src={Open} alt='Open' ></img>
            </div>

          </div>
          <p className="text-2xl font-normal">{counts? String(counts.open) : 0}</p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg drop-shadow-lg md:drop-shadow-xl hover:bg-yellow-100">
          <div className='flex justify-between'>
            <div >
              <p className="text-yellow-600 font-semibold ">In-Progress Tickets</p>
            </div>
            <div >
              <img src={Inprogress} alt='In-progress' ></img>
            </div>
          </div>
          <p className="text-2xl font-normal">{counts? String(counts.inReview) : 0}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg drop-shadow-lg md:drop-shadow-xl hover:bg-green-100">
          <div className='flex justify-between'>
            <div>
              <p className="text-green-600 font-semibold">Resolved Tickets</p>
            </div>
            <div>
              <img src={Resolved} alt='Resolved' ></img>
            </div>
          </div>
          <p className="text-2xl font-normal">{counts? String(counts.resolved) : 0}</p>
        </div>
      </div>

    </div>
  )
}

export default Counts
