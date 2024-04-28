import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiClient} from "../api";

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

const initialState = {
    authorizedUser: null,
    token: localStorage.getItem('auth_token'),
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
    }
})

export const authReducer = authSlice.reducer

export const {logout} = authSlice.actions