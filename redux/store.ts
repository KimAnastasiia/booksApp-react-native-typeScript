import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./booksReducer";
import idTokenReducer from "./idTokenReducer";
import authReducer from "./authReducer";


export const store = configureStore({
    reducer: {
        books: booksReducer,
        idToken: idTokenReducer,
        auth: authReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch