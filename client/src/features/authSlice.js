import { checkAuthService, loginUserService, logOutUserService, registerUserService } from "@/services/auth/AuthServices";
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logIn: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logOut: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUserService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUserService.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(registerUserService.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(loginUserService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUserService.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isAuthenticated = action.payload.success ? true : false;
                state.user = action.payload.success ? action.payload.user : null;
            })
            .addCase(loginUserService.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(checkAuthService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuthService.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isAuthenticated = action.payload.success ? true : false;
                state.user = action.payload.success ? action.payload.user : null;
            })
            .addCase(checkAuthService.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(logOutUserService.fulfilled, (state) => {

                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null
            });
    }

})

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
