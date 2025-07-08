import { getReviewOfShopProductService } from "@/services/shop/reviewProduct";
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    reviews: [],
    

}
const shopProductReviewSlice = createSlice({
    name: 'shopProductReviewSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getReviewOfShopProductService.pending, (state) => {
            state.isLoading = true;
        }).addCase(getReviewOfShopProductService.fulfilled, (state, action) => {
           state.isLoading = true;
           state.reviews = action.payload.data;

        }).addCase(getReviewOfShopProductService.rejected, (state)=>{
            state.isLoading = false;
            state.reviews = [];
        })
    }
})

export default shopProductReviewSlice.reducer;