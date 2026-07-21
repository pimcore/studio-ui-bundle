/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isUnreadInCache } from './use-optimistic-update'

// The heavy API-slice runtime is not needed for the guard, and importing it drags the whole
// store setup into the test — so it is mocked away. jest hoists these above the import.
jest.mock('../notifications-slice-enhanced', () => ({
  api: { util: { updateQueryData: jest.fn() } }
}))

jest.mock('@Pimcore/app/store', () => ({
  useAppDispatch: () => jest.fn()
}))

const collectionQuery = (items: Array<{ id: number, read: boolean }>): unknown => ({
  status: 'fulfilled',
  originalArgs: {},
  data: { items, totalItems: items.length }
})

describe('isUnreadInCache', () => {
  it('is true when the notification is unread in a cached collection', () => {
    const queries = {
      'notificationGetCollection({})': collectionQuery([{ id: 1, read: false }])
    }

    expect(isUnreadInCache(queries, 1)).toBe(true)
  })

  /**
   * Reading the state before the flag is flipped is what makes the decrement idempotent:
   * re-opening a notification that is already read must not move the count again.
   */
  it('is false when the notification is already read', () => {
    const queries = {
      'notificationGetCollection({})': collectionQuery([{ id: 1, read: true }])
    }

    expect(isUnreadInCache(queries, 1)).toBe(false)
  })

  it('is false when the notification is not cached at all', () => {
    const queries = {
      'notificationGetCollection({})': collectionQuery([{ id: 2, read: false }])
    }

    expect(isUnreadInCache(queries, 1)).toBe(false)
  })

  /**
   * The same notification can sit in several paginated caches; one still-unread copy is enough
   * to count it as unread.
   */
  it('is true when any cached collection still has it unread', () => {
    const queries = {
      'notificationGetCollection({"page":1})': collectionQuery([{ id: 1, read: true }]),
      'notificationGetCollection({"page":2})': collectionQuery([{ id: 1, read: false }])
    }

    expect(isUnreadInCache(queries, 1)).toBe(true)
  })

  it('ignores cache entries that have no data yet', () => {
    const queries = {
      'notificationGetCollection({})': { status: 'pending', originalArgs: {} },
      other: null
    }

    expect(isUnreadInCache(queries, 1)).toBe(false)
  })
})
