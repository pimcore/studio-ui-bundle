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
import { useNotifications } from './hooks/use-notifications'
import { type Notification } from './notifications-slice.gen'

export interface NotificationDetailProps {
  notification: Notification
}

export const NotificationDetail = ({notification}: NotificationDetailProps): Array<{
    key: string
    onClick: () => void
    label: React.JSX.Element
    extra: React.JSX.Element
    children: React.JSX.Element
  }> => {
  const {
    setExpandedNotificationId,
    notificationDetail
  } = useNotifications()

    const extra = (): React.JSX.Element => {
      const hasAttachment = notification.hasAttachment ?? undefined

      return (
        <Space
          align='center'
          size="extra-small"
        >
          {hasAttachment !== undefined && <Tag>attachment</Tag>}
          {notification.creationDate !== undefined && <span>{formatDateTime({ timestamp: notification.creationDate, dateStyle: 'short', timeStyle: 'medium' })}</span>}
        </Space>
      )
    }

    const children = (): React.JSX.Element => {
      return (
        <Paragraph>
          {notificationDetail !== undefined && typeof notificationDetail.message === 'string'
            ? respectLineBreak(notificationDetail.message)
            : ''}
        </Paragraph>
      )
    }

    return ({
      key: notification.id.toString(),
      onClick: () => { setExpandedNotificationId(notification.id) },
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
    })
  }