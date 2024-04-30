import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiClient} from "../api";
import axios from "axios";

export const loginThunk = createAsyncThunk(
    'auth/login',
    async ({email, password}, thunkApi) => {
        const data = await apiClient.login({email, password})
        return data.jwtToken
    }
)

export const registerThunk = createAsyncThunk(
    'auth/register',
    async (userData) => {
        return await apiClient.register(userData)
    }
)

export const getUserThunk = createAsyncThunk(
    'auth/getUser',
    async (_, thunkAPI) => {
        return await apiClient.getUser()
    }
)

export const patchUserThunk = createAsyncThunk(
    'auth/patchUser',
    async (patchData) => {
        return await apiClient.patchUser(patchData)
    }
)

export const fetchCurrenciesThunk = createAsyncThunk(
    'auth/fetchCurrencies',
    async () => {
        return await axios.get('https://api.freecurrencyapi.com/v1/latest?base_currency=RUB&apikey=fca_live_ko9CkmxeFyiT6rrXEE0BuIVDu9eqCHHQjCBwTKgI').then(res => {
            const rub = res.data.data['RUB']
            return Object.entries(res.data.data)
                .map(([currency, value]) => [currency, rub / value])
        })
    }
)

const initialState = {
    authorizedUser: null,
    token: localStorage.getItem('auth_token'),
    currencies: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.token = null
            state.authorizedUser = null
            apiClient.removeToken()
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginThunk.fulfilled, (state, action) => {
                console.info("User authorized")
                apiClient.setToken(action.payload)
                state.token = action.payload
            })
            .addCase(loginThunk.rejected, (state, action) => {
                console.error(action.error)
                throw new Error(action.error.message)
            })

            .addCase(registerThunk.fulfilled, (state, action) => {
                console.log("You have successfully signed up")
            })
            .addCase(registerThunk.rejected, (state, action) => {
                console.error(action.error)
                throw new Error(action.error.message)
            })

            .addCase(getUserThunk.fulfilled, (state, action) => {
                state.authorizedUser = action.payload
            })
            .addCase(getUserThunk.rejected, (state, action) => {
                console.error(action.error)
                throw new Error(action.error.message)
            })

            .addCase(fetchCurrenciesThunk.fulfilled, (state, action) => {
                state.currencies = action.payload
            })
            .addCase(fetchCurrenciesThunk.rejected, (state, action) => {
                console.error(action.error)
            })
    }
})

export const authReducer = authSlice.reducer

export const {logout} = authSlice.actions