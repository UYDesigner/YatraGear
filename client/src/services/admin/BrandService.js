import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addNewBrand = createAsyncThunk('admin/brands',
    async (formData) =>{
       const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/admin/add_new_brand`,
            formData,
            {
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            }
        );
        return response?.data;
    }
)

export const fetchAllBrandService = createAsyncThunk('admin/fetchAllBrands',
 async () => {

        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/admin/fetch_all_brands` 
        );
        return response?.data;

    }
)

export const deleteBrandService = createAsyncThunk('admin/deleteBrand',

    async ({brandId}) => {

        const response = await axios.delete(
            `${import.meta.env.VITE_API_URL}/api/admin/delete_brand/${brandId}` 
        );
        return response?.data;

    }
)
export const editBrandService = createAsyncThunk('admin/editBrand',

    async ({brandId, formData}) => {

        const response = await axios.put(
            `${import.meta.env.VITE_API_URL}/api/admin/edit_brand/${brandId}` ,
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
