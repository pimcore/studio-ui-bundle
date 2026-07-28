/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { configureStore } from '@reduxjs/toolkit'
import { renderHook } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { api, type AssetGetGridApiArg, type AssetGetGridApiResponse } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { type SelectedColumn } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'
import { type UpdateCacheResult } from '@Pimcore/modules/element/listing/decorators/inline-edit/inline-edit-decorator'
import { useInlineEditApiUpdate } from './use-inline-edit-api-update'

jest.mock('@sdk/app', () => ({
  useAppDispatch: () => jest.requireActual('react-redux').useDispatch()
}))

jest.mock('@Pimcore/app/config/app-config', () => ({
  appConfig: { apiPrefix: '' }
}))

describe('useInlineEditApiUpdate (asset)', () => {
  it('returns an undo handle from updateCache that reverts the optimistic grid update', async () => {
    const getGridArgs: AssetGetGridApiArg = { body: { folderId: 1 } }
    const columnToUpdate: SelectedColumn = {
      key: 'title',
      type: 'input',
      config: {},
      sortable: true,
      editable: true,
      localizable: true,
      locale: 'en'
    }
    const gridData: AssetGetGridApiResponse = {
      totalItems: 1,
      items: [
        {
          id: 5,
          columns: [{ key: 'title', locale: 'en', value: 'old value' }]
        }
      ]
    }

    const store = configureStore({
      reducer: { [api.reducerPath]: api.reducer },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
    })

    await store.dispatch(api.util.upsertQueryData('assetGetGrid', getGridArgs, gridData))

    const wrapper = ({ children }: { children: React.ReactNode }): React.JSX.Element => (
      <Provider store={ store }>{children}</Provider>
    )
    const { result } = renderHook(() => useInlineEditApiUpdate(), { wrapper })

    const getCachedValue = (): unknown => {
      const queryState = api.endpoints.assetGetGrid.select(getGridArgs)(store.getState())
      return queryState.data?.items[0].columns?.[0].value
    }

    const cacheUpdate: UpdateCacheResult | undefined = result.current.updateCache({
      getGetRequestArgs: getGridArgs,
      update: {
        id: 5,
        column: columnToUpdate,
        value: 'new value'
      }
    })

    expect(getCachedValue()).toBe('new value')

    expect(cacheUpdate).toBeDefined()
    cacheUpdate?.undo()

    expect(getCachedValue()).toBe('old value')
  })
})
