import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video pt-[15%] px-24 absolute bg-gradient-to-r from-black'>
      <h1 className='text-6xl font-bold text-white'>{title}</h1>
      <p className='py-6 text-lg w-1/4 text-white'>{overview}</p>
      <div className=''>
        <button 
        className=' bg-gray-500 text-white rounded-lg p-4 px-16 text-xl hover:bg-opacity-80'>
         ▶ Play</button>
        <button className='bg-gray-500 mx-2 bg-opacity-100 rounded-lg text-white p-4 px-12 text-xl'>⚠ More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle