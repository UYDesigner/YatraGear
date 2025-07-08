// services/shop/ShopOrders.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createNewOrder = createAsyncThunk(
  '/order/createNewOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shop/order/create-order`,
        orderData
      );
      return res?.data;
    } catch (error) {
      console.error('createNewOrder error:', error);
      return rejectWithValue(error.response?.data || { message: 'Server error' });
    }
  }
);

export const captureOrder = createAsyncThunk(
  '/order/captureOrder',
  async (orderID, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shop/order/capture-payment/${orderID}`
      );
      return res?.data;
    } catch (error) {
      console.error('captureOrder error:', error);
      return rejectWithValue(error.response?.data || { message: 'Server error' });
    }
  }
);

export const getAllOrdersByUserId = createAsyncThunk(
  '/order/getAllOrdersByUserId',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/order/get-all-orders-by-userid/${userId}`,
        
      );
      return res?.data;
    } catch (error) {
      console.error('getAllOrdersByUserId error:', error);
      return rejectWithValue(error.response?.data || { message: 'Server error' });
    }
  }
);

export const getOrderDetailByOrderId = createAsyncThunk(
  '/order/getOrderDetailByOrderId',
  async (orderID, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/order/get-order-detail-by-orderid/${orderID}`,
        
      );
      return res?.data;
    } catch (error) {
      console.error('getOrderDetailByOrderId error:', error);
      return rejectWithValue(error.response?.data || { message: 'Server error' });
    }
  }
);
