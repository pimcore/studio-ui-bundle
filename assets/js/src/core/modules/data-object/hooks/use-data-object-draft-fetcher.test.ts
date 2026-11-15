/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const INITIATE_ACTION = { type: 'dataObjectGetById/initiate' }
const mockDataObjectData = { id: 42, key: 'my-object' }

const mockDispatch = jest.fn((action: unknown) => {
  if (action === INITIATE_ACTION) {
    return Promise.resolve({ data: mockDataObjectData, error: undefined })
  }

  return action
})

jest.mock('@sdk/app', () => ({
  injectSliceWithState: jest.fn(),
  useAppDispatch: () => mockDispatch
}))

jest.mock('../data-object-api-slice-enhanced', () => ({
  api: {
    endpoints: {
      dataObjectGetById: {
        initiate: jest.fn(() => INITIATE_ACTION)
      }
    }
  }
}))

// eslint-disable-next-line import/first
import { renderHook } from '@testing-library/react'
// eslint-disable-next-line import/first
import { useDataObjectDraftFetcher } from './use-data-object-draft-fetcher'
// eslint-disable-next-line import/first
import { dataObjectReceived, type DataObjectDraft } from '../data-object-draft-slice'

const expectMergedDataObject = (matcher: Partial<DataObjectDraft>): DataObjectDraft =>
  expect.objectContaining(matcher) as unknown as DataObjectDraft

describe('useDataObjectDraftFetcher', () => {
  beforeEach(() => {
    mockDispatch.mockClear()
  })

  it('defaults the active tab to null on a regular (non-preserving) fetch', async () => {
    const { result } = renderHook(() => useDataObjectDraftFetcher())

    await result.current.updateDataObjectDraft(42, true)

    expect(mockDispatch).toHaveBeenCalledWith(dataObjectReceived(expectMergedDataObject({
      id: 42,
      activeTab: null
    })))
  })

  it('preserves the previously active tab when refreshing', async () => {
    const { result } = renderHook(() => useDataObjectDraftFetcher())

    await result.current.updateDataObjectDraft(42, true, 'dependencies')

    expect(mockDispatch).toHaveBeenCalledWith(dataObjectReceived(expectMergedDataObject({
      id: 42,
      activeTab: 'dependencies'
    })))
  })

  it('falls back to null when the preserved active tab is explicitly null', async () => {
    const { result } = renderHook(() => useDataObjectDraftFetcher())

    await result.current.updateDataObjectDraft(42, true, null)

    expect(mockDispatch).toHaveBeenCalledWith(dataObjectReceived(expectMergedDataObject({
      id: 42,
      activeTab: null
    })))
  })
})
