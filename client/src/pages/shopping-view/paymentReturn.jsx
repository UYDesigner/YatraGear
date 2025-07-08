import React, { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { captureOrder } from '@/services/shop/ShopOrders';

const PaymentReturn = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.warn('Capture taking too long, redirecting...');
      window.location.href = '/shop/payment-success';
    }, 15000);

    const capture = async () => {
      try {
        const orderID = JSON.parse(sessionStorage.getItem('currentOrderId'));
        if (orderID) {
          const data = await dispatch(captureOrder(orderID));
          if (data?.payload?.success) {
            sessionStorage.removeItem('currentOrderId');
            clearTimeout(timeout);
            window.location.href = '/shop/payment-success';
          } else {
            clearTimeout(timeout);
            window.location.href = '/shop/payment-success'; // still go to success
          }
        } else {
          clearTimeout(timeout);
          window.location.href = '/shop/payment-cancel?reason=missing_order';
        }
      } catch (error) {
        console.error('Error during capture:', error);
        clearTimeout(timeout);
        window.location.href = '/shop/payment-cancel?reason=capture_failed';
      }
    };
    capture();
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white px-4">
      <Loader2 className="animate-spin text-amber-500 w-16 h-16 mb-6" />
      <h1 className="text-3xl font-semibold mb-2">Processing your payment</h1>
      <p className="text-neutral-400 text-center max-w-md">
        Hang tight! We’re confirming your order and getting it ready.
      </p>
    </div>
  );
};

export default PaymentReturn;
