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
import { ElementTag } from '@sdk/components'
import { useElementApi } from '@sdk/modules/element'
import { ElementType, elementTypes } from '@Pimcore/types/enums/element/element-type'

export interface NotificationAttachmentProps {
  attachmentId: number
  attachmentType: string
}

export const NotificationAttachment = ({ attachmentId, attachmentType }: NotificationAttachmentProps): React.JSX.Element | null=> {
  const [element, setElement] = useState<any>(null)


  const getElementType = (): ElementType => {
    if (attachmentType === 'object') return elementTypes.dataObject
  else if (attachmentType === 'asset') return elementTypes.asset
else if (attachmentType === 'document') return elementTypes.document
else return 'asset'}

  const { getElementById } = useElementApi(getElementType())

  useEffect(() => {
    const fetchElement = async () => {
      try {
        const result = await getElementById(attachmentId)
        setElement(result)
      } catch (error) {
        console.error('Error fetching element:', error)
      }
    }

    fetchElement()
  }, [attachmentId, getElementById])
  
  console.log({element});
  
  if (!element?.fullPath) return null

  return (
    <ElementTag
      elementType={getElementType()}
      id={element.id}
      path={element.fullPath}
    />
  )
}
