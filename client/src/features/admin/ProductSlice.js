import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProductService } from "@/services/admin/ProductService";

const initialState ={
    isLoading : true,
    productList : []
}

const productSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProductService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllProductService.fulfilled, (state, action) => {
                // console.log(action.payload, "action hia yeh");
                state.isLoading = false;
                state.productList = action.payload.data;
            })
            .addCase(fetchAllProductService.rejected, (state) => {
                state.isLoading = false;
                state.productList = [];
            });
    }
})

export default productSlice.reducer;