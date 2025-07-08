import { createSlice } from "@reduxjs/toolkit";
import { 
  createNewOrder,
  getAllOrdersByUserId, 
  getOrderDetailByOrderId 
} from "@/services/shop/ShopOrders";

const initialState = {
  isLoading: false,
  approvalUrl: null,
  orderId: null,
  orderList: [],
  orderDetails: null,
  error: null
};

const orderSlice = createSlice({
  name: 'shopOrder',
  initialState,
  reducers: {
    ressetOrderDetails : (state)=>{
      state.orderDetails = null
    }
  },
  extraReducers: (builder) => {
    builder
      // createNewOrder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalUrl = action.payload.approvalUrl;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem("currentOrderId", JSON.stringify(action.payload.orderId));
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.approvalUrl = null;
        state.orderId = null;
        state.error = action.payload?.message || 'Failed to create order';
      })

      // getAllOrdersByUserId
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data || [];
      })
      .addCase(getAllOrdersByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.orderList = [];
        state.error = action.payload?.message || 'Failed to fetch orders';
      })

      // getOrderDetailByOrderId
      .addCase(getOrderDetailByOrderId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderDetailByOrderId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data || null;
      })
      .addCase(getOrderDetailByOrderId.rejected, (state, action) => {
        state.isLoading = false;
        state.orderDetails = null;
        state.error = action.payload?.message || 'Failed to fetch order details';
      });
  }
});

export const {ressetOrderDetails} = orderSlice.actions;
export default orderSlice.reducer;
