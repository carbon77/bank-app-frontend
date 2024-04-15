import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiClient} from "../api";

export const getAccountsThunk = createAsyncThunk(
    '/accounts/get',
    async (_, thunkAPI) => {
        return await apiClient.getAccounts()
    }
)

export const createAccountThunk = createAsyncThunk(
    '/accounts/create',
    async (accountData, thunkAPI) => {
        return await apiClient.createAccount(accountData)
    }
)

const initialState = {
    accounts: null,
}

export const accountSlice = createSlice({
    name: 'accounts',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAccountsThunk.fulfilled, (state, action) => {
            console.info("Getting accounts...")
            state.accounts = action.payload
        })

        builder.addCase(getAccountsThunk.rejected, (state, action) => {
            console.error(action.error)
            throw new Error(action.error.message)
        })

        builder.addCase(createAccountThunk.rejected, (state, action) => {
            console.error(action.error)
            throw new Error(action.error.message)
        })
    },
})

export const accountsReducer = accountSlice.reducer