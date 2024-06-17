import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./authSlice.ts";
import {accountsReducer} from "./accountSlice";
import {operationsReducer} from "./operationSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        accounts: accountsReducer,
        operations: operationsReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch