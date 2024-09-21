import React from 'react'
import Header from '../../components/Header/Header'
import Banner from '../../components/Banner/Banner'
import Location from '../../components/Location/Location'

const UserTemplate = () => {
  return (
    <>
        <Header/>
        <Banner/>
        <main className='max-w-7xl mx-auto px-8 sm:px-16'>
            <Location/>
        </main>
        
    </>
  )
}

export default UserTemplate