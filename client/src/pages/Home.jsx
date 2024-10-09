import React from 'react'
import Footer from '../components/footer/Footer'
import { Outlet } from 'react-router-dom'
function Home() {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  )
}

export default Home