import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const CheckAuth = ({ isAuthenticated, user, children, isLoading }) => {
    const location = useLocation();
    const path = location.pathname;

    // console.log(isAuthenticated, user, children, "cchhhh")


    // ⏳ Show nothing or a loader until auth is loaded
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f7f7f2] px-4">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#616630] border-t-transparent mx-auto"></div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-[#414425]">Checking authentication...</h2>
                    <p className="text-gray-500 text-sm sm:text-base">Please wait while we verify your access.</p>
                </div>
            </div>
        );

    }

    if (location.pathname === '/') {
        if (!isAuthenticated) {
            return <Navigate to="/auth/login" replace />;
        }
        else {
            if (user?.role === 'admin') {
                // console.log("4 condition")
                return <Navigate to="/admin/dashboard" replace />;
            } else {
                // console.log("4 condition")
                return <Navigate to="/shop/home" replace />;
            }
        }
    }
   
  
    
  


    // 1. Restrict access to protected routes for unauthenticated users
    if (
        !isAuthenticated && (
            path.startsWith('/shop/cart') ||
            path.startsWith('/shop/account') ||
            path.startsWith('/shop/checkout') ||
            path.startsWith('/shop/listing') ||
            path.startsWith('/shop/product') ||
            path.startsWith('/admin') 
           
        )
    ) {
        return <Navigate to="/auth/login" replace />;
    }



    if (isAuthenticated && user?.role !== 'admin' && path.startsWith('/admin')) {
        // console.log("2 condition")
        return <Navigate to="/unauth" replace />;
    }

    // 3. Prevent admin users from accessing /shop/* pages (optional)
    if (isAuthenticated && user?.role === 'admin' && path.startsWith('/shop')) {
        // console.log("3 condition")
        return <Navigate to="/admin/dashboard" replace />;
    }

    // 4. Redirect authenticated users away from auth pages
    if (isAuthenticated && path.startsWith('/auth')) {
        if (user?.role === 'admin') {
            // console.log("4 condition")
            return <Navigate to="/admin/dashboard" replace />;
        } else {
            // console.log("4 condition")
            return <Navigate to="/shop/home" replace />;
        }
    }

    // console.log("5 condition")
    // 5. Allow public access to /shop/*
    return <>{children}</>;
};

export default CheckAuth;
