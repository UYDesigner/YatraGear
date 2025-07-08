import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const addToCart = createAsyncThunk('cart/addToCart',

  async ({ userId, productId, quantity }) => {
    // console.log({ userId, productId, quantity })
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/cart/add`,
      {
        userId, productId, quantity
      }
    );

    return result?.data;
  }
)

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems',
  async ( userId ) => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/cart/get/${userId}`
    );

    return result?.data;
  }
)

export const updateCartItems = createAsyncThunk('cart/updateCartItems',
  async ({ userId, productId, quantity }) => {
    const result = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/shop/cart/update-cart`,
      {
        userId, productId, quantity
      }
    );

    return result?.data;
  }
)
export const deleteCartItems = createAsyncThunk('cart/deleteCartItems',
  async ({ userId, productId }) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/shop/cart/delete/${userId}/${productId}`
    );

    return result?.data;
  }
)