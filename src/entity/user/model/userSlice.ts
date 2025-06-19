import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserSchema {
    username: string,
    isAuth: boolean,
}

const initialState: UserSchema = {
    username: "",
    isAuth: false
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        onLogin: (state, action: PayloadAction<{username: string}>) => {
            state.username = action.payload.username
            state.isAuth = true
        }
    },
})

export const {
    onLogin
} = UserSlice.actions
export default UserSlice.reducer