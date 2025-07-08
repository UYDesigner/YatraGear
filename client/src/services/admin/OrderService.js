import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllOrderService = createAsyncThunk('/admin/order/getAllOrderService',
    async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/admin/get-all-orders`,

            );
            return res?.data;
        } catch (error) {
            console.error('getAllOrdersAdmin error:', error);
            return rejectWithValue(error.response?.data || { message: 'Server error' });
        }
    }
)


export const getOrderDetailByOrderIdService = createAsyncThunk(
    'admin/order/getOrderDetailByOrderIdService',
    async (orderID, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/admin/get-order-detail-by-orderid/${orderID}`

            );
            return res?.data;
        } catch (error) {
            console.error('getOrderDetailByOrderId error:', error);
            return rejectWithValue(error.response?.data || { message: 'Server error' });
        }
    }
);


export const updateOrderStatusService = createAsyncThunk(
    'admin/order/updateOrderStatusService',
    async ({ orderID, status }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/admin/update-order-status`,
                { orderID, status }

            );
            return res?.data;
        } catch (error) {
            console.error('updateOrderStatusService error:', error);
            return rejectWithValue(error.response?.data || { message: 'Server error' });
        }
    }
);


// get all subscribed user

export const getAllsubscribeUser = createAsyncThunk('/admin/subscribeUser',
    async (_, { rejectWithValue }) => {
        try {
            const result = await axios.get(  
                `${import.meta.env.VITE_API_URL}/api/shop/service/get_all_service_email`
            );

            return result?.data;
        } catch (error) {
            console.error('get all subscription', error.response?.data);
            return rejectWithValue(error.response?.data?.message || { message: 'Server error' });
        }
    }
)

// /delete_service_email_by_userId/:id
export const deletesubscribeUser = createAsyncThunk('/admin/deletesubscribeUser',
    async (id, { rejectWithValue }) => {
        try {
            const result = await axios.delete(  
                `${import.meta.env.VITE_API_URL}/api/shop/service/delete_service_email_by_userId/${id}`
            );

            return result?.data;
        } catch (error) {
            console.error('delete subscription', error.response?.data);
            return rejectWithValue(error.response?.data?.message || { message: 'Server error' });
        }
    }
)