import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import { createApi } from '@reduxjs/toolkit/query/react';
import {IPosition} from "shared/types/types";

export interface HistoryResp {
    id: number,
    original: string,
    optimized: string,
    date: string,
    time: string,
    from: IPosition,
    to: IPosition
}

export const historyApi = createApi({
    reducerPath: 'historyApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/',
    }),
    tagTypes: ['History'],
    endpoints: (build) => ({
        getHistory: build.query<HistoryResp[], void>({
            query: () => ({
                url: `history`,
            }),
            providesTags: result => ["History"]
        }),
        addHistory: build.mutation<HistoryResp, HistoryResp>({
            query: (history) => ({
                url: `history`,
                method: "POST",
                body: history
            }),
            invalidatesTags: res =>  ["History"]
        }),
    }),
});



export const { useGetHistoryQuery, useAddHistoryMutation } = historyApi;
