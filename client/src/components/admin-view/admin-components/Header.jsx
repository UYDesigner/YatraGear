import { Button } from '@/components/ui/button';
import React from 'react'
import { LuChartNoAxesCombined } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { TiThMenu } from "react-icons/ti";
import { useDispatch } from 'react-redux';
import { logOutUserService } from '@/services/auth/AuthServices';

const Header = ({ setOpen }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogOut = async () => {
        try {
            const response = await dispatch(logOutUserService())
            
            // console.log(response)
            navigate("/auth/login")
        } catch (error) {
            // console.log("Logout karne me error", error);
        }
    };

    return (
        <header className='border-b border-gray-300 w-full font-fire'>
            <nav className='bg-white py-3 px-2 flex items-center  justify-between  mx-auto max-w-[1890px]'>
                <div className='flex items-center gap-3 '>
                    <Button onClick={() => setOpen(true)} className={'flex  md:hidden bg-[#8589e2]  cursor-pointer '}>
                        <TiThMenu className='flex text-xl text-[#ffffff] ' />
                    </Button>

                    <Link to={'/admin/dashboard'} className="logo flex items-center gap-2">
                        <LuChartNoAxesCombined className='text-white bg-[#8589e2] p-2 rounded-4xl w-[45px] h-[45px] font-bold   hidden md:flex' />
                        <h1 className='font-bold text-[32px] text-gray-700'>Admin Panel</h1>
                    </Link>
                </div>


                <Button onClick={handleLogOut} className='bg-[#858ae2] text-[18px] py-5 px-6 hover:bg-[#858ae2c3] flex items-center gap-2 cursor-pointer'>
                    <span>LogOut</span>
                    <MdLogout className='text-2xl text-white' />
                </Button>




            </nav>
        </header>
    )
}

export default Header