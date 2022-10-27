import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'X-RapidAPI-Key': 'your key',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}
const baseUrl = 'https://coinranking1.p.rapidapi.com'

const creaRequest = (url) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: ({ point, count }) => creaRequest(`${point}${count}`)
        }),

        getCryptoHistory: builder.query({
            query: ({ uuid }) => creaRequest(`/coin/${uuid}/history/`)
        })

    }),

})
export const { useGetCryptosQuery, useGetCryptoHistoryQuery } = cryptoApi

