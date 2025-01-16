import React from 'react'
import { IoLogoGithub } from "react-icons/io5";

function Footer() {
  return (
    <div className='text-center text-sm text-gray-200 h-[8vh] bg-gradient-to-r from-gray-900 to-gray-600'>
        <div>
            <h4>© 2023 Bas Kar</h4>
           <div className='flex justify-center items-center gap-2'>
           <span ><IoLogoGithub /> </span>
           <span> @ved-286</span>
           </div>
        </div>
    </div>
  )
}

export default Footer