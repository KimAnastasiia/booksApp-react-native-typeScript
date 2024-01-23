// Part 1
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// Part 2
export interface idTokenInitialState {
    idToken: string
}
const initialState: idTokenInitialState = {
    idToken: ""
}

// Part 3
export const idTokenSlice = createSlice({
    name: 'idToken',
    initialState,
    reducers: {
        setIdToken: (state, action: PayloadAction<string>) => {
            state.idToken = action.payload
        }
    }
})

// Part 4
export const { setIdToken } = idTokenSlice.actions
export default idTokenSlice.reducer