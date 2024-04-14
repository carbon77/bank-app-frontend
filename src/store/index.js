import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./authSlice";
import {accountsReducer} from "./accountSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        accounts: accountsReducer,
    }
})