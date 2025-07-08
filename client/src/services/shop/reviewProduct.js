import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const addReviewOfShopProductService = createAsyncThunk('/shop/addReviewOfShopProduct',
    async ({ productId, userId, userName, reviewMessage, reviewValue }, { rejectWithValue }) => {
        try {
            const result = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/shop/reviews/add-review`,
                { productId, userId, userName, reviewMessage, reviewValue }

            );

            return result?.data;

        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Unknown error" });
        }

    }
)


export const getReviewOfShopProductService = createAsyncThunk('/shop/getReviewOfShopProduct',
    async (productId) => {

        // console.log(productId, "llllll")
        const result = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/shop/reviews/get-reviews/${productId}`
        );

        return result?.data;
    }
)

// subscribe user ---------------------- serive
export const subscribeUser = createAsyncThunk('/shop/subscribeUser',
    async ({ userId, email }, { rejectWithValue }) => {
        try {
            const result = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/shop/service/add_service_email`,
                {
                    userId, email
                }
            );

            return result?.data;
        } catch (error) {
            // console.error('subscription', error.response?.data );
            return rejectWithValue(error.response?.data?.message || { message: 'Server error' });
        }

    }
)

