// Part 1
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Book } from "../entities/book"

// Part 2
export interface myBooksInitialState {
    myBooks: Book[]
}
const initialState: myBooksInitialState = {
    myBooks: []
}

// Part 3
export const myBooksSlice = createSlice({
    name: 'myBooks',
    initialState,
    reducers: {
        setMyBooks: (state, action: PayloadAction<Book[]>) => {
            state.myBooks = action.payload
        }
    }
})

// Part 4
export const { setMyBooks } = myBooksSlice.actions
export default myBooksSlice.reducer