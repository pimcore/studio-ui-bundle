/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useEffect, useMemo, useState } from 'react'
import { type NotificationGetCollectionApiArg, type NotificationListItem, useNotificationGetCollectionMutation } from '../notifications-slice.gen'
import { isNil } from 'lodash'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'

interface UseNotificationsReturn {
  getAllNotifications: () => Promise<void>
  totalItems: number
  notifications: NotificationListItem[]
  isLoading: boolean
  page: number
  setPage: (page: number) => void
  pageSize: number
  setPageSize: (pageSize: number) => void
}

export const useNotifications = (): UseNotificationsReturn => {
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(20)
  const [notifications, setNotifications] = useState<NotificationListItem[]>([])
  const [totalItems, setTotalItems] = useState<number>(0)

  const queryArgs: NotificationGetCollectionApiArg = useMemo(() => ({ body: { filters: { page, pageSize, includeDescendants: true } } }), [page, pageSize])

  const [requestNotifications, { isLoading }] = useNotificationGetCollectionMutation()

  const getAllNotifications = useCallback(async (): Promise<void> => {
    try {
      const response = await requestNotifications(queryArgs)
      if ('data' in response && !isNil(response.data)) {
        setTotalItems(response.data.totalItems)
        setNotifications(response.data.items)
      } else if ('error' in response && !isNil(response.error)) {
        trackError(new ApiError(response.error))
      }
    } catch (unexpectedError) {
      trackError(new GeneralError('Unexpected error fetching notifications'))
    }
  }, [requestNotifications, queryArgs])

  useEffect(() => {
    void getAllNotifications()
  }, [getAllNotifications])

  return {
    getAllNotifications,
    totalItems,
    notifications,
    isLoading,
    page,
    setPage,
    pageSize,
    setPageSize
  }
}
