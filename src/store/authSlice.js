import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiClient} from "../api";

export const loginThunk = createAsyncThunk(
    'router/login',
    async ({email, password}, thunkApi) => {
        const data = await apiClient.login({email, password})
        return data.jwtToken
    }
)

export const getUser = createAsyncThunk(
    'router/getUser',
    async (_, thunkAPI) => {
        apiClient.setToken()
        const data = await apiClient.getUser()
        return data
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

            .addCase(getUser.fulfilled, (state, action) => {
                state.authorizedUser = action.payload
            })
            .addCase(getUser.rejected, (state, action) => {
                console.error(action.error)
                throw new Error(action.error.message)
            })
    }
})

export const authReducer = authSlice.reducer

export const {logout} = authSlice.actions