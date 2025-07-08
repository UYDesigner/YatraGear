import { createSlice } from "@reduxjs/toolkit";
import {
  addShopUserAddress,
  fetchShopUserAddress,
  updateShopUserAddress,
  deleteShopUserAddress,
} from "@/services/shop/address";

const initialState = {
  isloading: false,
  addressList: [],
};

const addressSlice = createSlice({
  name: "shopUserAddress",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add Address
    builder
      .addCase(addShopUserAddress.pending, (state) => {
        state.isloading = true;
      })
      .addCase(addShopUserAddress.fulfilled, (state, action) => {
        // console.log(action.payload, "action")
        state.isloading = false;
        state.addressList = action.payload;
      })
      .addCase(addShopUserAddress.rejected, (state) => {
        state.isloading = false;
      });

    // Fetch Address
    builder
      .addCase(fetchShopUserAddress.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchShopUserAddress.fulfilled, (state, action) => {
        state.isloading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchShopUserAddress.rejected, (state) => {
        state.isloading = false;
      });

    // Update Address
    builder
      .addCase(updateShopUserAddress.pending, (state) => {
        state.isloading = true;
      })
      .addCase(updateShopUserAddress.fulfilled, (state, action) => {
        state.isloading = false;
        state.addressList = action.payload.data;
      })
      .addCase(updateShopUserAddress.rejected, (state) => {
        state.isloading = false;
      });

    // // Delete Address
    // builder
    //   .addCase(deleteShopUserAddress.pending, (state) => {
    //     state.isloading = true;
    //   })
    //   .addCase(deleteShopUserAddress.fulfilled, (state, action) => {
    //     state.isloading = false;
    //     state.addressList = action.payload.data;
    //   })
    //   .addCase(deleteShopUserAddress.rejected, (state) => {
    //     state.isloading = false;
    //   });
  },
});

export default addressSlice.reducer;
