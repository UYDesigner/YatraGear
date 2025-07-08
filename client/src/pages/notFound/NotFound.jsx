import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 py-12">
      <img
        src="https://cdn.svgator.com/images/2024/04/electrocuted-caveman-animation-404-error-page.gif"
        alt="Page not found"
        className="w-80 mb-4"
      />
    

      <h1 className="text-5xl sm:text-6xl font-bold text-[#616630]">404</h1>
      <p className="text-2xl text-gray-700 mt-4 text-center">
        Uh-oh! The page you're looking for doesn't exist.
      </p>
      <p className="text-gray-500 mt-2 text-center ">
        Maybe it was moved or deleted. Let’s get you back on track!
      </p>

      <Link
        to="/shop/home"
        className="mt-6 px-6 py-3 bg-[#616630] text-white text-lg rounded-xl hover:bg-[#4a4e27] transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
