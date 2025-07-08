import React from 'react'
import { IoSearchSharp } from "react-icons/io5";


const SearchBar = ({ inputText, setInputText, navigate, handleSearchBarFilteration }) => {

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && inputText.trim()) {
            sessionStorage.removeItem('filters');
             handleSearchBarFilteration(inputText); 
            navigate(`/shop/listing?search=${inputText}`);
        }
    }

   


    return (
        <div onClick={() => navigate('/shop/listing')} className='  lg:w-[600px] w-full px-3  bg-gray-100    rounded-2xl flex items-center  border border-white hover:border-gray-300'>
            <IoSearchSharp className='text-gray-500 text-xl' />
            <input

                onChange={(e) => setInputText(e.target.value)}
                value={inputText}
                onKeyDown={handleKeyDown}
                type="text"
                placeholder=" Search..."
                className="w-full bg-gray-100 px-4 py-1 lg:py-2  border-none  focus:outline-none"
            />
        </div>
    )
}

export default SearchBar