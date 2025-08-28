/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useRef, useEffect } from 'react'
import { Droppable, type DragAndDropInfo } from '@Pimcore/components/drag-and-drop/droppable'
import { EditableDropzoneContent } from './dropzone-content'

export interface EditableDropzoneProps {
  id: string
  index: number // Keep for compatibility, but we'll extract from DOM
  onDropItem?: (info: any, index: number) => Promise<void>
  isValidDrop?: (info: any) => boolean
  onMoveItem?: (fromIndex: number, toIndex: number) => void
  editableManager?: any
}

const EditableDropzoneComponent = ({ 
  id, 
  index, 
  onDropItem, 
  isValidDrop,
  onMoveItem,
  editableManager
}: EditableDropzoneProps): React.JSX.Element => {
  // Use refs to store latest values without causing re-renders
  const onDropItemRef = useRef(onDropItem)
  const isValidDropRef = useRef(isValidDrop)
  const onMoveItemRef = useRef(onMoveItem)
  const editableManagerRef = useRef(editableManager)

  useEffect(() => {
    onDropItemRef.current = onDropItem
    isValidDropRef.current = isValidDrop
    onMoveItemRef.current = onMoveItem
    editableManagerRef.current = editableManager
  })
  
  // Extract element key and position from DOM based on dropzone ID
  const getDropzoneElementKey = useCallback((): string | null => {
    const dropzoneContainer = document.querySelector(`[data-pimcore-dropzone-id="${id}"]`)?.closest('[data-pimcore-editable-dropzone]')
    // Find the closest element entry (area or block) and get its key attribute
    const elementEntry = dropzoneContainer?.closest('.pimcore_area_entry, .pimcore_block_entry')
    return elementEntry?.getAttribute('key') ?? null
  }, [id])
  
  const getDropzonePosition = useCallback((): 'before' | 'after' => {
    const dropzoneContainer = document.querySelector(`[data-pimcore-dropzone-id="${id}"]`)?.closest('[data-pimcore-editable-dropzone]')
    return (dropzoneContainer?.getAttribute('data-pimcore-dropzone-position') as 'before' | 'after') ?? 'after'
  }, [id])
  
  const handleDrop = useCallback(async (info: DragAndDropInfo): Promise<void> => {
    const dropzoneContainer = document.querySelector(`[data-pimcore-dropzone-id="${id}"]`)?.closest('[data-pimcore-editable-dropzone]')
    const elementEntry = dropzoneContainer?.closest('.pimcore_area_entry, .pimcore_block_entry')
    const elementKey = elementEntry?.getAttribute('key')
    
    console.log('🎯 SORT DROP EXECUTED', {
      dropzoneId: id,
      dropzoneInfo: {
        elementKey,
        position: dropzoneContainer?.getAttribute('data-pimcore-dropzone-position'),
        isFirst: dropzoneContainer?.getAttribute('data-pimcore-first-dropzone') === 'true'
      },
      dragInfo: info,
      isSortable: !!info.sortable,
      elementKey: info.sortable?.elementKey,
      timestamp: Date.now()
    })

    // Handle external drops (from sidebar)
    if (onDropItemRef.current != null && !info.sortable) {
      console.log('📦 External drop detected, calling onDropItem')
      await onDropItemRef.current(info, index)
      return
    }

    // Handle internal sorting/reordering
    if (info.sortable && onMoveItemRef.current && editableManagerRef.current) {
      console.log('🔄 Internal sort detected, processing move...')
      const currentElements = editableManagerRef.current.queryElements()
      const draggedElementKey = info.sortable.elementKey
      
      // Get the container and calculate everything from actual DOM
      const container = editableManagerRef.current.getContainer()
      if (!container) {
        console.log('❌ No container found')
        return
      }
      
      // Get all entry elements in actual DOM order
      const allEntriesInDom = Array.from(container.querySelectorAll('.pimcore_area_entry, .pimcore_block_entry')) as HTMLElement[]
      const totalElementsInDom = allEntriesInDom.length
      
      // NEW APPROACH: Use element key matching instead of DOM position calculation
      const dropzoneContainer = document.querySelector(`[data-pimcore-dropzone-id="${id}"]`)?.closest('[data-pimcore-editable-dropzone]')
      const dropzoneElementKey = dropzoneContainer?.getAttribute('data-pimcore-element-key')
      const dropzonePosition = dropzoneContainer?.getAttribute('data-pimcore-dropzone-position')
      const isFirstDropzone = dropzoneContainer?.getAttribute('data-pimcore-first-dropzone') === 'true'
      
      let targetIndex: number
      
      if (isFirstDropzone) {
        // First dropzone - insert at beginning
        targetIndex = 0
        console.log('📍 First dropzone detected - target index: 0')
      } else if (dropzoneElementKey && dropzonePosition) {
        // Find the target element by its key
        const targetElement = allEntriesInDom.find(el => 
          editableManagerRef.current.getElementKey(el) === dropzoneElementKey
        )
        
        if (targetElement) {
          const targetElementIndex = allEntriesInDom.indexOf(targetElement)
          
          if (dropzonePosition === 'before') {
            targetIndex = targetElementIndex
          } else { // 'after'
            targetIndex = targetElementIndex + 1
          }
          
          console.log('🎯 Element key match found', {
            targetElementKey: dropzoneElementKey,
            position: dropzonePosition,
            targetElementIndex,
            calculatedTargetIndex: targetIndex
          })
        } else {
          console.log('❌ Could not find target element by key:', dropzoneElementKey)
          return
        }
      } else {
        console.log('❌ No element key or position found on dropzone container')
        return
      }
      
      // Find the dragged element and its current index
      const draggedElement = allEntriesInDom.find(el => 
        editableManagerRef.current.getElementKey(el) === draggedElementKey
      )
      
      if (!draggedElement) {
        console.log('❌ Could not find dragged element in DOM')
        return
      }
      
      const sourceIndex = allEntriesInDom.indexOf(draggedElement)
      
      console.log('🔄 Move calculation', {
        draggedElementKey,
        sourceIndex,
        targetIndex,
        totalElements: totalElementsInDom,
        moveDirection: sourceIndex < targetIndex ? 'down' : sourceIndex > targetIndex ? 'up' : 'same'
      })
      
      // Prevent no-op moves
      if (sourceIndex === targetIndex || (sourceIndex === targetIndex - 1 && targetIndex > sourceIndex)) {
        console.log('⚠️ No-op move detected - element would end up in the same position', {
          sourceIndex,
          targetIndex,
          reason: sourceIndex === targetIndex ? 'Same position' : 'Adjacent move down'
        })
        return
      }
      
      // Adjust target index for move calculations (when moving down, target reduces by 1)
      let adjustedTargetIndex = targetIndex
      if (sourceIndex < targetIndex) {
        adjustedTargetIndex = targetIndex - 1
      }
      
      console.log('✅ Executing move', {
        from: sourceIndex,
        to: adjustedTargetIndex,
        rawTargetIndex: targetIndex,
        dropzoneInfo: {
          elementKey: dropzoneElementKey,
          position: dropzonePosition,
          isFirst: isFirstDropzone
        }
      })
      
      onMoveItemRef.current(sourceIndex, adjustedTargetIndex)
    } else {
      console.log('⚠️ Sort drop ignored - missing requirements', {
        hasSortable: !!info.sortable,
        hasOnMoveItem: !!onMoveItemRef.current,
        hasEditableManager: !!editableManagerRef.current
      })
    }
  }, [id, index])

  const validateDrop = useCallback((info: DragAndDropInfo): boolean => {
    // Handle external drops validation
    if (!info.sortable && isValidDropRef.current) {
      return isValidDropRef.current(info)
    }
    
    // Handle internal sorting validation - always allow within same context
    if (info.sortable) {
      return info.type === 'areablock-element' || info.type === 'block-element'
    }

    return false
  }, [])

  const validateContext = useCallback((info: DragAndDropInfo): boolean => {
    console.log('validateContext called with info:', info);
    // Accept both external drops and internal sorting
    return info.type === 'areablock-element' || 
           info.type === 'block-element' ||
           (isValidDropRef.current?.(info) ?? false)
  }, [])

  return (
    <Droppable
      disableDndActiveIndicator={ false }
      isValidContext={ validateContext }
      isValidData={ validateDrop }
      onDrop={ handleDrop }
    >
      <EditableDropzoneContent
        id={ id }
        elementKey={ getDropzoneElementKey() ?? '' }
        position={ getDropzonePosition() }
        setNodeRef={ () => {} } // Not needed for native implementation
      />
    </Droppable>
  )
}

export const EditableDropzone = React.memo(EditableDropzoneComponent)
