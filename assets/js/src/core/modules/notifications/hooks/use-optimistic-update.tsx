/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useAppDispatch } from '@Pimcore/app/store'
import { api, type NotificationGetCollectionApiArg, type NotificationGetCollectionApiResponse } from '../notifications-slice-enhanced'
import { isNil } from 'lodash'

interface UseOptimisticUpdateProps {
  updateNotificationReadStateById: (id: number, read: boolean) => void
  removeNotificationFromCollectionById: (id: number) => void
}

export const useOptimisticUpdate = (): UseOptimisticUpdateProps => {
  const dispatch = useAppDispatch()

  const updateNotificationReadStateById = (id: number, read: boolean): void => {
    // Access the store to get all cached queries for this endpoint
    dispatch((dispatch, getState) => {
      const state = getState()
      const queries = state.api?.queries ?? {}

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
          } catch { }
        }
      }
    })
  }

  const removeNotificationFromCollectionById = (id: number): void => {
    // Access the store to get all cached queries for this endpoint
    dispatch((dispatch, getState) => {
      const state = getState()
      const queries = state.api?.queries ?? {}

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
          } catch { }
        }
      }
    })
  }

  return {
    updateNotificationReadStateById,
    removeNotificationFromCollectionById
  }
}
