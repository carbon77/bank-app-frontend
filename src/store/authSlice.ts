import {createAsyncThunk, createSlice, isAnyOf, isRejected} from "@reduxjs/toolkit";
import axios from "axios";
import userService from "../api/userService.ts";
import {User} from "../types/models";
import {ChangePasswordRequest} from "../types/api";


export const patchUserThunk = createAsyncThunk(
    'auth/user/patch',
    async (patchData) => {
        return await userService.patchUser(patchData)
    }
)

export const fetchCurrenciesThunk = createAsyncThunk<Record<string, number>>(
    'auth/fetchCurrencies',
    async () => {
        const response: Record<string, number> = await axios.get('https://www.cbr-xml-daily.ru/latest.js').then(({data}) => {
            return data.rates
        })
        return response
    }
)

export const changePasswordThunk = createAsyncThunk(
    'auth/user/changePassword',
    async (req: ChangePasswordRequest) => {
        return await userService.changePassword(req)
    }
)

const initialState: {
    authorizedUser?: User,
    currencies?: Record<string, number>
} = {
    authorizedUser: null,
    currencies: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            const newUser: User = {
                id: action.payload.id,
                email: action.payload.email,
                emailVerified: action.payload.emailVerified,
                phoneNumber: action.payload.attributes['phone_number'][0],
                passport: {
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    patronymic: action.payload.attributes['patronymic'][0],
                    series: action.payload.attributes['passport_series'][0],
                    number: action.payload.attributes['passport_number'][0],
                    departmentCode: action.payload.attributes['department_code'][0],
                    birthday: action.payload.attributes['birthday'][0],
                    issueDate: action.payload.attributes['issue_date'][0],
                }
            }
            state.authorizedUser = newUser
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCurrenciesThunk.fulfilled, (state, action) => {
                state.currencies = action.payload
            })

            .addMatcher(
                isAnyOf(
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

export const {setUser} = authSlice.actions