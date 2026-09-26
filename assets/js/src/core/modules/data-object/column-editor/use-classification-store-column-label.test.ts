/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const availableColumnsMock = jest.fn((_arg?: unknown) => ({
  data: {
    columns: [{
      key: 'technicalAttributes',
      type: 'dataobject.classificationstore',
      config: { fieldDefinition: { storeId: 1 } }
    }]
  }
}))

const keyGroupRelationsMock = jest.fn((_arg?: unknown) => ({
  data: { totalItems: 1, items: [{ groupId: 1, keyId: 2, keyName: 'height', groupName: 'Dimensions' }] }
}))

interface LayoutByKeyResult {
  data?: { id: number, name: string, description: string, definition: { title: string } }
  isFetching: boolean
  error?: { status: number }
}

const layoutByKeyMock = jest.fn((_arg?: unknown): LayoutByKeyResult => ({
  data: { id: 2, name: 'height', description: '', definition: { title: 'Height' } },
  isFetching: false,
  error: undefined
}))

jest.mock('@Pimcore/modules/data-object/data-object-api-slice-enhanced', () => ({
  api: {
    endpoints: {
      dataObjectGetAvailableGridColumns: { useQuery: (arg?: unknown) => availableColumnsMock(arg) }
    }
  }
}))

jest.mock('@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced', () => ({
  useClassificationStoreGetKeyGroupRelationsQuery: (arg?: unknown) => keyGroupRelationsMock(arg),
  useClassificationStoreGetLayoutByKeyQuery: (arg?: unknown) => layoutByKeyMock(arg)
}))

// eslint-disable-next-line import/first
import { renderHook } from '@testing-library/react'
// eslint-disable-next-line import/first
import { skipToken } from '@reduxjs/toolkit/query'
// eslint-disable-next-line import/first
import { useClassificationStoreColumnLabel } from './use-classification-store-column-label'

describe('useClassificationStoreColumnLabel', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('resolves the live "Group › Key" label for a classification store column', () => {
    const column = {
      key: 'technicalAttributes',
      type: 'dataobject.classificationstore',
      config: { groupId: 1, keyId: 2 }
    }

    const { result } = renderHook(() => useClassificationStoreColumnLabel(column, 'AP'))

    expect(result.current).toEqual({ label: 'Dimensions › Height', isLoading: false, isMissing: false })
  })

  it('falls back to the config snapshot label while the live title is still loading', () => {
    layoutByKeyMock.mockReturnValueOnce({ data: undefined, isFetching: true, error: undefined })
    const column = {
      key: 'technicalAttributes',
      type: 'dataobject.classificationstore',
      config: { groupId: 1, keyId: 2, fieldDefinition: { title: 'Height' }, groupName: 'Dimensions' }
    }

    const { result } = renderHook(() => useClassificationStoreColumnLabel(column, 'AP'))

    expect(result.current).toEqual({ label: 'Dimensions › Height', isLoading: true, isMissing: false })
  })

  it('reports isMissing once the key/group relation 404s, instead of a silent bare-id fallback', () => {
    layoutByKeyMock.mockReturnValueOnce({ data: undefined, isFetching: false, error: { status: 404 } })
    const column = {
      key: 'technicalAttributes',
      type: 'dataobject.classificationstore',
      config: { groupId: 1, keyId: 2 }
    }

    const { result } = renderHook(() => useClassificationStoreColumnLabel(column, 'AP'))

    expect(result.current).toEqual({ label: '#1.2', isLoading: false, isMissing: true })
  })

  it('does not treat a non-404 error (e.g. a transient network failure) as missing', () => {
    layoutByKeyMock.mockReturnValueOnce({ data: undefined, isFetching: false, error: { status: 500 } })
    const column = {
      key: 'technicalAttributes',
      type: 'dataobject.classificationstore',
      config: { groupId: 1, keyId: 2, fieldDefinition: { title: 'Height' }, groupName: 'Dimensions' }
    }

    const { result } = renderHook(() => useClassificationStoreColumnLabel(column, 'AP'))

    expect(result.current.isMissing).toBe(false)
  })

  it('leaves a non-classification-store column untouched, never calling the live lookups', () => {
    const column = { key: 'name', type: 'dataobject.adapter', config: {} }

    const { result } = renderHook(() => useClassificationStoreColumnLabel(column, 'AP'))

    expect(result.current).toEqual({ label: '', isLoading: false, isMissing: false })
    expect(keyGroupRelationsMock).toHaveBeenCalledWith(skipToken)
    expect(layoutByKeyMock).toHaveBeenCalledWith(skipToken)
  })
})
