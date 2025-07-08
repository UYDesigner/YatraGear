import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ProductDetails from './ProductDetails';
import { toast } from 'sonner';
import { addToCart, fetchCartItems } from '@/services/shop/ShopCart';

const Product = () => {
  const { productDetails, isLoading } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((store) => store.shopCart);
  const dispatch = useDispatch();

  // ✅ Call hooks before any early return
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [user?.id]);

  // ✅ Now do conditional rendering
  if (isLoading || !productDetails) {
    return <div className="p-6 text-gray-500">Loading product details...</div>;
  }

  const handleAddToCart = async (productId, localQuantity) => {
    dispatch(addToCart({ userId: user.id, productId, quantity: localQuantity })).then((data) => {
      if (data.payload.success) {
        dispatch(fetchCartItems(user.id));
        toast.success("Product is added to cart");
      }
    });
  };

  return (
    <ProductDetails
      productDetails={productDetails}
      handleAddToCart={handleAddToCart}
      user={user}
      cartItems={cartItems}
    />
  );
};




export default Product
