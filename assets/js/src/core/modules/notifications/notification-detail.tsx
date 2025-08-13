/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Collapse } from '@Pimcore/components/collapse/collapse'
import { Content } from '@Pimcore/components/content/content'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Paragraph } from '@Pimcore/components/paragraph/paragraph'
import { Space } from '@Pimcore/components/space/space'
import { Text } from '@Pimcore/components/text/text'
import { formatDateTime } from '@Pimcore/utils/date-time'
import { respectLineBreak } from '@Pimcore/utils/helpers'
import { Flex, Icon, Split } from '@sdk/components'
import { isNil } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useNotificationDetail } from './hooks/use-notification-detail'
import { NotificationAttachment } from './notification-attachment'
import { type NotificationListItem } from './notifications-slice.gen'
import { useStyles } from './notifications.styles'

export interface NotificationDetailProps {
  notification: NotificationListItem
}

export const NotificationDetail = ({ notification }: NotificationDetailProps): React.JSX.Element => {
  const {
    isExpanded,
    setIsExpanded,
    notificationDetail,
    detailLoading,
    deleteNotification,
    deleteLoading
  } = useNotificationDetail({ id: notification.id })

  const { styles } = useStyles()

  const [notificationRead, setNotificationRead] = useState<boolean>(notification.read)

  useEffect(() => {
    if (notificationDetail !== undefined) {
      setNotificationRead(notificationDetail?.read)
    }
  }, [notificationDetail])

  const extra = (): React.JSX.Element => {
    return (
      <Space
        align='center'
        justify-content='center'
        size="extra-small"
      >
        {notification.hasAttachment && (
          <Icon
            className={ styles.margin }
            value={ 'attachment' }
          />
        )}
        {notification.creationDate !== undefined && <span>{formatDateTime({ timestamp: notification.creationDate, dateStyle: 'short', timeStyle: 'medium' })}</span>}
        <IconButton
          icon={ { value: 'trash' } }
          variant='minimal'
          loading={ deleteLoading }
          onClick={ async (e) => {
            e.stopPropagation()
            await deleteNotification()
          } }
          theme='primary'
        />
      </Space>
    )
  }

  const children = (): React.JSX.Element => {
    return (
      <Content
        loading={ detailLoading }
        none={ notificationDetail === undefined || notificationDetail.message?.length === 0 }
      >
        <Flex
          gap={ 0 }
          vertical
        >
          {notificationDetail !== undefined && typeof notificationDetail.message === 'string' && (<Paragraph>{respectLineBreak(notificationDetail.message)}</Paragraph>)}
          {!isNil(notificationDetail?.attachmentId) && (
            <NotificationAttachment
              { ...notificationDetail }
              attachmentId={ notificationDetail.attachmentId }
            />
          )}
        </Flex>
      </Content>
    )
  }

  const item: {
    key: string
    label: React.JSX.Element
    extra: React.JSX.Element
    children: React.JSX.Element
  } = {
    key: notification.id.toString(),
    label:
  <Flex
    align={ 'center' }
    justify-content={ 'center' }
  >
    {notificationRead
      ? (
        <Icon
          className={ [styles.margin, styles.grey].join(' ') }
          value={ 'notification-read' }
        />
        )
      : (
        <Icon
          className={ styles.unreadNotificationIcon }
          value={ 'notification-unread' }
        />
        )
        }
    <Split
      dividerSize="small"
      size='extra-small'
      theme="secondary"
    >
      {notification.title !== '' && (<Text strong>{notification.title}</Text>)}
      {notification.sender !== '' && notification.sender !== null && (<Text type='secondary'>{notification.sender}</Text>)}
    </Split>
  </Flex>,
    extra: extra(),
    children: children()
  }

  return (
    <Collapse
    size='small'
    activeKeys={
      isExpanded
      ? [notification.id.toString()]
      : []
    }
    items={ [item] }
    onChange={ (expandedKeys) => {
    if (expandedKeys.length > 0) {
      setIsExpanded(true)
    } else {
      setIsExpanded(false)
    }
  }}
    />
  )
}
