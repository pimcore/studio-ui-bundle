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
import { type NotificationGetCollectionApiArg, type NotificationGetCollectionApiResponse, useNotificationGetCollectionQuery } from '../notifications-slice.gen'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'

interface UseNotificationsReturn {
  notifications: NotificationGetCollectionApiResponse | undefined
  isLoading: boolean
  page: number
  setPage: (page: number) => void
  pageSize: number
  setPageSize: (pageSize: number) => void
}

export const useNotifications = (): UseNotificationsReturn => {
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(20)

  const getCollectionQueryArgs: NotificationGetCollectionApiArg = useMemo(() => ({ body: { filters: { page, pageSize, includeDescendants: true } } }), [page, pageSize])

  const { data: notifications, isLoading, isError, error } = useNotificationGetCollectionQuery(getCollectionQueryArgs)

  useEffect(() => {
    if (isError) {
      trackError(new ApiError(error))
    }
  }, [isError])

  return {
    notifications,
    isLoading,
    page,
    setPage,
    pageSize,
    setPageSize
  }
}
