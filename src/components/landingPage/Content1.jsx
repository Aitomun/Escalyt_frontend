import React from 'react'
import TwoWorkers from '../../assets/workers.png'
import check from '../../assets/icon.svg'
import arrowRight from '../../assets/arrow-right.svg'
import { Link } from 'react-router-dom';

function Content1() {
  return (
    <>
    <div className='container mx-auto px-4 flex flex-col md:flex-row items-center justify-between'> 
      <div>
        <img src={TwoWorkers} alt="Two workers pointing at something"  className="rounded-lg"/>
      </div>
        <div>
            <h3 className='text-4xl font-bold mb-6'>Key Features</h3>
            <p className='text-lg mb-4'>Discover the powerful features of Escalayt that<br/> make facility management a breeze</p>
            <ul>
                <li className='flex items-center'><img src={check} alt="check" className='mr-2' />Easy Ticket Creation</li>
                <li className='flex items-center'><img src={check} alt="check" className='mr-2'/>Real-Time Tracking </li>
                <li className='flex items-center'><img src={check} alt="check" className='mr-2'/>Detailed Reports and Analytics</li>
                <li className='flex items-center'><img src={check} alt="check" className='mr-2'/>Team Collaboration</li>
                <li className='flex items-center'><img src={check} alt="check" className='mr-2'/>User-Friendly Interface</li>
            </ul>
            <div className='mr-6 font-bold p-6'>
            <Link to="/signup"> <button className="flex items-center font-bold"
            >
              Make your first sale
              <img src={arrowRight} alt="An arrow" className="ml-2" />
           </button></Link>
           
            </div>
            
        </div>
    </div>
    </>
  )
}

export default Content1