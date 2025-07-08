import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { MdDashboard, MdSettings } from "react-icons/md"
import { FaBoxOpen } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa6"
import { MdPeople } from "react-icons/md"
import { MdCategory } from "react-icons/md";
import { SiBrandfolder } from "react-icons/si";
import { BiSolidCategoryAlt } from "react-icons/bi";

import {
    Sheet,
    SheetContent,

    SheetHeader,
    SheetTitle,

} from "@/components/ui/sheet"

const SideBar = ({ open, setOpen }) => {

    return (
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen} >
                <SheetContent side="left" className={'w-74'}>
                    <div className='flex flex-col h-full'>
                        <SheetHeader className={'border-b'}>
                            <SheetTitle>
                                <div className="flex items-center gap-3 py-4 px-2 border-b">
                                    <img
                                        src="/avatar.png"
                                        alt="admin"
                                        className="border border-black rounded-full w-[70px] h-[70px] object-cover"
                                    />
                                    <div>
                                        <p className="text-[15px] font-semibold text-gray-700">Urvashi Yaduvanshi</p>
                                        <p className="text-[14px] text-gray-500">Head Admin</p>
                                    </div>
                                </div>
                            </SheetTitle>
                            {
                                menuLinks(setOpen)
                            }



                        </SheetHeader>
                    </div>


                </SheetContent>
            </Sheet>

            <aside className="h-screen hidden  bg-white border-r font-fire md:flex flex-col justify-between w-74">
                <div className="p-4 ">
                    {/* Admin Info */}
                    <div className="flex items-center gap-3 py-4 px-2 border-b">
                        <img
                            src="/avatar.png"
                            alt="admin"
                            className="border border-black rounded-full w-[70px] h-[70px] object-cover"
                        />
                        <div>
                            <p className="text-[15px] font-semibold text-gray-700">Urvashi Yaduvanshi</p>
                            <p className="text-[14px] text-gray-500">Head Admin</p>
                        </div>
                    </div>

                    {/* Nav Links */}
                    {
                        menuLinks()
                    }

                </div>
            </aside>
        </Fragment>



    )
}

function menuLinks(setOpen) {
    const navLinks = [
        {
            path: '/admin/dashboard',
            icon: <MdDashboard className="text-2xl" />,
            linkName: 'Dashboard',
        },
        {
            path: '/admin/products',
            icon: <FaBoxOpen className="text-2xl" />,
            linkName: 'Products',
        },
        {
            path: '/admin/categories',
            icon: <MdCategory className="text-2xl" />,
            linkName: 'Categories',
        },
        {
            path: '/admin/subcategories',
            icon: <BiSolidCategoryAlt className="text-2xl" />,
            linkName: 'Sub Categories',
        },
        {
            path: '/admin/brands',
            icon: <SiBrandfolder className="text-2xl" />,
            linkName: 'Brands',
        },
        {
            path: '/admin/orders',
            icon: <FaClipboardList className="text-2xl" />,
            linkName: 'Orders',
        },

        {
            path: '/admin/features',
            icon: <MdSettings className="text-2xl" />,
            linkName: 'Features',
        },
    ]

    return (
        <div className="mt-6 flex flex-col gap-2">
            {navLinks.map((link, idx) => (
                <NavLink
                    onClick={() => (

                        setOpen ? setOpen(false) : null)}
                    key={idx}
                    to={link.path}
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2 rounded-lg text-[16px] font-medium transition hover:bg-gray-100 ${isActive ? 'bg-[#858ae2] text-white' : 'text-gray-700'
                        }`
                    }
                >
                    {link.icon}
                    {link.linkName}
                </NavLink>
            ))}
        </div>
    )
}


export default SideBar
