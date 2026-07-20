/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { Title } from '@Pimcore/components/title/title'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Pagination } from '@Pimcore/components/pagination/pagination'
import { useTranslation } from 'react-i18next'
import { Content } from '@Pimcore/components/content/content'
import { Box } from '@Pimcore/components/box/box'
import { NotificationList } from './notification-list'
import { IconTextButton, Header } from '@sdk/components'
import { type NotificationGetCollectionApiResponse } from './notifications-slice.gen'
import { NotificationsSidebar } from './notifications-sidebar/notifications-sidebar'
import { SendNotificationModal } from './send-notification/send-notification-modal'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'

interface NotificationsViewProps {
  notifications: NotificationGetCollectionApiResponse | undefined
  isLoading: boolean
  isFetching: boolean
  deleteNotificationsForUser: () => void
  deleteLoading: boolean
  page: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
  activeNotification?: number
}

const NotificationsView = ({ notifications, isLoading, isFetching, deleteNotificationsForUser, deleteLoading, page, setPage, setPageSize, activeNotification }: NotificationsViewProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [sendModal, setSendModal] = useState<boolean>(false)

  return (
    <ContentLayout
      renderSidebar={ <NotificationsSidebar /> }
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
        <Header
          margin={ { bottom: 'extra-small' } }
          position='top'
        >
          <Title>{t('notifications.label')}</Title>
          {isAllowed(UserPermission.SendNotifications) && (
            <IconTextButton
              icon={ { value: 'send-03' } }
              onClick={ () => { setSendModal(true) } }
            >{t('user-menu.notification.send')}</IconTextButton>
          )}
        </Header>
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
          {notifications !== undefined && (
          <NotificationList
            activeNotification={ activeNotification }
            notifications={ notifications }
          />
          )}
        </Box>
      </Content>

      <SendNotificationModal
        onClose={ () => { setSendModal(false) } }
        open={ sendModal }
      />
    </ContentLayout>
  )
}

export { NotificationsView }
