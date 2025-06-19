import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {IPosition} from "shared/types/types";

export interface CharacterSchema {
    positions: IPosition[] | [],
    animation: {
        duration: number,
    }
    posWithTake: IPosition | null
    bag: string
}

const initialState: CharacterSchema = {
    positions: [],
    animation: {
        duration: 1,
    },
    posWithTake: null ,
    bag: '',
}

const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {


        onChangePosition: (state, action: PayloadAction<IPosition[]>) => {
            state.positions = action.payload
            state.posWithTake = null
        },

        clearPositions: (state) => {
            state.positions = []
        },

        setBag: (state, action: PayloadAction<string>) => {
            state.bag = action.payload
        },

        setAnimationDuration: (state, action: PayloadAction<number>) => {
            state.animation.duration = action.payload
        },

        onChangePosWithTake: (state ,action: PayloadAction<IPosition>) => {
            state.posWithTake = action.payload
        }


    },
})

export const {
    onChangePosition,
    clearPositions,
    setBag,
    setAnimationDuration,
    onChangePosWithTake
} = characterSlice.actions
export default characterSlice.reducer