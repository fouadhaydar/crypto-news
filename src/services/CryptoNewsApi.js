import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const ApiHeader = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': 'your key',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
}
const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

const creaRequest = (url) => ({ url, headers: ApiHeader })

export const cryptoNews = createApi({
    reducerPath: 'cryptoNews',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({ query: (count) => creaRequest(`/news`) })
    })
})
export const { useGetCryptoNewsQuery } = cryptoNews