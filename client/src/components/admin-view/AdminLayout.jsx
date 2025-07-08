import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './admin-components/Header'
import SideBar from './admin-components/SideBar'

const AdminLayout = () => {

  const [openSideBar, setOpenSideBar] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <Header setOpen={setOpenSideBar} />

      {/* Sidebar + Page Content */}
      <div className="flex flex-1">
        <SideBar open={openSideBar} setOpen={setOpenSideBar} />
        <main className="flex-1 p-4 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout