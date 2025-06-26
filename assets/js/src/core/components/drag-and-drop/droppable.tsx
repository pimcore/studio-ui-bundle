/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode } from 'react'
import { BaseDroppable } from '@Pimcore/components/drag-and-drop/droppable/base-droppable'
import cn from 'classnames'
import { DroppableContextProvider } from './droppable-context-provider'
import { IconProps } from '@sdk/components'

export interface DroppableProps {
  className?: string
  children: ReactNode
  variant?: 'default' | 'outline'
  shape?: 'round' | 'angular'
  isValidContext: boolean | ((info: DragAndDropInfo) => boolean)
  isValidData?: ((info: DragAndDropInfo) => boolean)
  onDrop: (info: DragAndDropInfo) => void
  disabled?: boolean
}

export interface DragAndDropInfo {
  type: string
  icon: IconProps
  title: string
  data: any
  sortable?: any
}

export const Droppable = (props: DroppableProps): React.JSX.Element | null => {

  if (props.disabled === true) {
    return (
      <div className={ cn(props.className) }> 
        <DroppableContextProvider value={ { isDragActive: false, isOver: false, isValid: false } }>
          {props.children}
        </DroppableContextProvider>
      </div>
     )
  }

  return (
    <BaseDroppable
      className={ props.className }
      isValidContext={ props.isValidContext }
      isValidData={ props.isValidData }
      shape={ props.shape }
      variant={ props.variant }
      onDrop={ props.onDrop }
      disabled={ props.disabled }
    >
      { props.children }
    </BaseDroppable>
  )
}
