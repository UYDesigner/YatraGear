import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const addNewSubCategoryService = createAsyncThunk('admin/subcategories',

    async (formData) => {

        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/admin/add_new_sub_category`,
            formData,
            {
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            }
        );
        return response?.data;

    }
)

export const fetchAllSubCategoriesService = createAsyncThunk('admin/fetchAllSubCategories',

    async () => {

        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/admin/fetch_all_sub_categories` 
        );
        return response?.data;

    }
)

export const editSubCategoryService = createAsyncThunk('admin/editSubCategory',

    async ({subCategoryId, formData}) => {

        const response = await axios.put(
            `${import.meta.env.VITE_API_URL}/api/admin/edit_sub_category/${subCategoryId}` ,
            formData,
            {
                headers :{
                    "Content-Type" : "application/json"
                }
            }
        );
        return response?.data;

    }
)

export const deleteSubCategoryService = createAsyncThunk('admin/deleteCategory',

    async ({subCategoryId}) => {

        const response = await axios.delete(
            `${import.meta.env.VITE_API_URL}/api/admin/delete_sub_category/${subCategoryId}` 
        );
        return response?.data;

    }
)

export const fetchSubCategoryByIdService = createAsyncThunk('admin/deleteCategory',

    async ({subCategoryId}) => {

        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/admin/fetch_category_by_id/${subCategoryId}` 
        );
        return response?.data;

    }
)