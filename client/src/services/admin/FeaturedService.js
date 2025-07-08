import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addFeaturedImageService = createAsyncThunk('admin/addFeaturedImageService',

  async (image) => {


    // console.log(image)
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/add_featured_image`,
      image
    );
    return response?.data;

  }
)

export const getAllFeaturesImageService = createAsyncThunk('admin/getAll', async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/get_all_featured_image`);
  return res.data;
});

// export const updateFeatureImageService = createAsyncThunk('feature/update', async ({ id, updatedData }) => {
//   const res = await axios.put(`/api/admin/edit_featured_image/${id}`, updatedData);
//   return res.data;
// });

// export const deleteFeatureImageService = createAsyncThunk('feature/delete', async (id) => {
//   const res = await axios.delete(`/api/admin/delete_featured_image/${id}`);
//   return res.data;
// });
