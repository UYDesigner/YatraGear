import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white px-4">
      <CheckCircle2 className="w-20 h-20 text-emerald-500 mb-6" />
     
      <h1 className="text-3xl font-semibold mb-2">Payment Successful</h1>
      <p className="text-neutral-400 text-center max-w-md mb-6">
        Thank you for your purchase! Your order is confirmed and being processed.
      </p>
      <a
        href="/shop/account"
        className="px-6 py-2 rounded-full bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition"
      >
        View Order
      </a>
    </div>
  );
};

export default PaymentSuccess;
