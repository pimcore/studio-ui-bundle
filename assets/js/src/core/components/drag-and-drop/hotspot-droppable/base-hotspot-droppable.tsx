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
import { useStyle } from '../droppable/base-droppable.styles'
import { type DragAndDropInfo } from '../droppable'
import { type HotspotArea, type HotspotPosition } from '../hotspot-droppable'
import { isNull, isString, isNil } from 'lodash'
import { DroppableContextProvider } from '../droppable-context-provider'
import useElementVisible from '@Pimcore/utils/hooks/use-element-visible'
import { type DragInfoChangeEvent } from '../draggable'

export interface BaseHotspotDroppableProps {
  children: ReactNode
  className?: string
  hotspots: HotspotArea[]
  disableDndActiveIndicator?: boolean
}

type DragState = 'inactive' | 'active' | 'valid' | 'error'

interface HotspotState {
  dragState: DragState
  isContextValid: boolean
  isDataValid: boolean
}

const formatPositionValue = (value: number | string): string => {
  if (isString(value)) {
    return value
  }
  // If it's a number between 0-100, treat as percentage, otherwise as pixels
  return value <= 100 ? `${value}%` : `${value}px`
}

const getHotspotStyles = (position: HotspotPosition): React.CSSProperties => {
  return {
    position: 'absolute',
    left: formatPositionValue(position.x),
    top: formatPositionValue(position.y),
    width: position.width ? formatPositionValue(position.width) : '20px',
    height: position.height ? formatPositionValue(position.height) : '20px'
  }
}

