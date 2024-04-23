import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./authSlice";
import {accountsReducer} from "./accountSlice";
import {operationsReducer} from "./operationSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        accounts: accountsReducer,
        operations: operationsReducer,
    }
})