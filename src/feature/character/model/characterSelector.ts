import {StateSchema} from "app/store/config/stateSchema";


export const getCharacter = (state: StateSchema) => state.character
export const getPositions = (state: StateSchema) => state.character.positions
export const getAnimation = (state: StateSchema) => state.character.animation
export const getBag = (state: StateSchema) => state.character.bag
