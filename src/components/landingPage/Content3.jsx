import React from 'react'
import warehouse from '../../assets/warehouse.png'
import arrowRight from '../../assets/arrow-right.svg'
import { Link } from 'react-router-dom'

function Content3() {
  return (
    <>
    <div className='container mx-auto px-4 flex flex-col md:flex-row items-center justify-between'>
      <div className='p-12'>
        <img src={warehouse} alt="A ware-house"  className='rounded-lg'/>
      </div>
     <div>
        <h1 className='text-4xl  font-bold mb-6'>Efficient Facility Management</h1>
        <p className='text-lg mb-4'>Escalayt provides a centralized platform <br /> for managing all your facility-related <br /> tickets.
             Track,prioritize and resolve issues <br /> seamlessly</p>
            <div>
            <Link to="/signup">
            <button className="flex items-center font-bold"
            >
              Make your first sale
              <img src={arrowRight} alt="An arrow" className="ml-2" />
           </button>
           </Link>
            </div>
     </div>
    </div>
    </>
  )
}

export default Content3