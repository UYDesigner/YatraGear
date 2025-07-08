import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const registerUserService = createAsyncThunk('/auth/register',

    async (formData) => {

        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/register`,
            formData,
            { withCredentials: true }
        );
        return response.data;

    }
)


export const loginUserService = createAsyncThunk('/auth/login',

    async (formData) => {

        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/login`,
            formData,
            { withCredentials: true }
        );
        return response.data;

    }
)

export const checkAuthService = createAsyncThunk('/auth/checkauth',

    async () => {

        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
            {
                withCredentials: true,
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    Expires: '0'
                }
            },

        );
        return response.data;

    }
)

export const logOutUserService = createAsyncThunk('/auth/logout',

    async () => {

        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/logout`,
            {},
            { withCredentials: true }
        );
        return response.data;

    }
)