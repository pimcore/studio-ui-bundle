/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createApi, fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { getPrefix } from './route'

const dynamicBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const prefix = getPrefix()
  const defaultBaseUrl = '/pimcore-studio/api'

  const replaceBaseUrl = (url: string): string =>
    url.startsWith(defaultBaseUrl)
      ? `${prefix}${url.slice(defaultBaseUrl.length)}`
      : url

  const adjustedArgs = typeof args === 'string'
    ? replaceBaseUrl(args)
    : { ...args, url: replaceBaseUrl(args.url) }

  return await fetchBaseQuery({ baseUrl: '/' })(adjustedArgs, api, extraOptions)
}

export type BaseQuery = typeof dynamicBaseQuery

export const api = createApi({
  baseQuery: dynamicBaseQuery,
  endpoints: () => ({})
})
