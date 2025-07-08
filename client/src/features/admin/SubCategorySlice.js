import { fetchAllSubCategoriesService } from "@/services/admin/SubCategoryService";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
    subCategoryList: []
};


const subCategorySlice = createSlice({
    name: 'adminSubCategories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllSubCategoriesService.pending, (state) => {
                state.isLoading = true;
            }).addCase(fetchAllSubCategoriesService.fulfilled, (state, action)=>{
                state.isLoading = false,
                state.subCategoryList = action.payload.data
            }).addCase(fetchAllSubCategoriesService.rejected, (state)=>{
                state.isLoading = false,
                state.subCategoryList = []
            })

    }
})

export default subCategorySlice.reducer;