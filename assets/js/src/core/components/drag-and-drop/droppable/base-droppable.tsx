/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode, useMemo, useState, useRef, useCallback, useEffect } from 'react'
import cn from 'classnames'
import { useStyle } from './base-droppable.styles'
import { type DragAndDropInfo } from '../droppable'
import { isNull } from 'lodash'
import { DroppableContextProvider } from '../droppable-context-provider'
import useElementVisible from '@Pimcore/utils/hooks/use-element-visible'
import { type DragInfoChangeEvent } from '../draggable'

export interface BaseDroppableProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'outline'
  shape?: 'round' | 'angular'
  isValidContext: boolean | ((info: DragAndDropInfo) => boolean)
  isValidData?: ((info: DragAndDropInfo) => boolean)
  onDrop: (info: DragAndDropInfo) => void
  disableDndActiveIndicator?: boolean
}

type DragState = 'inactive' | 'active' | 'valid' | 'error'

export const BaseDroppable = ({ children, className, variant, shape, isValidContext, isValidData, onDrop, disableDndActiveIndicator = false }: BaseDroppableProps): React.JSX.Element | null => {
  const { styles } = useStyle()
  const [dragState, setDragState] = useState<DragState>('inactive')
  const isContextValid = useRef<boolean>(false)
  const isDataValid = useRef<boolean>(false)
  const dragInfoRef = useRef<DragAndDropInfo | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isVisible = useElementVisible(wrapperRef, true, disableDndActiveIndicator)

  const isInfoValid = (): boolean => {
    return !isNull(dragInfoRef.current) && isContextValid.current && isDataValid.current
  }

  const updateDragState = (state: DragState): void => {
    const finalState = disableDndActiveIndicator && state === 'active' ? 'inactive' : state
    setDragState(finalState)

    document.body.classList.toggle('dnd--invalid', finalState === 'error')
  }

  const handleChangeDragInfo = (event: DragInfoChangeEvent): void => {
    const info = event.detail
    dragInfoRef.current = info

    if (isNull(info)) {
      isContextValid.current = false
      isDataValid.current = false
      updateDragState('inactive')
      return
    }

    isContextValid.current = typeof isValidContext === 'function'
      ? isValidContext(info)
      : isValidContext

    isDataValid.current = isContextValid.current && (isValidData?.(info) ?? true)
    updateDragState('active')
  }

  useEffect(() => {
    if (isVisible) {
      window.addEventListener('studioui:draggable:change-drag-info', handleChangeDragInfo)

      return () => {
        window.removeEventListener('studioui:draggable:change-drag-info', handleChangeDragInfo)
      }
    }
  }, [isVisible])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()

    if (isNull(dragInfoRef.current)) {
      updateDragState('inactive')
      return
    }

    e.stopPropagation()

    updateDragState(isInfoValid() ? 'valid' : 'error')
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    updateDragState(!isNull(dragInfoRef.current) ? 'active' : 'inactive')
  }, [])

  const handleDrop = (e: React.DragEvent): void => {
    e.preventDefault()
    updateDragState('inactive')
    if (isInfoValid()) {
      onDrop(dragInfoRef.current!)
    }
  }

  return useMemo(() => (
    <div
      className={ cn(
        className,
        styles[variant ?? 'default'],
        shape !== 'angular' ? styles.round : undefined
      ) }
      onDragLeave={ isVisible ? handleDragLeave : undefined }
      onDragOver={ isVisible ? handleDragOver : undefined }
      onDrop={ isVisible ? handleDrop : undefined }
      ref={ wrapperRef }
      role="none"
    >
      <DroppableContextProvider value={ { isDragActive: dragState !== 'inactive', isOver: dragState !== 'inactive' && dragState !== 'active', isValid: dragState === 'valid' } }>
        {children}
      </DroppableContextProvider>
    </div>
  ), [dragState, children, className, variant, shape, isVisible])
}
