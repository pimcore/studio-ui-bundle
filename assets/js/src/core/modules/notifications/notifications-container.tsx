/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { useNotificationDeleteAllMutation, useNotificationGetCollectionQuery } from './notifications-slice-enhanced'
import { ApiError, trackError } from '@sdk/modules/app'
import { useFilterQuery } from '@Pimcore/components/filters'
import { DynamicTypeRegistryProvider } from '@Pimcore/modules/element/dynamic-types/registry/provider/dynamic-type-registry-provider'
import { NotificationsAppliedFiltersProvider, notificationsFilterAdapter, notificationsFilterDescriptors, useNotificationsAppliedFilters } from '@Pimcore/modules/notifications/filters/filters'
import { NotificationsView } from './notifications-view'

interface NotificationsContainerProps {
  activeNotification?: number
}

const NotificationsContent = ({ activeNotification }: NotificationsContainerProps): React.JSX.Element => {
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(20)

  const { values: appliedValues } = useNotificationsAppliedFilters()
  const buildFilterQuery = useFilterQuery(notificationsFilterAdapter, appliedValues)

  useEffect(() => {
    setPage(1)
  }, [appliedValues])

  const { columnFilters } = buildFilterQuery({})

  const queryArgs = {
    body: {
      filters: {
        page,
        pageSize,
        includeDescendants: true,
        sortFilter: {
          key: 'creationDate',
          direction: 'DESC'
        },
        columnFilters
      }
    }
  }

  const { data: notifications, isLoading, isFetching, isError, error } = useNotificationGetCollectionQuery(queryArgs, {
    refetchOnMountOrArgChange: true
  })

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
    <NotificationsView
      activeNotification={ activeNotification }
      deleteLoading={ deleteLoading }
      deleteNotificationsForUser={ deleteNotificationsForUser }
      isFetching={ isFetching }
      isLoading={ isLoading }
      notifications={ notifications }
      page={ page }
      setPage={ setPage }
      setPageSize={ setPageSize }
    />
  )
}

const NotificationsContainer = ({ activeNotification }: NotificationsContainerProps): React.JSX.Element => (
  <DynamicTypeRegistryProvider serviceIds={ ['DynamicTypes/FieldFilterRegistry'] }>
    <NotificationsAppliedFiltersProvider descriptors={ notificationsFilterDescriptors }>
      <NotificationsContent activeNotification={ activeNotification } />
    </NotificationsAppliedFiltersProvider>
  </DynamicTypeRegistryProvider>
)

export { NotificationsContainer }
