import {combineReducers, configureStore} from '@reduxjs/toolkit'
import characterSlice from "feature/character/model/characterSlice";
import userSlice from "entity/user/model/userSlice";
import {historyApi} from "entity/history/model/historyApi";




const rootReducer = combineReducers({
    character: characterSlice,
    user: userSlice,
    [historyApi.reducerPath]: historyApi.reducer
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(historyApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;