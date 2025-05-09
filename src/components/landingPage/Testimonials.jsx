import React from 'react'
import Video1 from '../../assets/Video1.png'
import Video2 from '../../assets/Video.png'

function Testimonials() {
  return (
    <div className='bg-customBlue py-20'>
      <div className='container mx-auto px-4 text-center mb-10'>
        <h1 className='text-4xl font-bold mb-4'>What Our Users Say</h1>
        <p className='text-lg'>Hear from our satisfied customers who have transformed their facility management process with Escalayt</p>
      </div>
      <div className='container mx-auto px-4 flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-20'>
        <div className='max-w-sm text-center'>
          <div className='relative'>
            <img src={Video1} alt="The first picture of a video" className='rounded-lg mb-4'/>
          </div>
          <blockquote className='italic mb-2'>"Escalayt has revolutionized the way we manage our facilities. It's incredibly efficient!"</blockquote>
          <div>
            <h4 className='font-bold'>John D</h4>
            <p className='text-sm text-gray-500'>Founder, ExtendSales</p>
          </div>
        </div>
        <div className='max-w-sm text-center'>
          <div className='relative'>
            <img src={Video2} alt="The second picture of a video" className='rounded-lg mb-4'/>
          </div>
          <blockquote className='italic mb-2'>"The real-time tracking and reporting features are game-changers for our maintenance team."</blockquote>
          <div>
            <h4 className='font-bold'>Sarah L.</h4>
            <p className='text-sm text-gray-500'>Founder, ExtendSales</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonials
