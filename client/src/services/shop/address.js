import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addShopUserAddress = createAsyncThunk("/addresses/addNewAddress",
    async (formData) => {
        const result = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/shop/address/add`,
            formData
        );
        return result?.data;
    }
)

export const fetchShopUserAddress = createAsyncThunk("/addresses/fetchUserAddress",
    async ({ userId }) => {
        // console.log(userId, "kdfjk")
        const result = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/shop/address/get/${userId}`
        );
        return result?.data;
    }
)

export const updateShopUserAddress = createAsyncThunk("/addresses/updateAddress",
    async ({ formData, userId, addressId }) => {
        const result = await axios.put(
            `${import.meta.env.VITE_API_URL}/api/shop/address/edit/${userId}/${addressId}`,
            formData
        );
        return result?.data;
    }
)


export const deleteShopUserAddress = createAsyncThunk("/addresses/deleteAddress",
    async ({ userId, addressId }) => {
        const result = await axios.delete(
            `${import.meta.env.VITE_API_URL}/api/shop/address/delete/${userId}/${addressId}`
        );
        return result?.data;
    }
)

