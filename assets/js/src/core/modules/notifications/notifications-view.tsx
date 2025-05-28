/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { Title } from '@Pimcore/components/title/title'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Pagination } from '@Pimcore/components/pagination/pagination'
import { useTranslation } from 'react-i18next'
import { Content } from '@Pimcore/components/content/content'
import { Box } from '@Pimcore/components/box/box'
import { NotificationList } from './notification-list'
import { IconTextButton } from '@sdk/components'
import { NotificationGetCollectionApiResponse } from './notifications-slice.gen'

interface NotificationsViewProps {
  notifications: NotificationGetCollectionApiResponse | undefined
  isLoading: boolean
  isFetching: boolean
  deleteNotificationsForUser: () => void
  deleteLoading: boolean
  page: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
}

const NotificationsView = ({notifications, isLoading, isFetching, deleteNotificationsForUser, deleteLoading, page, setPage, setPageSize}: NotificationsViewProps): React.JSX.Element => {
  const { t } = useTranslation()

  console.log("notifications", notifications);
  
  return (
    <ContentLayout
      renderToolbar={ notifications?.totalItems !== 0
        ? (
          <Toolbar
            justify='space-between'
            theme='secondary'
          >
            <IconTextButton
              icon={ { value: 'trash' } }
              onClick={ () => { deleteNotificationsForUser() } }
            >{t('notifications.remove-all')}</IconTextButton>
            <Pagination
              current={ page }
              onChange={ (page, pageSize) => {
                setPage(page)
                setPageSize(pageSize)
              } }
              showSizeChanger
              showTotal={ (total) => t('pagination.show-total', { total }) }
              total={ notifications?.totalItems ?? 0 }
            />
          </Toolbar>
          )
        : undefined }
      renderTopBar={
        <Toolbar
          justify='space-between'
          margin={ {
            x: 'mini',
            y: 'none'
          }
                    }
          theme='secondary'
        >
          <Title>{t('notifications.label')}</Title>
        </Toolbar>
            }
    >
      <Content
        loading={ isLoading || isFetching || deleteLoading }
        none={ notifications === undefined || notifications.totalItems === 0 }
      >
        <Box
          margin={ {
            x: 'extra-small',
            y: 'none'
          } }
        >
          {notifications !== undefined && <NotificationList notifications={ notifications } />}
        </Box>
      </Content>
    </ContentLayout>
  )
}

export { NotificationsView }
