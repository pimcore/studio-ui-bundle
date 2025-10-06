import { useAppDispatch } from '@Pimcore/app/store'
import { api, NotificationGetCollectionApiResponse } from '../notifications-slice-enhanced'

interface UseOptimisticUpdateProps {
  updateNotificationReadStateById: (id: number, read: boolean) => void
}

export const useOptimisticUpdate = (): UseOptimisticUpdateProps => {
  const dispatch = useAppDispatch()

  const updateNotificationReadStateById = (id: number, read: boolean): void => {
    // Access the store to get all cached queries for this endpoint
    dispatch((dispatch, getState) => {
      const state = getState()
      const queries = state.api?.queries ?? {}

      // Find all notificationGetCollection queries in the cache
      Object.entries(queries).forEach(([queryKey, queryState]) => {
        if (
          queryKey.startsWith('notificationGetCollection(')
          && queryState
          && typeof queryState === 'object'
          && 'originalArgs' in queryState
        ) {
          try {
            dispatch(
              api.util.updateQueryData(
                'notificationGetCollection',
                (queryState as any).originalArgs,
                (draft): NotificationGetCollectionApiResponse => {
                  const notification = draft.items?.find((note) => note.id === id)
                  if (notification) {
                    notification.read = read
                  }
                  return draft
                }
              )
            )
          } catch {
          }
        }
      })
    })
  }

  return {
    updateNotificationReadStateById
  }
}