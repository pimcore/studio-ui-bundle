/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NotificationGetCollectionApiArg, useNotificationDeleteAllMutation, useNotificationGetCollectionQuery } from './notifications-slice-enhanced'
import { ApiError, trackError } from '@sdk/modules/app'
import { NotificationsView } from './notifications-view'

const NotificationsContainer = (): React.JSX.Element => {
  const { t } = useTranslation()

  const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState(20)
  
    const queryArgs: NotificationGetCollectionApiArg = useMemo(() => ({ body: { filters: { page, pageSize, includeDescendants: true } } }), [page, pageSize, page])
  
    const { data: notifications, isLoading, isFetching, isError, error } = useNotificationGetCollectionQuery(queryArgs)
  
    const [deleteNotificationsForUser, { isError: isDeleteError, error: deleteError, isLoading: deleteLoading }] = useNotificationDeleteAllMutation()
  
    useEffect(() => {
      if (isError) {
        trackError(new ApiError(error))
      }
    }, [isError])
  
    useEffect(() => {
      if (isDeleteError) {
        trackError(new ApiError(deleteError))
      }
    }, [isDeleteError])


  return (
    <NotificationsView notifications={notifications} isLoading={isLoading} isFetching={isFetching} deleteNotificationsForUser={deleteNotificationsForUser} deleteLoading={deleteLoading} page={page} setPage={setPage} setPageSize={setPageSize}/>
  )
}

export { NotificationsContainer }
