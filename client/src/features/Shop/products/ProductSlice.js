import { fetchAllFilteredProducts, fetchShopProducDetailById } from "@/services/shop/ShopProduct"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null
}

const ProductSlice = createSlice({
  name: 'shopProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllFilteredProducts.pending, (state) => {
      state.isLoading = true
    }).addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
      // console.log(action.payload.data)
      state.isLoading = false,
        state.productList = action.payload.data
    }).addCase(fetchAllFilteredProducts.rejected, (state) => {
      isLoading = false,
        state.productList = []

    }).addCase(fetchShopProducDetailById.pending, (state) => {
      state.isLoading = true
    }).addCase(fetchShopProducDetailById.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.isLoading = false;
      state.productDetails = action.payload?.product;
    }).addCase(fetchShopProducDetailById.rejected, (state) => {
      state.isLoading = false; // was a global variable before due to missing 'state.'
      state.productDetails = null;
    })


  }
})

export default ProductSlice.reducer