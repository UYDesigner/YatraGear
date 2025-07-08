import { addToCart, deleteCartItems, fetchCartItems, updateCartItems } from "@/services/shop/ShopCart";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  cartItems: [],
};



const cartSlice = createSlice({
  name: "shopCart",
  initialState,
  reducers: {
    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder

      // ✅ ADD TO CART
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {

        state.isLoading = false;

      })
      .addCase(addToCart.rejected, (state) => {
        
        state.isLoading = false;
        state.cartItems = [];
      })

      // ✅ FETCH CART
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.isLoading = false;
        state.cartItems = action.payload?.data?.items || [];
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })

      // ✅ UPDATE CART
      .addCase(updateCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload?.data?.items || [];
      })
      .addCase(updateCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })

      // ✅ DELETE CART ITEM
      .addCase(deleteCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
       
        state.cartItems = action.payload?.data?.items || [];
      })
      .addCase(deleteCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});
export const { removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;
