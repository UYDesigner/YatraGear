import { getAllOrderService, getAllsubscribeUser, getOrderDetailByOrderIdService } from "@/services/admin/OrderService";
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    orderList: [],
    isLoading: false,
    orderDetails: null,
    serviceList: []
}

const AdminOrderSice = createSlice({
    name: "adminOrderSlice",
    initialState,
    reducers: {
        ressetOrderDetails: (state) => {
            state.orderDetails = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrderService.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllOrderService.fulfilled, (state, action) => {

                state.isLoading = false;
                state.orderList = action.payload.data || [];
            })
            .addCase(getAllOrderService.rejected, (state, action) => {
                state.isLoading = false;
                state.orderList = [];
                state.error = action.payload?.message || 'Failed to fetch orders';
            })

            // getOrderDetailByOrderId
            .addCase(getOrderDetailByOrderIdService.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getOrderDetailByOrderIdService.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderDetails = action.payload.data || null;
            })
            .addCase(getOrderDetailByOrderIdService.rejected, (state, action) => {
                state.isLoading = false;
                state.orderDetails = null;
                state.error = action.payload?.message || 'Failed to fetch order details';
            })
            .addCase(getAllsubscribeUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllsubscribeUser.fulfilled, (state, action) => {
                // console.log(action.payload, 'ppppppppppp')
                state.isLoading = false;
                state.serviceList = action.payload
            })
            .addCase(getAllsubscribeUser.rejected, (state, action) => {
                state.isLoading = false;
                state.serviceList = []
                state.error = action.payload?.message || 'Failed to fetch subscribedd user';
            });
    }

})
export const { ressetOrderDetails } = AdminOrderSice.actions;

export default AdminOrderSice.reducer;