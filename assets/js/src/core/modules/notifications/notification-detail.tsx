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
import { respectLineBreak } from '@Pimcore/utils/helpers'
import { Tag } from 'antd'
import { Space } from '@Pimcore/components/space/space'
import { formatDateTime } from '@Pimcore/utils/date-time'
import { Text } from '@Pimcore/components/text/text'
import { Split } from '@Pimcore/components/split/split'
import { Paragraph } from '@Pimcore/components/paragraph/paragraph'
import { Collapse } from '@Pimcore/components/collapse/collapse'
import { type Notification } from './notifications-slice.gen'
import { useNotificationDetail } from './hooks/use-notification-detail'
import { Content } from '@Pimcore/components/content/content'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import i18n from '@Pimcore/app/i18n'

export interface NotificationDetailProps {
  notification: Notification
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

  const extra = (): React.JSX.Element => {
    const hasAttachment = notification.hasAttachment ?? undefined

    return (
      <Space
        align='center'
        size="extra-small"
      >
        {hasAttachment !== undefined && <Tag>attachment</Tag>}
        {notification.creationDate !== undefined && <span>{formatDateTime({ timestamp: notification.creationDate, dateStyle: 'short', timeStyle: 'medium' })}</span>}
        <IconButton
          aria-label={ i18n.t('aria.notes-and-events.delete') }
          icon={ { value: 'trash' } }
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
        none={ notificationDetail === undefined || notificationDetail.message.length === 0 }
      >
        {notificationDetail !== undefined && typeof notificationDetail.message === 'string' &&
          (<Paragraph>{respectLineBreak(notificationDetail.message)}</Paragraph>)}
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
    label: <Split
      dividerSize='small'
      size='extra-small'
      theme='secondary'
           >
      {notification.title !== '' && (
        <>
          <Text
            strong
          >{notification.title}</Text>
        </>
      )}
      <Text type='secondary'>{notification.sender}</Text>
    </Split>,
    extra: extra(),
    children: children()
  }

  return (
    <Collapse
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
      } }
    />
  )
}
