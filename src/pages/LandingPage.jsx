import React from 'react'
import Header from '../components/landingPage/Header'
import Content from '../components/landingPage/Content'
import Content1 from '../components/landingPage/Content1'
import Content2 from '../components/landingPage/Content2'
import Content3 from '../components/landingPage/Content3'
import Testimonials from '../components/landingPage/Testimonials'
import Footer from '../components/landingPage/Footer'



function LandingPage() {
  return (
    <div>
      <Header />
      <Content />
      <Content1 />
      <Content2 />
      <Content3 />
      <Testimonials />
      <Footer />
        
    </div>
  )
}

export default LandingPage