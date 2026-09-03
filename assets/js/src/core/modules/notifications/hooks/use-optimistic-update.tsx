/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AppDispatch, useAppDispatch } from '@Pimcore/app/store'
import { api, type NotificationGetCollectionApiArg, type NotificationGetCollectionApiResponse } from '../notifications-slice-enhanced'
import { isNil } from 'lodash'

interface UseOptimisticUpdateProps {
  updateNotificationReadStateById: (id: number, read: boolean) => void
  removeNotificationFromCollectionById: (id: number) => void
}

// Both unread bubbles read notificationGetUnreadCount, which the collection cache updates below
// never touch — without this the number would only ever go up.
const adjustUnreadCount = (dispatch: AppDispatch, delta: number): void => {
  dispatch(
    api.util.updateQueryData('notificationGetUnreadCount', undefined, (draft) => {
      draft.unreadNotificationsCount = Math.max(0, draft.unreadNotificationsCount + delta)
      return draft
    })
  )
}

// Read before the flag is flipped, which is what makes the decrement fire exactly once.
// Exported for testing.
export const isUnreadInCache = (
  queries: Record<string, unknown>,
  id: number
): boolean => {
  for (const [queryKey, queryState] of Object.entries(queries)) {
    if (
      !queryKey.startsWith('notificationGetCollection(') ||
      isNil(queryState) ||
      typeof queryState !== 'object' ||
      !('data' in queryState)
    ) {
      continue
    }

    const data = queryState.data as NotificationGetCollectionApiResponse | undefined
    const notification = data?.items?.find((note) => note.id === id)

    if (notification?.read === false) {
      return true
    }
  }

  return false
}

export const useOptimisticUpdate = (): UseOptimisticUpdateProps => {
  const dispatch = useAppDispatch()

  const updateNotificationReadStateById = (id: number, read: boolean): void => {
    // Access the store to get all cached queries for this endpoint
    dispatch((dispatch, getState) => {
      const state = getState()
      const queries = state.api?.queries ?? {}

      // Capture the transition before flipping the flag, so the count only moves when the
      // notification actually goes from unread to read.
      const wasUnread = isUnreadInCache(queries as Record<string, unknown>, id)

      // Find all notificationGetCollection queries in the cache
      for (const [queryKey, queryState] of Object.entries(queries as Record<string, unknown>)) {
        if (
          queryKey.startsWith('notificationGetCollection(') &&
          !isNil(queryState) &&
          typeof queryState === 'object' &&
          'originalArgs' in queryState &&
          !isNil(queryState.originalArgs)
        ) {
          try {
            dispatch(
              api.util.updateQueryData(
                'notificationGetCollection',
                queryState.originalArgs as NotificationGetCollectionApiArg,
                (draft): NotificationGetCollectionApiResponse => {
                  const notification = draft.items?.find((note) => note.id === id)
                  if (!isNil(notification)) {
                    notification.read = read
                  }
                  return draft
                }
              )
            )
          } catch (error) {
            // Best-effort cache update; a failure must not break the click, but shouldn't be silent.
            console.error('Optimistic notification cache update failed', error)
          }
        }
      }

      if (read && wasUnread) {
        adjustUnreadCount(dispatch, -1)
      }
    })
  }

  const removeNotificationFromCollectionById = (id: number): void => {
    // Access the store to get all cached queries for this endpoint
    dispatch((dispatch, getState) => {
      const state = getState()
      const queries = state.api?.queries ?? {}

      // Deleting an unread notification also removes it from the count; a read one has already
      // been subtracted when it was opened.
      const wasUnread = isUnreadInCache(queries as Record<string, unknown>, id)

      // Find all notificationGetCollection queries in the cache
      for (const [queryKey, queryState] of Object.entries(queries as Record<string, unknown>)) {
        if (
          queryKey.startsWith('notificationGetCollection(') &&
          !isNil(queryState) &&
          typeof queryState === 'object' &&
          'originalArgs' in queryState &&
          !isNil(queryState.originalArgs)
        ) {
          try {
            dispatch(
              api.util.updateQueryData(
                'notificationGetCollection',
                queryState.originalArgs as NotificationGetCollectionApiArg,
                (draft): NotificationGetCollectionApiResponse => {
                  draft.items = draft.items?.filter((note) => note.id !== id) ?? []
                  draft.totalItems = (draft.totalItems ?? 1) - 1
                  return draft
                }
              )
            )
          } catch (error) {
            // Best-effort cache update; a failure must not break the click, but shouldn't be silent.
            console.error('Optimistic notification cache update failed', error)
          }
        }
      }

      if (wasUnread) {
        adjustUnreadCount(dispatch, -1)
      }
    })
  }

  return {
    updateNotificationReadStateById,
    removeNotificationFromCollectionById
  }
}
