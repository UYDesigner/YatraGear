import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import React, { useState } from 'react'

import { MdEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { FaMapMarkerAlt, FaBuilding } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { subscribeUser } from '@/services/shop/reviewProduct';



const Footer = ({ categoryList, subCategoryList, brandList, handleNavigateFromHomeToListing }) => {

  const [userEmail, setUserEmail] = useState("")
  const userINfo = useSelector((state) => {
    // console.log(state.auth)
    return state.auth.user;
  })
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubscription = async () => {

    if (!userEmail || userEmail.trim().length === 0) {
      toast.error("Enter your email id");
      return;
    }

    // ✅ validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!userINfo) {
      toast.error("You need to login first");
      return;
    }

    try {
      const response = await dispatch(
        subscribeUser({ userId: userINfo?.id, email: userEmail })
      ).unwrap();



      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message || "Something went wrong.");
      }
    } catch (error) {

      toast.error(error);
    } finally {
      setUserEmail("")
    }
  };




  return (
    <footer className="w-full mt-30 bg-[#f6f6f4] text-gray-800">
      <div className="max-w-[1700px] mx-auto px-6 py-10 bg-[#f6f6f4]">
        {/* Main Footer Sections */}
        <div className="flex flex-wrap items-center justify-between gap-10">
          {/* Brand Info */}
          <div className="flex-1 min-w-[250px]">
            <h2 className="text-3xl  md:text-4xl font-bold text-[#1e1d19] mb-4">YatraGear</h2>
            <p className="text-[15px] leading-relaxed">
              YatraGear is your go-to destination for reliable outdoor gear and tools — whether you're trekking, camping, or just chasing the wild. Built for explorers, crafted for adventure.
            </p>
          </div>

          {/* Contact */}
          <div className="flex-1 min-w-[220px]">
            <h2 className="text-lg text-[#1e1d19] font-semibold mb-4">Contact Us</h2>

            <div className="flex items-start gap-2 text-[15px] mb-2">
              <MdEmail className="text-[#1e1d19] mt-[2px]" />
              <span>info@yatragear.com</span>
            </div>

            <div className="flex items-start gap-2 text-[15px] mb-2">
              <FiPhone className="text-[#1e1d19] mt-[2px]" />
              <span>+1 (892) 820-08</span>
            </div>

            <div className="flex items-start gap-2 text-[15px] mb-2">
              <FaMapMarkerAlt className="text-[#1e1d19] mt-[2px]" />
              <span>123 Suite 789, City, Country</span>
            </div>

            <div className="flex items-start gap-2 text-[15px]">
              <FaBuilding className="text-[#1e1d19] mt-[2px]" />
              <span>YatraGear Pvt. Ltd.</span>
            </div>
          </div>


          {/* subscription */}
          <div className="flex-1 min-w-[250px]">
            <h2 className="text-lg font-semibold mb-3 text-[#1e1d19]">Stay Updated</h2>
            <p className="text-[15px] mb-2">For exclusive deals & offers</p>
            <div className="flex items-center gap-2">
              <Input onChange={(e) => setUserEmail(e.target.value)} type="email" value={userEmail} name={userEmail} placeholder="Enter your email" className="flex-1" />
              <Button onClick={handleSubscription} className={'bg-[#1e1d19]'}>Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Quick Links Sections */}
        <div className="grid grid-cols-1 md:grid-cols-4  gap-10 mt-10 text-sm text-[#1e1d19]">
          {/* Categories */}
          {categoryList?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Categories</h2>
              <ul className="space-y-1">
                {categoryList.map((category) => (
                  <li key={category._id} onClick={() => handleNavigateFromHomeToListing(category._id, "category")} className="hover:underline cursor-pointer">
                    {category.category}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Subcategories */}
          {subCategoryList?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Subcategories</h2>
              <ul className="space-y-1">
                {subCategoryList.map((subcategory) => (
                  <li key={subcategory._id} onClick={() => handleNavigateFromHomeToListing(subcategory._id, "subcategory")} className="hover:underline cursor-pointer">
                    {subcategory.subcategory}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Brands */}
          {brandList?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Brands</h2>
              <ul className="space-y-1">
                {brandList.map((brand) => (
                  <li key={brand._id} onClick={() => handleNavigateFromHomeToListing(brand._id, "brand")} className="hover:underline cursor-pointer" >
                    {brand.brandName}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* legal */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Legal</h2>
            <ul className="space-y-1">
              <li className="hover:underline cursor-pointer" onClick={() => navigate('/shop/home')}  >Privacy Policy</li>
              <li className="hover:underline cursor-pointer" onClick={() => navigate('/shop/home')} >Terms of Service</li>
              <li className="hover:underline cursor-pointer" onClick={() => navigate('/shop/home')}  > Cookie Policy</li>
            </ul>
          </div>
        </div>





      </div>


      {/* Footer Bottom */}
      <div className="flex flex-col md:flex-row border-t border-gray-300 justify-center md:justify-between items-center text-md text-gray-600 py-6 px-4 gap-2 text-center">
        <p>© 2025 YatraGear. All rights reserved.</p>
        <p>
          Designed and developed by <span className="font-semibold text-[#1e1d19]">Urvashi Yadav</span>
        </p>
      </div>


    </footer>
  )
}

export default Footer
