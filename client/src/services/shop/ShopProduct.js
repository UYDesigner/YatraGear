import axios from "axios"

import { createAsyncThunk } from "@reduxjs/toolkit"


export const fetchAllFilteredProducts = createAsyncThunk("/products/fetchAllFilteredProducts",
    async ({filtersParams, sortParams})=>{

        const query = new URLSearchParams({
            ...filtersParams,
            sortby : sortParams
        })


        const result = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/shop/getProducts?${query}`
        )

        return result?.data
    }
)
export const fetchShopProducDetailById = createAsyncThunk(
  "/products/fetchShopProducDetailById",
  async (id) => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/getProduct/${id}` 
    );

    return result?.data;
  }
);
