/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Alert, ElementTag, Flex, Icon, IconButton, Title } from '@sdk/components'
import { useElementHelper } from '@sdk/modules/element'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { type Notification } from './notifications-slice.gen'
import { useStyles } from './notifications.styles'

export interface NotificationAttachmentProps extends Notification {
  attachmentId: number
}

export const NotificationAttachment = ({ attachmentId, attachmentType, attachmentFullPath }: NotificationAttachmentProps): React.JSX.Element | null => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { openElement } = useElementHelper()
  const { mapToElementType } = useElementHelper()
  const elementType = mapToElementType(attachmentType!) ?? undefined

  if (elementType === undefined) {
    return (
      <Alert
        description={ t('user-menu.notification.type-not-supported') }
        type="error"
      />
    )
  }

  return (
    <>
      <Title
        icon={
          <Icon
            value={ 'attachment' }
          />
        }
        theme='secondary'
        weight='normal'
      >
        {t('user-menu.notification.attachments')}
      </Title>

      <Flex
        align='center'
        className={ styles.elementTag }
      >
        <ElementTag
          elementType={ elementType }
          id={ attachmentId }
          path={ attachmentFullPath! }
        />
        <IconButton
          icon={ { value: 'open-folder' } }
          onClick={ async (e) => {
            e.stopPropagation()
            await openElement({
              type: elementType,
              id: attachmentId
            })
          } }
          theme='primary'
        />
      </Flex>
    </>

  )
}
