import {createAsyncThunk, createSlice, isAnyOf, isRejected} from "@reduxjs/toolkit";
import axios from "axios";
import fx from 'money'
import authService from "../api/authService";
import userService from "../api/userService";

export const loginThunk = createAsyncThunk(
    'auth/login',
    async ({email, password}, thunkApi) => {
        const {jwtToken: token} = await authService.login({email, password})
        localStorage.setItem('auth_token', token)
        return token
    }
)

export const registerThunk = createAsyncThunk(
    'auth/register',
    async (userData) => {
        return await authService.register(userData)
    }
)

export const fetchUserThunk = createAsyncThunk(
    'auth/user/fetch',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('auth_token')
            authService.setToken(token)
            return await userService.getUser()
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
        return await userService.patchUser(patchData)
    }
)

export const fetchCurrenciesThunk = createAsyncThunk(
    'auth/fetchCurrencies',
    async () => {
        return await axios.get('https://www.cbr-xml-daily.ru/latest.js').then(({data}) => {
            fx.rates = data.rates
            fx.base = data.base

            return Object.keys(data.rates)
        })
    }
)

export const changePasswordThunk = createAsyncThunk(
    'auth/user/changePassword',
    async ({password, newPassword}) => {
        return await userService.changePassword({password, newPassword})
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
            authService.removeToken()
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
                    isRejected(changePasswordThunk),
                ),
                (state, action) => {
                    throw action.error
                }
            )
    }
})

export const authReducer = authSlice.reducer

export const {logout, setError} = authSlice.actions