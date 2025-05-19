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
import { useNotifications } from './hooks/use-notifications'
import { NotificationList } from './notification-list'

const NotificationsContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const {
    notifications,
    isLoading,
    page,
    setPage,
    setPageSize
  } = useNotifications()

  return (
    <ContentLayout
      renderToolbar={ notifications?.totalItems !== 0
        ? (
          <Toolbar
            justify='flex-end'
            theme='secondary'
          >
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
        loading={ isLoading }
        none={ notifications?.totalItems === 0 }
      >
        <Box
          margin={ {
            x: 'extra-small',
            y: 'none'
          } }
        >
          <NotificationList />
        </Box>
      </Content>
    </ContentLayout>
  )
}

export { NotificationsContainer }
