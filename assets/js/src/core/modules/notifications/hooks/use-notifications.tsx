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
import { type NotificationGetByIdApiArg, type Notification, type NotificationGetCollectionApiArg, type NotificationGetCollectionApiResponse, useNotificationGetByIdQuery, useNotificationGetCollectionQuery } from '../notifications-slice.gen'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'

interface UseNotificationsReturn {
  notifications: NotificationGetCollectionApiResponse | undefined
  notificationsAreLoading: boolean
  notificationDetail: Notification | undefined
  notificationDetailIsLoading: boolean
  page: number
  setPage: (page: number) => void
  pageSize: number
  setPageSize: (pageSize: number) => void
  expandedNotificationId: number
  setExpandedNotificationId: (expandedId: number) => void
}

export const useNotifications = (): UseNotificationsReturn => {
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(20)
  const [expandedNotificationId, setExpandedNotificationId] = useState<number>(0)

  const getCollectionQueryArgs: NotificationGetCollectionApiArg = useMemo(() => ({ body: { filters: { page, pageSize, includeDescendants: true } } }), [page, pageSize])
  const getNotificationDetailQueryArgs: NotificationGetByIdApiArg = useMemo(() => ({ id: expandedNotificationId }), [expandedNotificationId])

  const { data: notifications, isLoading: notificationsAreLoading, isError: getCollectionIsError, error: getCollectionError } = useNotificationGetCollectionQuery(getCollectionQueryArgs)
  const { data: notificationDetail, isLoading: notificationDetailIsLoading, isError: notificationDetailIsError, error: notificationDetailError } = useNotificationGetByIdQuery(getNotificationDetailQueryArgs)

  useEffect(() => {
    if (notificationDetailIsError) {
      trackError(new ApiError(notificationDetailError))
    }
  }, [notificationDetailIsError])

  useEffect(() => {
    if (getCollectionIsError) {
      trackError(new ApiError(getCollectionError))
    }
  }, [getCollectionIsError])

  return {
    notifications,
    notificationsAreLoading,
    notificationDetail,
    notificationDetailIsLoading,
    page,
    setPage,
    pageSize,
    setPageSize,
    expandedNotificationId,
    setExpandedNotificationId
  }
}
