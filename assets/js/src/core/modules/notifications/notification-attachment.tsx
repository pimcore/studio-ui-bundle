/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Alert, ElementTag, Flex, Icon, IconButton, SkeletonInput, Title } from '@sdk/components'
import { useElementApi, useElementHelper } from '@sdk/modules/element'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Notification } from './notifications-slice.gen'
import { useStyles } from './notifications.styles'

export interface NotificationAttachmentProps extends Notification {
  attachmentId: number
}

export const NotificationAttachment = ({ attachmentId, attachmentType }: NotificationAttachmentProps): React.JSX.Element | null => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { openElement } = useElementHelper()
  const { mapToElementType } = useElementHelper()
  const elementType = mapToElementType(attachmentType!) ?? undefined
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [element, setElement] = useState<any>(null)

  if (elementType === undefined) {
    return (
      <Alert
        type="error"
        description={t('user-menu.notification.type-not-supported')}
      />
    )
  }

  const { getElementById } = useElementApi(elementType)
  useEffect(() => {
    const fetchElement = async (): Promise<void> => {
      const result = await getElementById(attachmentId)
      setElement(result)
      setIsLoading(false)
    }

    void fetchElement()
  }, [attachmentId, getElementById])

  return (
    <>
      <Title
        icon={
          <Icon
            value={'attachment'}
          />
        }
        theme='secondary'
        weight='normal'
      >
        {t('user-menu.notification.attachments')}
      </Title>

      {isLoading ? (
        <SkeletonInput size="default" />
      ) : (
        <Flex
          align='center'
          className={styles.elementTag}
        >
          <ElementTag
            elementType={elementType}
            id={element.id}
            path={element.fullPath}
          />
          <IconButton
            icon={{ value: 'open-folder' }}
            onClick={async (e) => {
              e.stopPropagation()
              await openElement({
                type: elementType,
                id: element.id
              })
            }}
            theme='primary'
          />
        </Flex>
      )}


    </>

  )
}
