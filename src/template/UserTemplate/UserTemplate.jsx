import React from 'react'
import Header from '../../components/Header/Header'
import Banner from '../../components/Banner/Banner'
import Location from '../../components/Location/Location'
import LiveCard from '../../components/LiveCard/LiveCard'
import Footer from '../../components/Footer/Footer'
import { Outlet } from 'react-router-dom'
const UserTemplate = () => {
  return (
    <>
        <Header/>
        <main className='max-w-7xl mx-auto px-8 sm:px-16'>
        <Outlet></Outlet>
        </main>
        <Footer/>
    </>
  )
}

export default UserTemplate