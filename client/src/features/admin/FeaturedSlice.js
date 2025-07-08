import { createSlice } from "@reduxjs/toolkit";
import {
 
  getAllFeaturesImageService,
 
  addFeaturedImageService
} from "../../services/admin/FeaturedService";

const featureSlice = createSlice({
  name: 'featureImageSlice',
  initialState: {
    features: [],
    loading: false,
    
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(getAllFeaturesImageService.pending, (state) => {
        state.loading = true;
      })
      
      // Add
      .addCase(addFeaturedImageService.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getAllFeaturesImageService.fulfilled, (state, action) => {
        state.loading = false;
        state.features = action.payload.data;
      })
      .addCase(getAllFeaturesImageService.rejected, (state, action) => {
        state.loading = false;
         state.features = [];
      })


      
  }
});

export default featureSlice.reducer;
