import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '@/assets/Logo'
import SearchBar from '../mini-components/SearchBar'
import { PiShoppingCart } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiAccountCircleFill } from "react-icons/ri";
import { LuUserRoundCog } from "react-icons/lu";
import { Sheet, SheetTrigger, SheetContent, SheetHeader } from '@/components/ui/sheet'
import { useDispatch, useSelector } from 'react-redux';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";


import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import SecondHeader from './SecondHeader';
import { MdLogout } from 'react-icons/md';
import { logOutUserService } from '@/services/auth/AuthServices';
import { toast } from 'sonner';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Badge } from '@/components/ui/badge';
const MainHeader = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { categoryList } = useSelector((store) => store.
        adminCategory)
    const { subCategoryList } = useSelector((store) => store.adminSubCategory)
    const { cartItems } = useSelector((store) => store.shopCart) || [];
    const [clickedCategory, setClickedCategory] = useState(null)
    const [openSubcategory, setOpenSubcategpry] = useState(null)
    const [filteredSubCategory, setfilteredSubCategory] = useState([])
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [inputText, setInputText] = useState('')


    const handleFilteration = (categoryId) => {

        if (clickedCategory === categoryId) {
            setOpenSubcategpry(!openSubcategory)

        }
        else {
            setfilteredSubCategory([])
            setClickedCategory(categoryId)
            setOpenSubcategpry(true)
            const filtered = subCategoryList.filter((sub) =>
                sub.category === categoryId

            )
            setfilteredSubCategory(filtered)
        }



    }



    const handleLogout = async () => {
        try {
            const response = await dispatch(logOutUserService()).unwrap();
            toast.success("Logged out successfully");
            navigate("/auth/login")
        } catch (error) {
            toast.error("Logout failed");
            console.error(error);
        }
    };

    const handleNavigateToListing = (getCatagoryId, getSubctagoryId) => {
        const currentFilter = {
            category: [getCatagoryId],
            subcategory: [getSubctagoryId],
        };
        sessionStorage.setItem('filters', JSON.stringify(currentFilter));

        if (isSheetOpen) {
            setIsSheetOpen(false);

        }

        // Navigate with query params to force update
        navigate(`/shop/listing?cat=${getCatagoryId}&sub=${getSubctagoryId}`);
    };

    const handleSearchBarFilteration = (input) => {
        const newFilters = {
            search: input.trim()
        };

        setInputText(input); // update input state
        setIsSheetOpen(false); // close sheet on mobile if open
        sessionStorage.setItem("filters", JSON.stringify(newFilters));
    };

    const cartTotalItems = cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;




    return (
        <div className='w-full sticky top-0 z-50 bg-white'>
            <div className=' bg-white   border-b-1 border-gray-200'>
                <header className='bg-white max-w-[1800px] mx-auto py-3 lg:py-5 px-2 ' >
                    <nav className='flex items-center justify-between'>
                        {/* smaller divice */}


                        <div className="logo flex gap-3 items-center">
                            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen} >
                                <SheetTrigger asChild>

                                    <RxHamburgerMenu className='text-2xl lg:hidden font-extrabold'
                                        onClick={() => setIsSheetOpen(true)} />


                                </SheetTrigger>

                                <SheetContent side="left" className="w-full max-w-xs p-4">
                                    <SheetHeader>
                                        <DialogTitle className="text-lg font-semibold text-[#616630]">
                                            Categories
                                        </DialogTitle>
                                    </SheetHeader>

                                    <div className='pl-2 pt-4 space-y-3'>
                                        {categoryList?.map((category) => (
                                            <div key={category._id} className="border-b pb-2">
                                                <div
                                                    onClick={() => handleFilteration(category._id)}
                                                    className="flex justify-between items-center text-[#2d2d2d] font-medium text-base cursor-pointer hover:text-black"
                                                >
                                                    <span>{category.category}</span>
                                                    {openSubcategory && clickedCategory === category._id ? (
                                                        <FaChevronUp className="text-sm" />
                                                    ) : (
                                                        <FaChevronDown className="text-sm" />
                                                    )}
                                                </div>

                                                {openSubcategory && clickedCategory === category._id && (
                                                    <div className="mt-2 ml-3 space-y-2">
                                                        {filteredSubCategory.map((sub) => (
                                                            <div
                                                                key={sub._id}
                                                                onClick={() => handleNavigateToListing(category._id, sub._id)}
                                                                className="text-sm text-gray-600 hover:text-black pl-2 border-l border-gray-300 cursor-pointer"
                                                            >
                                                                {sub.subcategory}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                </SheetContent>


                            </Sheet>

                            <Logo />

                        </div>
                        {/* searchBar */}
                        <div className="searchBar   items-center   justify-center hidden lg:flex">

                            <SearchBar setInputText={setInputText} inputText={inputText} navigate={navigate}
                                handleSearchBarFilteration={handleSearchBarFilteration}
                            />

                        </div>
                        {/* buttons */}
                        <div className="btn flex gap-5">

                            <button className="cursor-pointer relative" onClick={() => navigate('/shop/cart')}>
                                <PiShoppingCart className="text-4xl text-gray-700" />
                                {cartTotalItems > 0 && (
                                    <Badge
                                       
                                        className="absolute -top-1 -right-1 rounded-full px-[6px] py-[2px] text-xs 
                                        font-semibold
                                        bg-amber-400 text-gray-800"
                                    >
                                        {cartTotalItems}
                                    </Badge>
                                )}
                            </button>


                            {
                                !isAuthenticated ?
                                    <button
                                        onClick={() => navigate('/auth/login')}
                                        className='cursor-pointer'>
                                        <RiAccountCircleFill className='text-4xl text-gray-700' />
                                    </button>
                                    :
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Avatar className='bg-gray-600 p-2 rounded-full cursor-pointer '>
                                                <AvatarFallback className='text-white font-bold flex justify-center items-center w-6 h-6'>
                                                    {user.userName[0].toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent side='bottom' className='w-60 rounded-md shadow-md bg-white border'>
                                            <DropdownMenuLabel className='text-gray-500 text-sm'>
                                                Logged in as {user.userName}
                                                <p>{user.email}</p>
                                            </DropdownMenuLabel>

                                            <DropdownMenuSeparator />

                                            <DropdownMenuItem
                                                onClick={() => navigate('/shop/account')}
                                                className='flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-100'
                                            >
                                                <LuUserRoundCog />
                                                <span>Account</span>
                                            </DropdownMenuItem>

                                            <DropdownMenuSeparator />

                                            <DropdownMenuItem
                                                onClick={() => handleLogout()}
                                                className='flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-100'
                                            >
                                                <MdLogout />
                                                <span>Log Out</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                            }
                        </div>
                    </nav>
                </header>

            </div>
            <SecondHeader handleNavigateToListing={handleNavigateToListing} />
            <div className="searchBar  bg-white w-full px-2  border-b-1 border-gray-200
             py-1  items-center   justify-center flex lg:hidden">

                <SearchBar setInputText={setInputText} inputText={inputText} navigate={navigate}
                    handleSearchBarFilteration={handleSearchBarFilteration}
                />

            </div>
        </div>
    )
}

export default MainHeader