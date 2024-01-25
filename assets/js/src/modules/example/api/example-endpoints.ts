import { api } from '@Pimcore/app/api/pimcore'

const apiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getExample: builder.query({
      query: () => ({
        url: '/example',
        method: 'GET'
      })
    })
  })
})

export const { useGetExampleQuery, endpoints } = apiSlice
