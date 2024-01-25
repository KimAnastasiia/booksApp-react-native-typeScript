// Part 1
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Book } from "../entities/book"

// Part 2
export interface bookInitialState {
    book: Book
}
const initialState: bookInitialState = {

    book: {    

        author: "",
        title: "",
        id: "",
        userId:""
    }
}

// Part 3
export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        setBook: (state, action: PayloadAction<Book>) => {
            state.book = action.payload
        }
    }
})

// Part 4
export const { setBook } = bookSlice.actions
export default bookSlice.reducer