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
import { RenderletContent } from './renderlet-content'
import { isNil } from 'lodash'
import { allElementTypes } from '@Pimcore/modules/element/utils/element-type'

export interface RenderletValue {
  id?: number
  type?: string
  subtype?: string
}

export interface RenderletEditableConfig {
  controller: string
  template?: string
  className?: string | string[]
  height?: number | string
  width?: number
  reload?: boolean
  title?: string
  type?: string
  class?: string
  [key: string]: any
}

export interface RenderletEditableProps {
  value?: RenderletValue
  config?: RenderletEditableConfig
  onChange: (value: RenderletValue | null) => void
  className?: string
}

export const RenderletEditable = ({
  value,
  config,
  onChange,
  className
}: RenderletEditableProps): React.JSX.Element => {
  const getConfigType = (dndType: string): string => {
    return dndType === 'data-object' ? 'object' : dndType
  }

  const handleDrop = (info: DragAndDropInfo): void => {
    if (!isNil(info.data?.id) && !isNil(info.data?.type)) {
      const configType = getConfigType(info.type)

      if (!isNil(config?.type) && config.type !== configType) {
        return
      }

      if (configType === 'object' && !isNil(config?.className)) {
        const allowedClasses = Array.isArray(config.className) ? config.className : [config.className]
        if (!allowedClasses.includes(String(info.data.className))) {
          return
        }
      }

      const newValue: RenderletValue = {
        id: info.data.id,
        type: configType,
        subtype: info.data.type ?? info.data.subtype
      }
      onChange(newValue)
    }
  }

  const isValidData = (info: DragAndDropInfo): boolean => {
    const configType = getConfigType(info.type)

    if (!isNil(config?.type) && config.type !== configType) {
      return false
    }

    if (configType === 'object' && !isNil(config?.className)) {
      const allowedClasses = Array.isArray(config.className) ? config.className : [config.className]
      return allowedClasses.includes(String(info.data?.className))
    }

    return !isNil(info.data?.id) && !isNil(info.data?.type)
  }

  return (
    <Droppable
      disableDndActiveIndicator
      isValidContext={ (info: DragAndDropInfo) => allElementTypes.includes(info.type) }
      isValidData={ isValidData }
      onDrop={ handleDrop }
    >
      <RenderletContent
        className={ className }
        config={ config }
        onChange={ onChange }
        value={ value }
      />
    </Droppable>
  )
}
