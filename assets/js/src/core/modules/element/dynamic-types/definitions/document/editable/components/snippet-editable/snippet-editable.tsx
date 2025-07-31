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
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'
import { type DragAndDropInfo } from '@sdk/components'
import { SnippetContent } from './snippet-content'
import { isNil } from 'lodash'

export interface SnippetValue {
  id?: number
  path?: string
}

export interface SnippetEditableConfig {
  reload?: boolean
  width?: number
  height?: number
  defaultHeight?: number
  class?: string
  documentTypes?: string[]
}

export interface SnippetEditableProps {
  value?: SnippetValue
  config?: SnippetEditableConfig
  onChange: (value: SnippetValue | null) => void
  className?: string
}

export const SnippetEditable = ({
  value,
  config,
  onChange,
  className
}: SnippetEditableProps): React.JSX.Element => {
  const handleDrop = (info: DragAndDropInfo): void => {
    if (info.type === 'document' && !isNil(info.data?.type)) {
      const allowedTypes = config?.documentTypes ?? ['snippet']
      if (allowedTypes.includes(String(info.data.type))) {
        const newValue: SnippetValue = {
          id: info.data.id,
          path: !isNil(info.data.fullPath) ? info.data.fullPath : info.data.path
        }
        onChange(newValue)
      }
    }
  }

  return (
    <Droppable
      disableDndActiveIndicator
      isValidContext={ (info: DragAndDropInfo) => info.type === 'document' }
      isValidData={ (info: DragAndDropInfo) => {
        const allowedTypes = config?.documentTypes ?? ['snippet']
        return !isNil(info.data?.type) && allowedTypes.includes(String(info.data.type))
      } }
      onDrop={ handleDrop }
    >
      <SnippetContent
        className={ className }
        config={ config }
        onChange={ onChange }
        value={ value }
      />
    </Droppable>
  )
}
