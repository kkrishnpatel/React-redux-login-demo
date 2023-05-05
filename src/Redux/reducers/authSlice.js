import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import methods from "../services/auth.service";
const token = localStorage.getItem("token");

const initialState = {
    isLoggedIn: token ? true : false,
    user: null,
    message: "",
    loading: false,
};

export const loginApi = createAsyncThunk(
    "user",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await methods.login(userData)
            return response.data;

        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

export const register = createAsyncThunk(
    "user",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await methods.register(userData)
            return response.data;

        } catch (e) {
            throw e
        }
    });

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                loading: false,
                message: ""
            }
        },
        clearMessage(state) {
            return {
                ...state,
                message: ""
            }
        }
    },
    extraReducers: {
        [loginApi.pending]: (state) => {
            return {
                ...state,
                loading: true,
                message: ""
            }
        },
        [loginApi.fulfilled]: (state, action) => {
            return {
                ...state,
                isLoggedIn: true,
                loading: false,
                payload: "",
                user: action.payload
            }
        },
        [loginApi.rejected]: (state, action) => {
            return {
                ...state,
                isLoggedIn: false,
                loading: false,
                message: action.payload.message
            }
        }
    }
});

export const { logout, clearMessage } = authSlice.actions;

export default authSlice.reducer;

