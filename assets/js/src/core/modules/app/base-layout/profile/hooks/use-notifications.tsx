/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useMemo, useState } from 'react'
import { NotificationGetCollectionApiArg, NotificationListItem, useNotificationGetCollectionMutation } from '../notifications-slice.gen'
import { isNil } from 'lodash'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'

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

  const queryArgs: NotificationGetCollectionApiArg = useMemo(() => ({ body: { filters: { page, pageSize, "includeDescendants": true } }}), [page, pageSize])

  const [requestNotifications, {isLoading, isSuccess, isError, error}] = useNotificationGetCollectionMutation()

  const getAllNotifications = async (): Promise<void> => {
      await requestNotifications(queryArgs).then((response) => {
        if (response?.data !== undefined) {
          setTotalItems(response.data.totalItems)
          setNotifications(response.data.items)
        }
      })
    }

  useEffect(() => {
    if (isError && !isNil(error)) {
      trackError(new ApiError(error))
    }
  }, [isError, error])

  return {
    getAllNotifications,
    totalItems: totalItems,
    notifications: notifications,
    isLoading,
    page,
    setPage,
    pageSize,
    setPageSize,
  }
}

