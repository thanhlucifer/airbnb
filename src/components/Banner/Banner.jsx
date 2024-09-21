import React from 'react'
import './Banner.scss'
const Banner = () => {
  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] mb-10 banner">
      <div className="absolute top-1/2 w-full text-center ">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 text-white">Not sure where to go? Perfect.</h2>

        <button className=" text-purple-500 bg-white px-10 py-4 shadow-md rounded-full font-bold my-3 hover:shadow-xl active:scale-150 transition duration-50 ">I'm flexible</button>
      </div>
    </div>
  )
}

export default Banner