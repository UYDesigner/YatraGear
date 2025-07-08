import { fetchAllCategoriesService } from "@/services/admin/CategoryService";
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isLoading: true,
    categoryList: []
};

const categorySlice = createSlice({
    name: 'adminCategories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCategoriesService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllCategoriesService.fulfilled, (state, action) => {
                // console.log(action.payload, "action hia yeh");
                state.isLoading = false;
                state.categoryList = action.payload.data;
            })
            .addCase(fetchAllCategoriesService.rejected, (state) => {
                state.isLoading = false;
                state.categoryList = [];
            });
    }
});

export default categorySlice.reducer; 
