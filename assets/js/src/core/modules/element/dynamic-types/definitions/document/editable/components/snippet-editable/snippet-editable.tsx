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
import { allElementTypes } from '@Pimcore/modules/element/utils/element-type'

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
  const isValidSnippetDocument = (info: DragAndDropInfo): boolean => {
    return info.type === 'document' && !isNil(info.data?.type) && String(info.data.type) === 'snippet'
  }

  const handleDrop = (info: DragAndDropInfo): void => {
    if (isValidSnippetDocument(info)) {
      const newValue: SnippetValue = {
        id: info.data.id,
        path: !isNil(info.data.fullPath) ? info.data.fullPath : info.data.path
      }
      onChange(newValue)
    }
  }

  return (
    <Droppable
      disableDndActiveIndicator
      isValidContext={ (info: DragAndDropInfo) => allElementTypes.includes(info.type) }
      isValidData={ isValidSnippetDocument }
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
