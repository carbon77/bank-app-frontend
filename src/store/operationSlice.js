import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiClient} from "../api";

export const createWithdrawOperationThunk = createAsyncThunk(
    "operations/withdraw",
    async ({ amount, accountId }) => {
        const response = await apiClient.createOperation({
            type: 'EXPENSE',
            amount,
            accountId,
            category: "Снятие",
        })
        return response.data
    }
)

export const createTopUpOperationThunk = createAsyncThunk(
    "operations/topup",
    async ({ amount, accountId }) => {
        const response = await apiClient.createOperation({
            type: 'RECEIPT',
            amount,
            accountId,
            category: 'Пополнение',
        })
        return response.data
    }
)

const initialState = {
    operations: null,
}

export const operationSlice = createSlice({
    name: 'operations',
    initialState,
    extraReducers: builder => {
        builder.addCase(createTopUpOperationThunk.rejected, (state, action) => {
            console.error(action.error)
            throw new Error(action.error.message)
        })

        builder.addCase(createWithdrawOperationThunk.rejected, (state, action) => {
            console.error(action.error)
            throw new Error(action.error.message)
        })
    },
})

export const operationsReducer = operationSlice.reducer