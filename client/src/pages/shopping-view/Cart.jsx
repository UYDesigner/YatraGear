import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus } from "lucide-react";
import { RxCross1 } from "react-icons/rx";
import { fetchCartItems, deleteCartItems, updateCartItems } from "@/services/shop/ShopCart";
import ReceiptCart from '@/components/shopping-view/common-components/ReceiptCart';
import { fetchShopProducDetailById } from '@/services/shop/ShopProduct';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.shopCart) || [];

  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const shipping = 10; // fixed shipping

  // Calculate subtotal
  const subtotal = (cartItems || []).reduce((acc, item) => {
    const effectivePrice = (item.offerPrice && item.offerPrice < item.price) ? item.offerPrice : item.price;
    return acc + (effectivePrice * item.quantity);
  }, 0);


  const cartTotal = subtotal + shipping;

  const handleCartItemDelete = async (productId) => {
    const response = await dispatch(deleteCartItems({ userId: user.id, productId }));
    if (response?.payload?.success) {
      dispatch(fetchCartItems(user.id));
    }
  };

  const cartTotalItems = cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;


  const handleNavigateToProductDetail = async (product) => {
    dispatch(fetchShopProducDetailById(product.productId));
    navigate("/shop/product");
  };

  useEffect(() => {
    dispatch(fetchCartItems(user.id));
  }, [dispatch]);

  return (
    <div className="w-full">
      <div className="w-full max-w-[1500px] mx-auto">
        {/* Heading */}
        <div className="topHead w-full border-b border-[#ccd29b] py-6 text-center">
          <h2 className="text-[#616630] font-bold text-2xl">Your Cart</h2>
          <p>{cartTotalItems} item{cartItems.length !== 1 && 's'}</p>
          <p className="font-semibold">${subtotal.toFixed(2)}</p>
        </div>

        {cartItems && cartItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-[60%_40%]">
            {/* Cart Items */}
            <div className="leftcart md:border-r bg-[#f6f6f4] p-4 md:p-6 flex flex-col gap-4 md:gap-6 border-[#ccd29b]">
              {cartItems.map((item, idx) => (
                <CartCard
                  key={idx}
                  product={item}
                  userId={user.id}
                  quantity={item.quantity}
                  handleCartItemDelete={handleCartItemDelete}
                  handleNavigateToProductDetail={handleNavigateToProductDetail}
                  cartItems={cartItems}
                />
              ))}
            </div>

            {/* Receipt */}
            <div className="receipt">
              <ReceiptCart
                subtotal={subtotal}
                shipping={shipping}
                total={cartTotal}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            Your cart is empty.
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;


function CartCard({ product, quantity, handleCartItemDelete, userId, handleNavigateToProductDetail, cartItems }) {
  const [localQty, setLocalQty] = useState(quantity);
  const dispatch = useDispatch();

  const updateQty = (newQty) => {
    setLocalQty(newQty);
    dispatch(updateCartItems({ userId, productId: product.productId, quantity: newQty }))
      .then((res) => {
        if (res?.payload?.success) {
          dispatch(fetchCartItems(userId));
        } else {
          // console.log("Update failed", res?.payload);
        }
      });

  };

  const handleMinus = () => {
    if (localQty > 1) {
      updateQty(localQty - 1);
    }
  };

  const handlePlus = async () => {
    if (cartItems && cartItems?.length > 0) {
      const idxOfCurrentItem = cartItems?.findIndex(item => item.productId === product.productId)

      if (idxOfCurrentItem > -1) {
        // console.log("matched", cartItems[idxOfCurrentItem])
        const getCurrentProduct = await dispatch(fetchShopProducDetailById(product.productId));
        // console.log(getCurrentProduct.payload.product.qty, "pppppp")
        const getInStockProductQuantity = getCurrentProduct.payload.product.qty;
        const getCartItemQuantity = cartItems[idxOfCurrentItem].quantity;
        // console.log("ooo", getCartItemQuantity, getInStockProductQuantity)
        if (getCartItemQuantity + 1 > getInStockProductQuantity) {
          // console.log("out")
          toast.error(`Only ${getInStockProductQuantity} quantity can be added for this product`)
          return;
        }
      }
    }
    updateQty(localQty + 1);
  };

  const effectivePrice =
    product.offerPrice && product.offerPrice < product.price
      ? product.offerPrice
      : product.price;

  useEffect(() => {
    setLocalQty(quantity);
  }, [quantity]);


  return (
    <div className="bg-white p-4">
      <div className="cross flex justify-end">
        <RxCross1
          onClick={() => handleCartItemDelete(product.productId)}
          className="text-black text-2xl cursor-pointer hover:text-[#616630]"
        />
      </div>

      <div className="infoPart py-2">
        <div className="flex items-center gap-6 md:gap-2">
          <div className="flex-[40%] grid place-items-center">
            <img
              src={product.featuredImage}
              alt={product.productName}
              className="h-35 lg:h-40  cursor-pointer"
              onClick={() => handleNavigateToProductDetail(product)}
            />
          </div>
          <div className="flex-[60%]">
            <div onClick={() => handleNavigateToProductDetail(product)} className="flex flex-col gap-1 cursor-pointer">
              <h2 className="text-black">{product.productName}</h2>
              <p className="text-gray-700">Type: <span>{product.type}</span></p>
              <p className="text-gray-700">Weight: <span>{product.weight} {product.weightType}</span></p>
              <p className="text-gray-700">Price: <span>${product.price}</span></p>
            </div>

            {/* Desktop quantity & price */}
            <div className="gty hidden md:flex items-center justify-between mt-4">
              <div className="flex gap-3 items-center">
                <button onClick={handleMinus} className="border px-2 border-black hover:bg-gray-50">
                  <Minus className="w-4" />
                </button>
                <span className="border p-2 border-black px-4 text-2xl">{localQty}</span>
                <button onClick={handlePlus} className="border px-2 border-black hover:bg-gray-50">
                  <Plus className="w-4" />
                </button>
              </div>
              <div className="price">
                <p className="font-semibold text-xl">
                  ${(effectivePrice * localQty).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Mobile quantity & price */}
            <div className="gty flex md:hidden items-center justify-between mt-4">
              <div className="flex gap-3 items-center">
                <button onClick={handleMinus} className="border px-2 border-black hover:bg-gray-50">
                  <Minus className="w-4" />
                </button>
                <span className="border p-2 border-black px-4 text-2xl">{localQty}</span>
                <button onClick={handlePlus} className="border px-2 border-black hover:bg-gray-50">
                  <Plus className="w-4" />
                </button>
              </div>
              <div className="price">
                <p className="font-semibold text-xl">
                  ${(effectivePrice * localQty).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
