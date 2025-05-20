/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useState } from 'react'
import { type Notification, useNotificationGetByIdQuery } from '../notifications-slice.gen'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { skipToken } from '@reduxjs/toolkit/query'

interface UseNotificationsReturn {
  notificationDetail: Notification | undefined
  isLoading: boolean
  expandedNotificationId: number | undefined
  setExpandedNotificationId: (expandedId: number | undefined) => void
}

export const useNotificationDetail = (): UseNotificationsReturn => {
  const [expandedNotificationId, setExpandedNotificationId] = useState<number | undefined>(undefined)

  const { data: notificationDetail, isLoading, isError, error } = useNotificationGetByIdQuery(
    expandedNotificationId !== undefined ? { id: expandedNotificationId } : skipToken)

  useEffect(() => {
    if (isError) {
      trackError(new ApiError(error))
    }
  }, [isError])

  return {
    notificationDetail,
    isLoading,
    expandedNotificationId,
    setExpandedNotificationId
  }
}
