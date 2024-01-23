// Part 1
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// Part 2
export interface authInitialState {
    auth: any
}
const initialState: authInitialState = {
    auth: {}
}

// Part 3
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<any>) => {
            state.auth = action.payload
        }
    }
})

// Part 4
export const { setAuth } = authSlice.actions
export default authSlice.reducer