// Part 1
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// Part 2
export interface userIdInitialState {
    userId: string
}
const initialState: userIdInitialState = {
    userId: ""
}

// Part 3
export const userIdSlice = createSlice({
    name: 'userId',
    initialState,
    reducers: {
        setUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload
        }
    }
})

// Part 4
export const {setUserId} = userIdSlice.actions
export default userIdSlice.reducer