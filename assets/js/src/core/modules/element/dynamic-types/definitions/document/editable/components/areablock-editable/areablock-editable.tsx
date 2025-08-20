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
import { DynamicEditablesRenderer } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/components/editables-renderer/dynamic-editables-renderer'
import { useAreablockEditableStyles } from './areablock-editable.styles'
import { useAreablockEditable } from './hooks/use-areablock-editable'
import { useAreablockControls } from './hooks/use-areablock-controls'
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
}

export const AreablockEditable = ({
  value = [],
  onChange,
  config,
  className,
  editableName,
  containerRef,
  disabled = false
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

  const { initializeControls, updateControls, clearEmptyState, renderAreablockToolbar } = useAreablockControls({
    areablockManager,
    areaTypes: configUtils.getAvailableTypes(config),
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
      clearEmptyState()
      container.classList.remove('pimcore_area_buttons')
      elements.forEach(element => {
        updateControls(element, limitReached)
      })
    }
  }, [areablockManager, config?.limit, initializeControls, updateControls, clearEmptyState])

  useEffect(() => {
    refreshControls()
  }, [currentValue, refreshControls])

  return (
    <div className={ `${styles.areablockContainer} ${className ?? ''}` }>
      <DynamicEditablesRenderer editableDefinitions={ dynamicEditables } />
      {renderAreablockToolbar()}
    </div>
  )
}
