import {createAsyncThunk, createSlice, isAnyOf, isRejected} from "@reduxjs/toolkit";
import {apiClient} from "../api";
import axios from "axios";

export const loginThunk = createAsyncThunk(
    'auth/login',
    async ({email, password}, thunkApi) => {
        const { jwtToken: token } = await apiClient.login({email, password})
        localStorage.setItem('auth_token', token)
        return token
    }
)

export const registerThunk = createAsyncThunk(
    'auth/register',
    async (userData) => {
        return await apiClient.register(userData)
    }
)

export const fetchUserThunk = createAsyncThunk(
    'auth/user/fetch',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('auth_token')
            apiClient.setToken(token)
            // await new Promise(resolve => setTimeout(resolve, 2000))
            return await apiClient.getUser()
        } catch (e) {
            if (e.response.status === 400) {
                throw "Токен недействителен!"
            } else if (e.response.status === 410) {
                throw "Истекло время действия токена!"
            }
            throw e
        }
    }
)

export const patchUserThunk = createAsyncThunk(
    'auth/user/patch',
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
    error: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.token = null
            state.authorizedUser = null
            localStorage.removeItem('auth_token')
            apiClient.removeToken()
        },
        setError(state, action) {
            state.error = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.token = action.payload
            })

            .addCase(fetchUserThunk.fulfilled, (state, action) => {
                state.authorizedUser = action.payload
            })

            .addCase(fetchCurrenciesThunk.fulfilled, (state, action) => {
                state.currencies = action.payload
            })

            .addMatcher(
                isAnyOf(
                    isRejected(loginThunk),
                    isRejected(registerThunk),
                    isRejected(fetchUserThunk),
                    isRejected(patchUserThunk),
                    isRejected(fetchCurrenciesThunk),
                ),
                (state, action) => {
                    throw action.error
                }
            )
    }
})

export const authReducer = authSlice.reducer

export const {logout, setError} = authSlice.actions