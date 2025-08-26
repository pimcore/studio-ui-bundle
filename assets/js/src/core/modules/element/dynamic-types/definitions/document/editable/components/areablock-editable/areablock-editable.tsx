/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useMemo, useCallback, useState } from 'react'
import { isArray, isNil } from 'lodash'
import { DynamicEditablesRenderer } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/components/editables-renderer/dynamic-editables-renderer'
import { useAreablockEditableStyles } from './areablock-editable.styles'
import { useAreablockEditable } from './hooks/use-areablock-editable'
import { useAreablockControls } from './hooks/use-areablock-controls'
import { AreablockManager } from './utils/areablock-manager'
import { configUtils } from './utils/areablock-utils'
import { AreablockDialog } from './components/areablock-dialog/areablock-dialog'

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
  const currentValue = isArray(value) ? value : []

  const areablockManager = useMemo(() => new AreablockManager(editableName, containerRef), [editableName, containerRef])

  const [openDialogs, setOpenDialogs] = useState<Set<string>>(new Set())

  const handleOpenDialog = useCallback((areaKey: string) => {
    setOpenDialogs(prev => new Set(prev).add(areaKey))
  }, [])

  const handleCloseDialog = useCallback((areaKey: string) => {
    setOpenDialogs(prev => {
      const newSet = new Set(prev)
      newSet.delete(areaKey)
      return newSet
    })
  }, [])

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
    disabled
  })

  const { renderAreablockToolbar } = useAreablockControls({
    areablockManager,
    areaTypes: configUtils.getAvailableTypes(config),
    config,
    onAddArea: addArea,
    onRemoveArea: removeArea,
    onMoveAreaUp: moveAreaUp,
    onMoveAreaDown: moveAreaDown,
    onMoveArea: moveArea,
    onOpenDialog: handleOpenDialog
  })

  return (
    <div className={ className }>
      <DynamicEditablesRenderer editableDefinitions={ dynamicEditables } />
      {renderAreablockToolbar()}

      {Array.from(openDialogs).map(areaKey => {
        const element = areablockManager.findElementByKey(areaKey)
        if (isNil(element)) return null

        return (
          <AreablockDialog
            areablockName={ editableName }
            editableDefinitions={ dynamicEditables }
            element={ element }
            isOpen
            key={ `dialog-${areaKey}` }
            onClose={ () => { handleCloseDialog(areaKey) } }
          />
        )
      })}
    </div>
  )
}
