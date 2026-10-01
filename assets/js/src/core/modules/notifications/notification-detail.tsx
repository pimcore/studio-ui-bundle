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
import React, { useEffect, useMemo, useState } from 'react'
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

  const notificationRegistry = useMemo(() => container.get<DynamicTypeNotificationRegistry>(
    serviceIds['DynamicTypes/NotificationRegistry']
  ), [])

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

  const attachmentElement = (): React.JSX.Element | null =>
    isNil(notificationDetail?.attachmentId)
      ? null
      : (
        <NotificationAttachment
          { ...notificationDetail }
          attachmentId={ notificationDetail.attachmentId }
        />
        )

  // Null whenever the type has no definition, or its definition renders only a toast — the plain
  // rendering below then stays in place.
  const customDetail = (
    attachment: React.JSX.Element | null
  ): { content: React.JSX.Element, appendAttachment: boolean } | null => {
    const type = notification.type

    if (isNil(type) || type === '' || !notificationRegistry.hasDynamicType(type)) {
      return null
    }

    const definition = notificationRegistry.getDynamicType(type)
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
