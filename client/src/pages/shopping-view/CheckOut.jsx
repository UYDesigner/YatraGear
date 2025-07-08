import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Address from '@/components/shopping-view/address/address';
import { createNewOrder } from '@/services/shop/ShopOrders';

const CheckOut = () => {
  const cartItems = useSelector((store) => store.shopCart.cartItems) || [];
  const user = useSelector((store) => store.auth?.user) || {};
  const { addressList } = useSelector((state) => state.shopAddress);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.offerPrice && item.offerPrice < item.price ? item.offerPrice : item.price;
    return acc + price * item.quantity;
  }, 0);

  const shipping = 10;
  const total = subtotal + shipping;

  const handleInitialtePayPalPayment = async () => {
    if (!currentSelectedAddress || cartItems.length === 0) return;

    const orderData = {
      userId: user.id,
      cartId: user.id, // replace if you have real cartId
      cartItems: cartItems.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        featuredImage: item.featuredImage,
        price: item.offerPrice > 0 ? item.offerPrice : item.price,
        qty: item.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress._id,
        address: currentSelectedAddress.address,
        city: currentSelectedAddress.city,
        state: currentSelectedAddress.state,
        pincode: currentSelectedAddress.pincode,
        phone: currentSelectedAddress.phoneNumber,
        locality: currentSelectedAddress.locality,
        addressType: currentSelectedAddress.addressType
      },
      paymentMethod: 'Paypal',
      Shipping: shipping,
      subTotal: subtotal,
      totalAmount: total,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    };

    try {
      setLoading(true);
      const resultAction = await dispatch(createNewOrder(orderData));
      const data = resultAction.payload;

      if (data?.success && data?.approvalUrl) {
        window.location.href = data.approvalUrl;
      } else {
        window.location.href = '/shop/payment-cancel?reason=paypal_error';
      }
    } catch (error) {
      console.error('Payment init error:', error);
      window.location.href = '/shop/payment-cancel?reason=network_error';
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full py-3 lg:py-10 px-2'>
      <div className='max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6'>
        <div>
          <Address
            currentSelectedAddress={currentSelectedAddress}
            setCurrentSelectedAddress={setCurrentSelectedAddress}
          />
        </div>
        <div className="space-y-3">
          {cartItems.length > 0 && cartItems.map((item) => {
            const price = item.offerPrice && item.offerPrice < item.price ? item.offerPrice : item.price;
            return (
              <div key={item.productId} className="flex items-center gap-3 bg-white border rounded shadow-sm p-3">
                <img src={item.featuredImage} alt={item.productName} className="w-16 h-16 object-cover rounded-xl" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 text-sm">{item.productName}</h3>
                  <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                </div>
                <div className="font-semibold text-gray-800 text-sm">
                  ${(price * item.quantity).toFixed(2)}
                </div>
              </div>
            );
          })}

          <div className="bg-white border rounded shadow-sm p-4 space-y-3">
            <div className="flex justify-between text-gray-700 text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700 text-sm">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold text-gray-800">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleInitialtePayPalPayment}
              disabled={!currentSelectedAddress || cartItems.length === 0 || loading}
              className={`w-full rounded py-2 text-sm font-semibold transition 
                ${!currentSelectedAddress || cartItems.length === 0 || loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#616630] text-white hover:bg-[#505a27]'}
              `}
            >
              {loading ? 'Processing...' : 'Make Payment'}
            </button>
            <div className='text-center'>
              {addressList.length === 0 && (
                <p className="text-red-500 text-sm">Please add a delivery address before making payment.</p>
              )}
              {addressList.length > 0 && !currentSelectedAddress && (
                <p className="text-yellow-600 text-sm">Please select an address to continue.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
