import Logo from '@/assets/Logo'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { RxCross1 } from "react-icons/rx";

const AuthLayout = () => {
  return (
    <div className='flex flex-col  w-full min-h-[90vh] '>
      <div className='right relative  py-5 w-full flex items-center justify-center border border-b border-gray-300'>

        {/* Centered Logo */}
        <div>
          <Logo size={'5xl'} />
        </div>
        {/* X on the left */}
        <div className='absolute right-4 md:right-8'>
          <Link to={'/shop/home'}>
            <RxCross1 className='font-extrabold text-xl md:text-2xl cursor-pointer hover:text-gray-600' />
          </Link>
        </div>
      </div>


      <div className="left  grid place-items-center ">
        <Outlet />
      </div>
    </div >
  )
}

export default AuthLayout