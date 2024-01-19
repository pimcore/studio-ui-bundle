import { actions as exampleActions } from './store/example-slice'
import { useGetExampleQuery, endpoints as exampleEndpoints } from '@Pimcore/modules/example/api/example-endpoints'

export const actions = {
  ...exampleActions
}

export const hooks = {
  useGetExampleQuery
}

export const endpoints = {
  ...exampleEndpoints
}

export const publicAPI = {
  actions,
  hooks,
  endpoints
}
