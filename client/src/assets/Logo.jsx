import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
    return (
       <div className={`logo font-lobster text-[35px] lg:text-[48px] text-[#f2c420]  text-shadow-2xs text-shadow-gray-500 cursor-pointer `}>
            <Link to={'/shop/home'}>

                YatraGear
            </Link>
        </div>
    )
}

export default Logo