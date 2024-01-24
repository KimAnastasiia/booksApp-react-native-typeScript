import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./booksReducer";
import idTokenReducer from "./idTokenReducer";
import authReducer from "./authReducer";
import myBooksReducer from "./myBooksReducer";


export const store = configureStore({
    reducer: {
        books: booksReducer,
        idToken: idTokenReducer,
        auth: authReducer,
        myBooks:myBooksReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch