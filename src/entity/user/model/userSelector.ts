import {StateSchema} from "app/store/config/stateSchema";

export const getUser = (state: StateSchema) => state.user
export const getAuth = (state: StateSchema) => state.user.isAuth
