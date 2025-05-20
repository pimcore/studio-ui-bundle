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

export interface UseNotificationDetailProps {
  id: number
}

interface UseNotificationsReturn {
  notificationDetail: Notification | undefined
  detailLoading: boolean
  isExpanded: boolean
  setIsExpanded: (isExpanded: boolean) => void
  deleteNotification: () => Promise<unknown>
  deleteLoading: boolean
}

export const useNotificationDetail = ({ id }: UseNotificationDetailProps): UseNotificationsReturn => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const { data: notificationDetail, isLoading: detailLoading, isError: isDetailError, error: detailError } = useNotificationGetByIdQuery(
    isExpanded ? { id } : skipToken)

  const [deleteNotification, { isError: isDeleteError, error: deleteError, isLoading: deleteLoading }] = useNotificationDeleteByIdMutation()

  const deleteNotificationDetail = async (): Promise<void> => {
    await deleteNotification({ id })
  }

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
    isExpanded,
    setIsExpanded,
    deleteNotification: deleteNotificationDetail,
    deleteLoading
  }
}