export const BaseHotspotDroppable = ({ children, className, hotspots, disableDndActiveIndicator = false }: BaseHotspotDroppableProps): React.JSX.Element | null => {
  const [hotspotStates, setHotspotStates] = useState<Record<string, HotspotState>>(() => 
    hotspots.reduce((acc, hotspot) => ({
      ...acc,
      [hotspot.id]: {
        dragState: 'inactive',
        isContextValid: false,
        isDataValid: false
      }
    }), {})
  )
  const [hasValidDrop, setHasValidDrop] = useState<boolean>(false)
  const [isDragHappening, setIsDragHappening] = useState<boolean>(false)
  const [isValidDragOver, setIsValidDragOver] = useState<boolean>(false)
  const dragInfoRef = useRef<DragAndDropInfo | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const hotspotRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const isInIframe = wrapperRef.current?.ownerDocument !== document
  const isVisible = useElementVisible(wrapperRef, true, disableDndActiveIndicator || isInIframe)

  const isInfoValidForHotspot = useCallback((hotspotId: string): boolean => {
    const state = hotspotStates[hotspotId]
    return !isNull(dragInfoRef.current) && state?.isContextValid && state?.isDataValid
  }, [hotspotStates])

  const updateHotspotDragState = useCallback((hotspotId: string, state: DragState): void => {
    const finalState = disableDndActiveIndicator && state === 'active' ? 'inactive' : state
    setHotspotStates(prev => ({
      ...prev,
      [hotspotId]: {
        ...prev[hotspotId],
        dragState: finalState
      }
    }))

    document.body.classList.toggle('dnd--invalid', finalState === 'error')
  }, [disableDndActiveIndicator])

  // Update global valid drop state whenever hotspot states change
  useEffect(() => {
    const hasAnyValidDrop = Object.values(hotspotStates).some(state => state.dragState === 'valid')
    const hasAnyValidOver = Object.values(hotspotStates).some(state => state.dragState === 'valid')
    
    setHasValidDrop(hasAnyValidDrop)
    setIsValidDragOver(hasAnyValidOver)
    document.body.classList.toggle('dnd--has-valid-drop', hasAnyValidDrop)
  }, [hotspotStates])

  const updateAllHotspotStates = useCallback((info: DragAndDropInfo | null): void => {
    if (isNull(info)) {
      setIsDragHappening(false)
      setIsValidDragOver(false)
      setHotspotStates(prev => 
        Object.keys(prev).reduce((acc, hotspotId) => ({
          ...acc,
          [hotspotId]: {
            ...prev[hotspotId],
            dragState: 'inactive',
            isContextValid: false,
            isDataValid: false
          }
        }), {})
      )
      // Clear global drag state classes when drag ends
      setHasValidDrop(false)
      document.body.classList.remove('dnd--has-valid-drop')
      return
    }

    setIsDragHappening(true)
    
    setHotspotStates(prev => {
      const newStates = { ...prev }
      
      hotspots.forEach(hotspot => {
        const isContextValid = typeof hotspot.isValidContext === 'function'
          ? hotspot.isValidContext(info)
          : hotspot.isValidContext

        const isDataValid = isContextValid && (hotspot.isValidData?.(info) ?? true)

        newStates[hotspot.id] = {
          ...prev[hotspot.id],
          isContextValid,
          isDataValid,
          dragState: isContextValid ? 'active' : 'inactive'
        }
      })

      return newStates
    })
  }, [hotspots])

  const handleChangeDragInfo = useCallback((event: DragInfoChangeEvent): void => {
    const info = event.detail
    dragInfoRef.current = info
    updateAllHotspotStates(info)
  }, [updateAllHotspotStates])

  useEffect(() => {
    if (isVisible) {
      const targetWindow = window.parent
      targetWindow.addEventListener('studioui:draggable:change-drag-info', handleChangeDragInfo)

      return () => {
        targetWindow.removeEventListener('studioui:draggable:change-drag-info', handleChangeDragInfo)
      }
    }
  }, [isVisible, isInIframe])

  const createHotspotHandlers = useCallback((hotspot: HotspotArea) => {
    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault()

      if (isNull(dragInfoRef.current) || !hotspotStates[hotspot.id]?.isContextValid) {
        updateHotspotDragState(hotspot.id, 'inactive')
        return
      }

      e.stopPropagation()
      const isValid = isInfoValidForHotspot(hotspot.id)
      updateHotspotDragState(hotspot.id, isValid ? 'valid' : 'error')
    }

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault()

      if (hotspotStates[hotspot.id]?.isContextValid) {
        updateHotspotDragState(hotspot.id, !isNull(dragInfoRef.current) ? 'active' : 'inactive')
      }
    }

    const handleDrop = (e: React.DragEvent): void => {
      e.preventDefault()
      updateHotspotDragState(hotspot.id, 'inactive')
      if (isInfoValidForHotspot(hotspot.id)) {
        hotspot.onDrop(dragInfoRef.current!)
      }
    }

    return { handleDragOver, handleDragLeave, handleDrop }
  }, [hotspotStates, updateHotspotDragState, isInfoValidForHotspot])

  // Create a memoized array of handlers for all hotspots
  const hotspotHandlers = useMemo(() => {
    return hotspots.map(hotspot => ({
      hotspot,
      handlers: createHotspotHandlers(hotspot)
    }))
  }, [hotspots, createHotspotHandlers])

  // Set up drop class handlers for each hotspot - but we need to do this differently
  // to avoid calling hooks in a loop. Instead, we'll handle all drop classes in a single effect.
  useEffect(() => {
    if (!isVisible) {
      return
    }

    const cleanupFunctions: Array<() => void> = []

    hotspotHandlers.forEach(({ hotspot, handlers }) => {
      if (isNil(hotspot.dropClass)) {
        return
      }

      const elements = Array.from(document.querySelectorAll(`.${hotspot.dropClass}`))
      
      const mockEvent: React.DragEvent = { preventDefault: () => {}, stopPropagation: () => {} } as any as React.DragEvent

      const handleDragOver = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        handlers.handleDragOver(mockEvent)
      }

      const handleDragLeave = (e: DragEvent) => {
        e.preventDefault()
        handlers.handleDragLeave(mockEvent)
      }

      const handleDrop = (e: DragEvent) => {
        e.preventDefault()
        handlers.handleDrop(mockEvent)
      }

      elements.forEach((element) => {
        element.addEventListener('dragover', handleDragOver)
        element.addEventListener('dragleave', handleDragLeave)
        element.addEventListener('drop', handleDrop)
      })

      cleanupFunctions.push(() => {
        elements.forEach((element) => {
          element.removeEventListener('dragover', handleDragOver)
          element.removeEventListener('dragleave', handleDragLeave)
          element.removeEventListener('drop', handleDrop)
        })
      })
    })

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup())
    }
  }, [hotspotHandlers, isVisible])

  // Calculate aggregate state for main wrapper CSS classes
  const aggregateState = useMemo(() => {
    if (!isDragHappening) return 'inactive'
    
    const states = Object.values(hotspotStates)
    const hasValidHotspot = states.some(state => state.dragState === 'valid')
    const hasActiveHotspot = states.some(state => state.dragState === 'active')
    const hasErrorHotspot = states.some(state => state.dragState === 'error')
    
    // Priority: valid > error > active > inactive
    if (hasValidHotspot) return 'valid'
    if (hasErrorHotspot) return 'error'
    if (hasActiveHotspot) return 'active'
    return 'inactive'
  }, [isDragHappening, hotspotStates])

  // Generate CSS classes for individual hotspot states
  const hotspotSpecificClasses = useMemo(() => {
    const classes: string[] = []
    
    Object.entries(hotspotStates).forEach(([hotspotId, state]) => {
      if (state.dragState !== 'inactive') {
        // Add CSS class for specific hotspot state: e.g., 'dnd--hotspot-zone1-active'
        classes.push(`dnd--hotspot-${hotspotId}-${state.dragState}`)
      }
    })
    
    return classes
  }, [hotspotStates])

  return useMemo(() => (
    <div
      className={ cn(className,
        'hotspot-droppable', {
        'hotspot-droppable--valid-over': isValidDragOver,
        'dnd--drag-active': aggregateState === 'active',
        'dnd--drag-valid': aggregateState === 'valid',
        'dnd--drag-error': aggregateState === 'error'
      }, hotspotSpecificClasses) }
      ref={ wrapperRef }
      role="none"
      style={ { position: 'relative' } }
    >
      <DroppableContextProvider value={ { 
        isDragActive: isDragHappening,
        isOver: isValidDragOver,
        isValid: isValidDragOver,
        hasValidDrop
      } }>
        {children}
      </DroppableContextProvider>
      {hotspotHandlers.map(({ hotspot, handlers }) => {
        const hotspotState = hotspotStates[hotspot.id]
        const isDragInactive = hotspotState?.dragState === 'inactive'
        
        return (
          <div
            key={hotspot.id}
            className={ cn(
              hotspot.className,
            ) }
            style={ {
              ...getHotspotStyles(hotspot.position),
              // Hide hotspot completely when no drag is happening to allow children to be clickable
              // Only show during drag operations
              display: isDragHappening ? 'block' : 'none'
            } }
            onDragLeave={ isVisible ? handlers.handleDragLeave : undefined }
            onDragOver={ isVisible ? handlers.handleDragOver : undefined }
            onDrop={ isVisible ? handlers.handleDrop : undefined }
            ref={ (el) => { hotspotRefs.current[hotspot.id] = el } }
            role="none"
          >
            <div
              className={ cn({
                'dnd--drag-active': hotspotState?.dragState === 'active',
                'dnd--drag-valid': hotspotState?.dragState === 'valid',
                'dnd--drag-error': hotspotState?.dragState === 'error'
              }) }
              style={{ 
                width: '100%', 
                height: '100%'
              }}
            >
            <DroppableContextProvider value={ { 
              isDragActive: hotspotState?.dragState !== 'inactive',
              isOver: hotspotState?.dragState !== 'inactive' && hotspotState?.dragState !== 'active',
              isValid: hotspotState?.dragState === 'valid',
              hasValidDrop
            } }>
              {hotspot.children}
            </DroppableContextProvider>
            </div>
          </div>
        )
      })}
    </div>
  ), [hotspotStates, children, className, hotspotHandlers, isVisible, isDragHappening, isValidDragOver, aggregateState, hotspotSpecificClasses])
}
