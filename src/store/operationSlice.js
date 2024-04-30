import {createAsyncThunk, createSlice, isAnyOf, isRejected} from "@reduxjs/toolkit";
import {apiClient} from "../api";

export const createWithdrawOperationThunk = createAsyncThunk(
    "operations/withdraw",
    async ({amount, accountId}) => {
        return await apiClient.createOperation({
            type: 'EXPENSE',
            amount,
            accountId,
            category: "Снятие",
        })
    }
)

export const createTopUpOperationThunk = createAsyncThunk(
    "operations/topup",
    async ({amount, accountId}) => {
        return await apiClient.createOperation({
            type: 'RECEIPT',
            amount,
            accountId,
            category: 'Пополнение',
        })
    }
)

export const createTransferOperationThunk = createAsyncThunk(
    "operations/transfer",
    async ({data}) => {
        return await apiClient.createTransfer(data)
    }
)

export const getOperationsThunk = createAsyncThunk(
    "operations/get",
    async ({accountId = null}) => {
        return await apiClient.getOperations(accountId)
    }
)

const initialState = {
    operations: null,
}

export const operationSlice = createSlice({
    name: 'operations',
    initialState,
    reducers: {
        clearOperations(state) {
            state.operations = null
        }
    },
    extraReducers: builder => {
        builder.addCase(getOperationsThunk.fulfilled, (state, action) => {
            state.operations = action.payload
        })

        builder.addCase(getOperationsThunk.rejected, (state, action) => {
            console.error(action.error)
        })

        builder.addMatcher(
            isAnyOf(isRejected(createWithdrawOperationThunk), isRejected(createTopUpOperationThunk), isRejected(createTransferOperationThunk)),
            (state, action) => {
                console.error(action.error)
                throw Error(action.error)
            }
        )
    },
})

export const operationsReducer = operationSlice.reducer
export const {clearOperations} = operationSlice.actions