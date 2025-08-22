/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useMemo, useCallback } from 'react'
import { isArray, isNil } from 'lodash'
import { DragOverlay, DndContext } from '@dnd-kit/core'
import { DynamicEditablesRenderer } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/components/editables-renderer/dynamic-editables-renderer'
import { useAreablockEditableStyles } from './areablock-editable.styles'
import { useAreablockEditable } from './hooks/use-areablock-editable'
import { useAreablockControls } from './hooks/use-areablock-controls'
import { useAreablockSorting } from './hooks/use-areablock-sorting'
import { AreablockManager } from './utils/areablock-manager'
import { configUtils } from './utils/areablock-utils'

export interface AreaType {
  name: string
  type: string
  description?: string
  icon?: string
  previewHtml?: string | null
  limit?: number | null
  needsReload?: boolean
  hasDialogBoxConfiguration?: boolean
  sortIndex?: number
}

export interface AreablockEditableConfig {
  limit?: number
  class?: string
  reload?: boolean
  allowed?: string[]
  types?: AreaType[]
  group?: Record<string, string[]>
  blockStateStack?: any
}

export interface AreablockEntry {
  key: string | number
  type: string
  hidden?: boolean
}

export type AreablockValue = AreablockEntry[]

export interface AreablockEditableProps {
  value?: AreablockValue
  onChange?: (value: AreablockValue) => void
  config?: AreablockEditableConfig
  className?: string
  editableName: string
  containerRef?: React.RefObject<HTMLDivElement>
  disabled?: boolean
  enableSidebarDragDrop?: boolean
}

export const AreablockEditable = ({
  value = [],
  onChange,
  config,
  className,
  editableName,
  containerRef,
  disabled = false,
  enableSidebarDragDrop = false
}: AreablockEditableProps): React.JSX.Element => {
  const { styles } = useAreablockEditableStyles()
  const currentValue = isArray(value) ? value : []

  const areablockManager = useMemo(() => new AreablockManager(editableName, containerRef), [editableName, containerRef])

  const {
    dynamicEditables,
    addArea,
    removeArea,
    moveAreaUp,
    moveAreaDown,
    moveArea
  } = useAreablockEditable({
    areablockManager,
    value: currentValue,
    onChange,
    config,
    disabled,
    onOperationComplete: (limitReached) => {
      const elements = areablockManager.queryElements()
      elements.forEach(element => { updateControls(element, limitReached) })
    }
  })

  // Create addAreaAtIndex function for enhanced drag and drop
  const addAreaAtIndex = useCallback(async (areaType: string, index: number): Promise<void> => {
    const currentElements = areablockManager.queryElements()
    const targetElement = index > 0 ? currentElements[index - 1] : null
    await addArea(targetElement, areaType)
  }, [areablockManager, addArea])

  // Use enhanced sorting when sidebar drag and drop is enabled
  const {
    activeId,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    dropzonePortals,
    dragOverlayTitle,
    refreshDropzones
  } = useAreablockSorting({
    areablockManager,
    areaTypes: configUtils.getAvailableTypes(config),
    onMoveArea: moveArea,
    onAddAreaAtIndex: enableSidebarDragDrop ? addAreaAtIndex : undefined,
    config: enableSidebarDragDrop ? config : undefined
  })

  // Standard controls
  const {
    updateControls,
    initializeControls,
    emptyStatePortal
  } = useAreablockControls({
    areablockManager,
    areaTypes: configUtils.getAvailableTypes(config),
    config,
    onAddArea: addArea,
    onRemoveArea: removeArea,
    onMoveAreaUp: moveAreaUp,
    onMoveAreaDown: moveAreaDown,
    onMoveArea: moveArea
  })

  const refreshControls = useCallback(() => {
    const elements = areablockManager.ensureAllElementKeys()
    const container = areablockManager.getContainer()
    if (isNil(container)) return

    const limitReached = configUtils.isLimitReached(elements.length, config?.limit)

    if (elements.length < 1) {
      initializeControls()
    } else {
      container.classList.remove('pimcore_area_buttons')
      elements.forEach(element => {
        updateControls(element, limitReached)
      })
    }
    
    // Refresh dropzones after control updates
    if (enableSidebarDragDrop) {
      refreshDropzones()
    }
  }, [areablockManager, config?.limit, initializeControls, updateControls, enableSidebarDragDrop, refreshDropzones])

  useEffect(() => {
    refreshControls()
  }, [currentValue, refreshControls])

  const renderContent = () => (
    <div className={ `${styles.areablockContainer} ${className ?? ''}` }>
      <DynamicEditablesRenderer editableDefinitions={ dynamicEditables } />
      {emptyStatePortal}
      {dropzonePortals}
    </div>
  )

  // Wrap with DndContext if using enhanced controls
  if (enableSidebarDragDrop && handleDragStart && handleDragOver && handleDragEnd) {
    return (
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {renderContent()}
        <DragOverlay>
          {activeId ? (
            <div style={{ 
              padding: '8px 16px', 
              backgroundColor: 'white', 
              border: '1px solid #d9d9d9', 
              borderRadius: '6px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
            }}>
              {dragOverlayTitle}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    )
  }

  return renderContent()
}
