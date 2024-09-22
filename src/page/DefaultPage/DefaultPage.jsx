import React from 'react'
import Banner from '../../components/Banner/Banner'
import Location from '../../components/Location/Location'
import LiveCard from '../../components/LiveCard/LiveCard'

const DefaultPage = () => {
  return (
    <div>
        <Banner/>
        <Location/>
        <LiveCard/>
    </div>
  )
}

export default DefaultPage