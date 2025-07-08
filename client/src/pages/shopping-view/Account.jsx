import React from "react";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@radix-ui/react-tabs";
import Address from "@/components/shopping-view/address/address";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOutUserService } from "@/services/auth/AuthServices";
import { toast } from "sonner";
import Order from "@/components/shopping-view/orders-page/Order";

const Account = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logOutUserService()).unwrap();
      toast.success("Logged out successfully");
      navigate("/auth/login");
    } catch (error) {
      toast.error("Logout failed");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <RiAccountCircleLine className="text-3xl text-[#616630]" />
        <h2 className="text-2xl font-semibold text-gray-800">My Account</h2>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="profile" className="w-full">
        {/* Tab Buttons */}
        <TabsList className="flex gap-3 mb-4">
          <TabsTrigger
            value="profile"
            className="px-4 py-2 rounded-xl text-gray-700 border border-gray-300 data-[state=active]:bg-black data-[state=active]:text-white transition"
          >
            Profile Info
          </TabsTrigger>
          <TabsTrigger
            value="address"
            className="px-4 py-2 rounded-xl text-gray-700 border border-gray-300 data-[state=active]:bg-black data-[state=active]:text-white transition"
          >
            Address Info
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="px-4 py-2 rounded-xl text-gray-700 border border-gray-300 data-[state=active]:bg-black data-[state=active]:text-white transition"
          >
            Orders
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="border border-gray-300 rounded-2xl p-6 bg-white">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Profile Info</h3>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Name:</span> {user.userName}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {user.email}
              </p>
            </div>
          </div>
        </TabsContent>

        {/* Address Tab */}
        <TabsContent value="address">

          <Address />

        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <Order />
        </TabsContent>
      </Tabs>

      {/* Logout */}
      <div className="text-right">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2 border border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition"
        >
          <IoLogOutOutline className="text-xl" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Account;
