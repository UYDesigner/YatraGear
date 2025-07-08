import React from 'react'
import { useNavigate } from 'react-router-dom';

function ReceiptCart({ subtotal, shipping, total }) {
    const navigate = useNavigate()
  return (
    <div className="border-b border-[#ccd29b] bg-white p-4 md:p-10 flex flex-col gap-4">
      <h2 className="font-semibold text-2xl">Order Summary</h2>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <p>Product Subtotal</p>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <p>Shipping</p>
          <span>${shipping.toFixed(2)}</span>
        </div>
      </div>
      <div className="total flex items-center justify-between mt-2">
        <h2 className="text-xl font-bold">Cart Total</h2>
        <p className="text-xl font-bold">${total.toFixed(2)}</p>
      </div>
      <button onClick={()=>navigate('/shop/checkOut')} className="bg-[#616630] text-white py-2 text-xl font-semibold mt-4">
        CHECKOUT
      </button>
    </div>
  );
}

export default ReceiptCart;
