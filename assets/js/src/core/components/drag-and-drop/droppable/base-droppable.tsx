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
import { useDropClassHandlers } from '../hooks/use-drop-class-handlers'

export interface BaseDroppableProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'outline'
  shape?: 'round' | 'angular'
  isValidContext: boolean | ((info: DragAndDropInfo) => boolean)
  isValidData?: ((info: DragAndDropInfo) => boolean)
  onDrop: (info: DragAndDropInfo) => void
  disableDndActiveIndicator?: boolean
  dropClass?: string
}

type DragState = 'inactive' | 'active' | 'valid' | 'error'

export const BaseDroppable = ({ children, className, variant, shape, isValidContext, isValidData, onDrop, disableDndActiveIndicator = false, dropClass }: BaseDroppableProps): React.JSX.Element | null => {
  const { styles } = useStyle()
  const [dragState, setDragState] = useState<DragState>('inactive')
  const isContextValid = useRef<boolean>(false)
  const isDataValid = useRef<boolean>(false)
  const dragInfoRef = useRef<DragAndDropInfo | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isInIframe = wrapperRef.current?.ownerDocument !== document
  const isVisible = useElementVisible(wrapperRef, true, disableDndActiveIndicator || isInIframe)

  const isInfoValid = (): boolean => {
    return !isNull(dragInfoRef.current) && isContextValid.current && isDataValid.current
  }

  const updateDragState = (state: DragState): void => {
    const finalState = disableDndActiveIndicator && state === 'active' ? 'inactive' : state
    setDragState(finalState)

    document.getElementById('studio-dnd-overlay')?.classList.toggle('dnd--invalid', finalState === 'error')
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

    if (isContextValid.current) {
      updateDragState('active')
    } else {
      updateDragState('inactive')
    }
  }

  useEffect(() => {
    if (isVisible) {
      const targetWindow = window.parent
      targetWindow.addEventListener('studioui:draggable:change-drag-info', handleChangeDragInfo)

      return () => {
        targetWindow.removeEventListener('studioui:draggable:change-drag-info', handleChangeDragInfo)
      }
    }
  }, [isVisible, isInIframe])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()

    if (isNull(dragInfoRef.current) || !isContextValid.current) {
      updateDragState('inactive')
      return
    }

    e.stopPropagation()

    updateDragState(isInfoValid() ? 'valid' : 'error')
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()

    if (isContextValid.current) {
      updateDragState(!isNull(dragInfoRef.current) ? 'active' : 'inactive')
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent): void => {
    e.preventDefault()
    updateDragState('inactive')
    if (isInfoValid()) {
      onDrop(dragInfoRef.current!)
    }
  }, [onDrop])

  useDropClassHandlers({
    dropClass,
    enabled: isVisible,
    onDragOver: handleDragOver,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop
  })

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
      <DroppableContextProvider value={ {
        isDragActive: dragState !== 'inactive',
        isOver: dragState !== 'inactive' && dragState !== 'active',
        isValid: dragState === 'valid',
        hasValidDrop: dragState === 'valid'
      } }
      >
        {children}
      </DroppableContextProvider>
    </div>
  ), [dragState, children, className, variant, shape, isVisible])
}
