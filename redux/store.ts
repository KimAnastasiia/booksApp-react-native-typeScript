import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./booksReducer";
import idTokenReducer from "./idTokenReducer";

export const store = configureStore({
    reducer: {
        books: booksReducer,
        idToken: idTokenReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch