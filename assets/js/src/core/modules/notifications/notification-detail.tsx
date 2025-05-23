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
import { respectLineBreak } from '@Pimcore/utils/helpers'
import { Space } from '@Pimcore/components/space/space'
import { formatDateTime } from '@Pimcore/utils/date-time'
import { Text } from '@Pimcore/components/text/text'
import { Paragraph } from '@Pimcore/components/paragraph/paragraph'
import { Collapse } from '@Pimcore/components/collapse/collapse'
import { NotificationListItem } from './notifications-slice.gen'
import { useNotificationDetail } from './hooks/use-notification-detail'
import { Content } from '@Pimcore/components/content/content'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Flex, Icon, Split } from '@sdk/components'
import { useStyles } from './notifications.styles'
import { NotificationAttachment } from './notification-attachment'
import { useElementHelper } from '@sdk/modules/element'

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
  
    const { mapToElementType } = useElementHelper()

     const elementType = notificationDetail?.attachmentId
    ? mapToElementType(notificationDetail.attachmentType)
    : undefined;

  const { styles } = useStyles()

  const [notificationRead, setNotificationRead] = useState<boolean>(notification.read)
  
  useEffect(() => {
    if(notificationDetail !== undefined){
    setNotificationRead(notificationDetail?.read)
    }
  },[notificationDetail])
  
  const extra = (): React.JSX.Element => {

    return (
      <Space
        align='center'
        justify-content='center'
        size="extra-small"
      >
        {notification.hasAttachment && 
        <Icon 
        className={styles.margin}
        value={'attachment'}
        />
        }
        {notification.creationDate !== undefined && <span>{formatDateTime({ timestamp: notification.creationDate, dateStyle: 'short', timeStyle: 'medium' })}</span>}
        <IconButton
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
        <Flex vertical gap={0}>
        {notificationDetail !== undefined && typeof notificationDetail.message === 'string' && (<Paragraph>{respectLineBreak(notificationDetail.message)}</Paragraph>)}
        {notificationDetail?.attachmentId !== undefined && elementType !== undefined &&
        <NotificationAttachment
        attachmentId={notificationDetail.attachmentId}
        attachmentType={elementType}
        />}
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
    <Flex align={'center'} justify-content={'center'}>
        {notificationRead
        ? 
        <Icon
        className={styles.margin}
        value={'notification-read'}/>
        :
        <Icon 
        className={styles.unreadNotificationIcon}
        value={'notification-unread'}/>
        }
        <Split dividerSize="small" theme="secondary" size='extra-small'> 
            {notification.title !== '' && (<Text strong>{notification.title}</Text>)}
            <Text type='secondary'>{notification.sender}</Text>
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
    />
  )
}
