import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiClient} from "../api";

export const loginThunk = createAsyncThunk(
    'users/login',
    async ({email, password}, thunkApi) => {
        const data = await apiClient.login({email, password})
        return data.token
    }
)

const initialState = {
    authorizedUser: null
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(loginThunk.fulfilled, (state, action) => {
                console.info("User authorized")
                localStorage.setItem('auth_token', action.payload)
            })
            .addCase(loginThunk.rejected, (state, action) => {
                console.error("Rejected: " + action.error.message)
                throw new Error(action.error.message)
            })
    }
})

export const usersReducer = usersSlice.reducer