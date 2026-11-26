/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * Whether the store holds anything, which is what decides that a replacing import has to be warned
 * about. Every level of the store counts, and a count that did not answer counts as content.
 */

const groupCollection = jest.fn()
const keyCollection = jest.fn()
const collectionCollection = jest.fn()
const subGroupCollection = jest.fn()

jest.mock('@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced', () => ({
  useClassificationStoreConfigurationGroupCollectionQuery: (...args: unknown[]) => groupCollection(...args),
  useClassificationStoreConfigurationKeyCollectionQuery: (...args: unknown[]) => keyCollection(...args),
  useClassificationStoreConfigurationCollectionCollectionQuery: (...args: unknown[]) => collectionCollection(...args),
  useClassificationStoreConfigurationSubGroupCollectionQuery: (...args: unknown[]) => subGroupCollection(...args)
}))

// eslint-disable-next-line import/first
import { renderHook } from '@testing-library/react'
// eslint-disable-next-line import/first
import { useStoreHasContent } from './use-store-has-content'

const STORE_ID = 9

interface CountAnswer { data?: { totalItems: number } }
type CountQuery = (request: unknown, options?: { skip?: boolean }) => CountAnswer

const unanswered: CountAnswer = { data: undefined }

// what RTK Query itself answers: a skipped query holds no data
const counted = (totalItems: number): CountQuery =>
  (_request, options) => options?.skip === true ? unanswered : { data: { totalItems } }

const hasContent = (enabled?: boolean): boolean =>
  renderHook(() => useStoreHasContent(STORE_ID, enabled)).result.current

describe('useStoreHasContent', () => {
  beforeEach(() => {
    for (const query of [groupCollection, keyCollection, collectionCollection, subGroupCollection]) {
      query.mockReset()
      query.mockImplementation(counted(0))
    }
  })

  it('reports content for a store that holds nothing but sub groups', () => {
    subGroupCollection.mockImplementation(counted(2))

    expect(hasContent()).toBe(true)
  })

  it('reports content for a store holding groups, keys or collections', () => {
    keyCollection.mockImplementation(counted(5))

    expect(hasContent()).toBe(true)
  })

  it('reports no content for a store whose every level is empty', () => {
    expect(hasContent()).toBe(false)
  })

  it('assumes content while the sub group count has not answered', () => {
    subGroupCollection.mockReturnValue(unanswered)

    expect(hasContent()).toBe(true)
  })

  it('assumes content when the sub group count failed', () => {
    subGroupCollection.mockReturnValue({ data: undefined, isError: true })

    expect(hasContent()).toBe(true)
  })

  it('asks every level for one row only', () => {
    hasContent()

    for (const query of [groupCollection, keyCollection, collectionCollection, subGroupCollection]) {
      expect(query).toHaveBeenCalledWith(
        { storeId: STORE_ID, body: { filters: { page: 1, pageSize: 1 } } },
        { skip: false }
      )
    }
  })

  it('asks for no count at all where it is not enabled', () => {
    expect(hasContent(false)).toBe(true)

    for (const query of [groupCollection, keyCollection, collectionCollection, subGroupCollection]) {
      expect(query).toHaveBeenCalledWith(expect.anything(), { skip: true })
    }
  })
})
