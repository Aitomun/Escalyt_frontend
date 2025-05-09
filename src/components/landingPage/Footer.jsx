import React from 'react'

function Footer() {
  return (
    <div className='bg-black py-10'>
      <div className='container mx-auto px-4'>
        <div className='bg-blue-600 text-white py-10 px-8 rounded-md mb-10 flex flex-col md:flex-row items-center justify-between'>
          <div className='mb-6 md:mb-0'>
            <h1 className='text-3xl font-bold mb-2'>Get Started Today</h1>
            <p>Join the many businesses that trust Escalayt for their facility management needs. Sign up now and experience the difference.</p>
          </div>
          <div>
            <button className='bg-black text-white px-6 py-3 rounded-md'>Download Now</button>
          </div>
        </div>
        <div className='flex flex-col md:flex-row text-white justify-between'>
          <div className='mb-6 md:mb-0'>
            <h3 className='font-bold text-xl mb-2'>Contact Information</h3>
            <p>For support, email us at support@escalayt.com or call us at (123) 456-7890.</p>
          </div>
          <div className='mb-6 md:mb-0'>
            <h3 className='font-bold text-xl mb-2'>Company</h3>
            <ul>
              <li className='mb-2'><a href="#" className='hover:text-blue-600'>About Us</a></li>
              <li className='mb-2'><a href="#" className='hover:text-blue-600'>Contact</a></li>
              <li className='mb-2'><a href="#" className='hover:text-blue-600'>Privacy Policy</a></li>
              <li className='mb-2'><a href="#" className='hover:text-blue-600'>Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className='font-bold text-xl mb-2'>Social Media Links</h3>
            <ul>
              <li className='mb-2'><a href="#" className='hover:text-blue-600'>Facebook</a></li>
              <li className='mb-2'><a href="#" className='hover:text-blue-600'>Twitter</a></li>
              <li className='mb-2'><a href="#" className='hover:text-blue-600'>LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
