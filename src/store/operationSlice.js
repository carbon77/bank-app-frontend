import {createAsyncThunk, createSlice, isAnyOf, isRejected} from "@reduxjs/toolkit";
import operationService from "../api/operationService";

export const createOperationThunk = createAsyncThunk(
    "operations/create",
    async (operationData) => {
        return await operationService.createOperation(operationData)
    }
)

export const createWithdrawOperationThunk = createAsyncThunk(
    "operations/withdraw",
    async ({amount, accountId}) => {
        return await operationService.createOperation({
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
        return await operationService.createOperation({
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
        return await operationService.createTransfer(data)
    }
)

export const getOperationsThunk = createAsyncThunk(
    "operations/get",
    async ({
               accountIds = null,
               startDate = null,
               endDate = null,
               page = 0,
               size = 10,
               type = null,
           }) => {
        return await operationService.getOperations({
            accountIds,
            startDate,
            endDate,
            page,
            size,
            type,
        })
    }
)

export const getPaymentInfoThunk = createAsyncThunk(
    "operations/getPaymentInfo",
    async ({categoryName}) => {
        return await operationService.findPaymentInfo(categoryName)
    }
)

export const getOperationCategoriesThunk = createAsyncThunk(
    "operations/categories",
    async ({accountIds = null, startDate = null, endDate = null}) => {
        return await operationService.getOperationCategoryGroups({accountIds, startDate, endDate})
    }
)

export const getOperationsStatsByMonthsThunk = createAsyncThunk(
    "operations/stats/months",
    async ({accountIds = null, startDate = null, endDate = null}) => {
        return await operationService.getOperationStatsByMonths({accountIds, startDate, endDate})
    }
)

const initialState = {
    operations: null,
    paymentInfo: null,
    categoryGroups: null,
    operationStats: null,
}

export const operationSlice = createSlice({
    name: 'operations',
    initialState,
    reducers: {
        clearOperations(state) {
            state.operations = null
            state.paymentInfo = null
            state.categoryGroups = null
            state.operationStats = null
        }
    },
    extraReducers: builder => {
        builder.addCase(getOperationsStatsByMonthsThunk.fulfilled, (state, action) => {
            state.operationStats = action.payload
        })

        builder.addCase(getOperationCategoriesThunk.fulfilled, (state, action) => {
            state.categoryGroups = action.payload
        })

        builder.addCase(getPaymentInfoThunk.fulfilled, (state, action) => {
            state.paymentInfo = action.payload
        })

        builder.addCase(getOperationsThunk.fulfilled, (state, action) => {
            state.operations = action.payload
        })

        builder.addMatcher(
            isAnyOf(
                isRejected(createWithdrawOperationThunk),
                isRejected(createTopUpOperationThunk),
                isRejected(createTransferOperationThunk),
                isRejected(createOperationThunk),
                isRejected(getPaymentInfoThunk),
                isRejected(getOperationsThunk),
                isRejected(getOperationCategoriesThunk),
                isRejected(getOperationsStatsByMonthsThunk),
            ),
            (state, action) => {
                console.error(action.error)
                throw Error(action.error)
            }
        )
    },
})

export const operationsReducer = operationSlice.reducer
export const {clearOperations} = operationSlice.actions