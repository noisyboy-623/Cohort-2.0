import React from 'react'
import { Outlet } from 'react-router'
import Navbar from "../features/shared/components/Navbar"
import Footer from '../features/shared/components/Footer'

const AppLayout = () => {
  return (
    <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
  )
}

export default AppLayout