import { fetchAllBrandService } from "@/services/admin/BrandService";
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: true,
    brandsList: []
}

const brandSlice = createSlice({
    name: "adminBrands",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllBrandService.pending, (state) => {
                state.isLoading = true;
            }).addCase(fetchAllBrandService.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.brandsList = action.payload.data
            }).addCase(fetchAllBrandService.rejected, (state) => {
                state.isLoading = false,
                    state.brandsList = []
            })
    }

})

export default brandSlice.reducer;