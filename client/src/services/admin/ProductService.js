import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const addNewProductService = createAsyncThunk('admin/product',

    async (formData) => {

        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/admin/add_new_product`,
            formData,
            {
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            }
        );
        return response?.data;

    }
)

export const fetchAllProductService = createAsyncThunk('admin/fetchAllProducts',

    async () => {

        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/admin/fetch_all_products` 
        );
        return response?.data;

    }
)

export const deleteProductService = createAsyncThunk('admin/deleteProduct',

    async ({productId}) => {

        const response = await axios.delete(
            `${import.meta.env.VITE_API_URL}/api/admin/delete_product/${productId}` 
        );
        return response?.data;

    }
)

export const editProductService = createAsyncThunk('admin/editProduct',

    async ({productId, formData}) => {

        const response = await axios.put(
            `${import.meta.env.VITE_API_URL}/api/admin/edit_product/${productId}` ,
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