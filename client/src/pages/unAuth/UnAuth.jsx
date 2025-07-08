import React from 'react';
import { Link } from 'react-router-dom';

const UnAuth = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 py-12">
      <img
        src="https://i.gifer.com/1UDY.gif"
        alt="Unauthorized access"
        className="w-80 mb-8"
      />

      <h1 className="text-6xl font-bold text-[#616630]">403</h1>
      <p className="text-2xl text-gray-700 mt-4 text-center">
        Oops! You're not authorized to view this page.
      </p>
      <p className="text-gray-500 mt-2 text-center">
        You might not have the necessary permissions or the session expired.
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

export default UnAuth;
