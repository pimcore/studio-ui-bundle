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
import { type Notification, useNotificationDeleteByIdMutation, useNotificationGetByIdQuery } from '../notifications-slice-enhanced'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { skipToken } from '@reduxjs/toolkit/query'
import { useOptimisticUpdate } from './use-optimistic-update'
import { isNil } from 'lodash'

export interface UseNotificationDetailProps {
  id: number
  activeNotification?: number
}

interface UseNotificationsReturn {
  notificationDetail: Notification | undefined
  detailLoading: boolean
  isExpanded: boolean
  setIsExpanded: (isExpanded: boolean) => void
  deleteNotification: () => Promise<unknown>
  deleteLoading: boolean
}

export const useNotificationDetail = ({ id, activeNotification }: UseNotificationDetailProps): UseNotificationsReturn => {
  const [isExpanded, setIsExpanded] = useState<boolean>(id === activeNotification)
  const { updateNotificationReadStateById, removeNotificationFromCollectionById } = useOptimisticUpdate()
  const [deleteNotificationMutation, { isLoading: deleteLoading }] = useNotificationDeleteByIdMutation()

  const {
    data: notificationDetail,
    isLoading: detailLoading,
    isError: isDetailError,
    error: detailError
  } = useNotificationGetByIdQuery((isExpanded) ? { id } : skipToken)

  const deleteNotification = async (): Promise<void> => {
    const deleteTask = deleteNotificationMutation({ id })

    try {
      const response = await deleteTask

      if (response.error !== undefined) {
        trackError(new ApiError(response.error))
        return
      }

      removeNotificationFromCollectionById(id)
    } catch {
      trackError(new GeneralError('An error occurred while deleting the notification.'))
    }
  }

  useEffect(() => {
    if (!isNil(notificationDetail?.id)) {
      updateNotificationReadStateById(id, true)
    }
  }, [notificationDetail])

  useEffect(() => {
    if (isDetailError) {
      trackError(new ApiError(detailError))
    }
  }, [isDetailError])

  return {
    notificationDetail,
    detailLoading,
    isExpanded,
    setIsExpanded,
    deleteNotification,
    deleteLoading
  }
}
