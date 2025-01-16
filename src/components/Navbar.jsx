import React from 'react'

function Navbar() {
  return (
   <>
   <div className='flex justify-between bg-purple-300 w-full h-[8vh] overflow-hidden' >
    <div className='flex justify-center items-center ml-5'>
        <h1 className='font-bold text-2xl text-white'>Bas Kar!!</h1>
    </div>
    <div className='flex justify-center items-center mr-5 gap-2'>
        <button className='bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'>Buy Me a Coffee</button>
        <button className='bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'>Login</button>
    </div>
   </div>
   </>
  )
}

export default Navbar