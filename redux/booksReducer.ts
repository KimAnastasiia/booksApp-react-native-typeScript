// Part 1
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Book } from "../entities/book"

// Part 2
export interface booksInitialState {
    books: Book[]
}
const initialState: booksInitialState = {
    books: []
}

// Part 3
export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setBooks: (state, action: PayloadAction<Book[]>) => {
            state.books = action.payload
        }
    }
})

// Part 4
export const { setBooks } = booksSlice.actions
export default booksSlice.reducer