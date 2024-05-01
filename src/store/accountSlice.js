import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiClient} from "../api";

export const getAccountsThunk = createAsyncThunk(
    '/accounts/get',
    async (_) => {
        return await apiClient.getAccounts()
    }
)

export const createAccountThunk = createAsyncThunk(
    '/accounts/create',
    async (accountData) => {
        return await apiClient.createAccount(accountData)
    }
)

export const createCardThunk = createAsyncThunk(
    '/accounts/cards/create',
    async ({accountId}) => {
        return await apiClient.createCard(accountId)
    }
)

export const deleteCardThunk = createAsyncThunk(
    '/accounts/cards/delete',
    async ({accountId, cardId}) => {
        return await apiClient.deleteCard(accountId, cardId)
    }
)

export const patchAccountThunk = createAsyncThunk(
    '/accounts/patch',
    async ({accountId, data}) => {
        return await apiClient.patchAccount({accountId, data})
    }
)

export const patchCardThunk = createAsyncThunk(
    '/accounts/cards/patch',
    async ({accountId, cardId, data}) => {
        return await apiClient.patchCard({accountId, cardId, data})
    }
)


const initialState = {
    accounts: null,
}

export const accountSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        clearAccounts(state) {
            state.accounts = null
        }
    },
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

        builder.addCase(createCardThunk.rejected, (state, action) => {
            console.error(action.error)
            throw new Error(action.error.message)
        })
    },
})

export const accountsReducer = accountSlice.reducer
export const {clearAccounts} = accountSlice.actions