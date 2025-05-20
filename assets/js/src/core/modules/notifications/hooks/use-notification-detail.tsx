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
import { type Notification, useNotificationDeleteByIdMutation, useNotificationGetByIdQuery } from '../notifications-slice.gen'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { skipToken } from '@reduxjs/toolkit/query'

interface UseNotificationsReturn {
  notificationDetail: Notification | undefined
  detailLoading: boolean
  expandedNotificationId: number | undefined
  setExpandedNotificationId: (expandedId: number | undefined) => void
  deleteNotification: (arg: { id: number }) => Promise<unknown>
  deleteLoading: boolean
}

export const useNotificationDetail = (): UseNotificationsReturn => {
  const [expandedNotificationId, setExpandedNotificationId] = useState<number | undefined>(undefined)

  const { data: notificationDetail, isLoading: detailLoading, isError: isDetailError, error: detailError } = useNotificationGetByIdQuery(
    expandedNotificationId !== undefined ? { id: expandedNotificationId } : skipToken)

  const [deleteNotification, { isError: isDeleteError, error: deleteError, isLoading: deleteLoading }] = useNotificationDeleteByIdMutation()

  useEffect(() => {
    if (isDetailError) {
      trackError(new ApiError(detailError))
    }
  }, [isDetailError])

  useEffect(() => {
    if (isDeleteError) {
      trackError(new ApiError(deleteError))
    }
  }, [isDeleteError])

  return {
    notificationDetail,
    detailLoading,
    expandedNotificationId,
    setExpandedNotificationId,
    deleteNotification,
    deleteLoading
  }
}
