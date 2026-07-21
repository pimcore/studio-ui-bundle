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
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DynamicTypeNotificationRegistry } from './dynamic-types/registry/dynamic-type-notification-registry'
import { parseNotificationPayload } from './utils/notification-payload'

export interface NotificationDetailProps {
  notification: NotificationListItem
  activeNotification?: number
}

export const NotificationDetail = ({ notification, activeNotification }: NotificationDetailProps): React.JSX.Element => {
  const { styles } = useStyles()
  const [notificationRead, setNotificationRead] = useState<boolean>(notification.read)
  const {
    isExpanded,
    setIsExpanded,
    notificationDetail,
    detailLoading,
    deleteNotification,
    deleteLoading
  } = useNotificationDetail({ id: notification.id, activeNotification })

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
          loading={ deleteLoading }
          onClick={ async (e) => {
            e.stopPropagation()
            await deleteNotification()
          } }
          theme='primary'
          variant='minimal'
        />
      </Space>
    )
  }

  /** The notification's rendered attachment, or null when it has none. */
  const attachmentElement = (): React.JSX.Element | null =>
    isNil(notificationDetail?.attachmentId)
      ? null
      : (
        <NotificationAttachment
          { ...notificationDetail }
          attachmentId={ notificationDetail.attachmentId }
        />
        )

  /**
   * Content contributed by the notification's type, if any, plus whether the host should still
   * append the attachment below it. Types without a definition — and definitions that only render a
   * toast — return null and leave the plain rendering below in place, so this never has to be
   * exhaustive. The attachment is handed to the definition so it can place it itself.
   */
  const customDetail = (
    attachment: React.JSX.Element | null
  ): { content: React.JSX.Element, appendAttachment: boolean } | null => {
    const type = notification.type

    if (isNil(type) || type === '') {
      return null
    }

    const registry = container.get<DynamicTypeNotificationRegistry>(
      serviceIds['DynamicTypes/NotificationRegistry']
    )

    if (!registry.hasDynamicType(type)) {
      return null
    }

    const definition = registry.getDynamicType(type)
    const content = definition.getDetailContent(
      {
        type,
        title: notification.title,
        sender: notification.sender ?? null,
        message: notificationDetail?.message,
        payload: parseNotificationPayload(notificationDetail?.payload)
      },
      { attachment }
    )

    return content === null ? null : { content, appendAttachment: definition.appendsAttachment() }
  }

  const children = (): React.JSX.Element => {
    const attachment = attachmentElement()
    const custom = customDetail(attachment)

    return (
      <Content
        loading={ detailLoading }
        none={ custom === null && (notificationDetail === undefined || notificationDetail.message?.length === 0) }
      >
        <Flex
          gap={ 0 }
          vertical
        >
          {custom !== null
            ? (
              <>
                {custom.content}
                {custom.appendAttachment && attachment}
              </>
              )
            : (
              <>
                {notificationDetail !== undefined && typeof notificationDetail.message === 'string' && (<Paragraph>{respectLineBreak(notificationDetail.message)}</Paragraph>)}
                {attachment}
              </>
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
      {notification.sender !== '' && notification.sender !== null && (<Text>{notification.sender}</Text>)}
    </Split>
  </Flex>,
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
      size='small'
    />
  )
}
