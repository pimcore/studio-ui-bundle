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
import { ElementTag, Flex, IconButton } from '@sdk/components'
import { useElementApi, useElementHelper } from '@sdk/modules/element'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useStyles } from './notifications.styles'

export interface NotificationAttachmentProps {
  attachmentId: number
  attachmentType: ElementType
}

export const NotificationAttachment = ({ attachmentId, attachmentType }: NotificationAttachmentProps): React.JSX.Element | null => {
  const { styles } = useStyles()
  const { openElement } = useElementHelper()
  const { getElementById } = useElementApi(attachmentType)

  const [element, setElement] = useState<any>(null)

  useEffect(() => {
    const fetchElement = async (): Promise<void> => {
      try {
        const result = await getElementById(attachmentId)
        setElement(result)
      } catch (error) {
        console.error('Error fetching element:', error)
      }
    }

    void fetchElement()
  }, [attachmentId, getElementById])

  if (element?.fullPath === undefined) return null

  return (
    <Flex
      align='center'
      className={ styles.elementTag }
    >
      <ElementTag
        elementType={ attachmentType }
        id={ element.id }
        path={ element.fullPath }
      />
      <IconButton
        icon={ { value: 'open-folder' } }
        onClick={ async (e) => {
          e.stopPropagation()
          await openElement({
            type: attachmentType,
            id: element.id
          })
        } }
        theme='primary'
      />
    </Flex>
  )
}
