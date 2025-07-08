import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const addNewCategoryService = createAsyncThunk('admin/categories',

    async (formData) => {

        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/admin/add_new_category`,
            formData,
            {
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            }
        );
        return response?.data;

    }
)

export const fetchAllCategoriesService = createAsyncThunk('admin/fetchAllCategories',

    async () => {

        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/admin/fetch_all_categories` 
        );
        return response?.data;

    }
)

export const editCategoryService = createAsyncThunk('admin/editCategory',

    async ({categoryId, formData}) => {

        const response = await axios.put(
            `${import.meta.env.VITE_API_URL}/api/admin/edit_category/${categoryId}` ,
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

export const deleteCategoryService = createAsyncThunk('admin/deleteCategory',

    async ({categoryId}) => {

        const response = await axios.delete(
            `${import.meta.env.VITE_API_URL}/api/admin/delete_category/${categoryId}` 
        );
        return response?.data;

    }
)

export const fetchCategoryByIdService = createAsyncThunk('admin/deleteCategory',

    async ({categoryId}) => {

        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/admin/fetch_category_by_id/${categoryId}` 
        );
        return response?.data;

    }
)