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
import { ToolStrip } from '@Pimcore/components/toolstrip/tool-strip'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Split } from '@Pimcore/components/split/split'
import { Space, Dropdown } from 'antd'
import { useAreablockEditableStyles } from '../../areablock-editable.styles'
import { type AreablockManager } from '../../utils/areablock-manager'
import { type AreaType, type AreablockEditableConfig } from '../../areablock-editable'
import { useTranslation } from 'react-i18next'
import { useSortableElement } from '../../../../helpers/editable-dropzone-sorting/hooks/use-sortable-element'
import { useAreablockMenu } from '../../hooks/use-areablock-menu'

export interface SortableAreablockToolbarProps {
  id: string
  buttonsContainer: HTMLElement
  element: HTMLElement
  limitReached: boolean
  areaTypes: AreaType[]
  config?: AreablockEditableConfig
  areablockManager: AreablockManager
  onAddArea: (element: HTMLElement | null, areaType?: string) => void
  onRemoveArea: (element: HTMLElement) => void
  onMoveAreaUp: (element: HTMLElement) => void
  onMoveAreaDown: (element: HTMLElement) => void
  onOpenDialog?: (areaKey: string) => void
}

export const SortableAreablockToolbar = ({
  id,
  buttonsContainer,
  element,
  limitReached,
  areaTypes,
  config,
  areablockManager,
  onAddArea,
  onRemoveArea,
  onMoveAreaUp,
  onMoveAreaDown,
  onOpenDialog
}: SortableAreablockToolbarProps): React.JSX.Element => {
  const { styles } = useAreablockEditableStyles()
  const { t } = useTranslation()
  const { DraggableWrapper } = useSortableElement({ id, element })

  const { menuItems } = useAreablockMenu({
    config,
    onAddArea: (areaType: string) => { onAddArea(element, areaType) }
  })

  const elements = areablockManager.queryElements()
  const elementIndex = areablockManager.findElementIndex(element)
  const isFirst = elementIndex === 0
  const isLast = elementIndex === elements.length - 1

  const elementType = areablockManager.getElementType(element)
  const areaTypeConfig = areaTypes.find(areaType => areaType.type === elementType)
  const toolbarTitle = (areaTypeConfig?.name != null) ? t(areaTypeConfig.name) : undefined

  const buttons: React.ReactNode[] = []
  let deleteButton: React.ReactNode = null

  if (!limitReached) {
    if (areaTypes.length === 1) {
      buttons.push(
        <IconButton
          icon={ { value: 'new' } }
          key="plus"
          onClick={ () => {
            onAddArea(element, areaTypes[0].type)
          } }
          size="small"
        />
      )
    } else {
      buttons.push(
        <Dropdown
          key="plus-dropdown"
          menu={ { items: menuItems } }
          placement="bottomLeft"
          trigger={ ['click'] }
        >
          <IconButton
            icon={ { value: 'new' } }
            size="small"
          />
        </Dropdown>
      )
    }
  }

  buttons.push(
    <IconButton
      disabled={ isFirst }
      icon={ { value: 'chevron-up' } }
      key="up"
      onClick={ () => { onMoveAreaUp(element) } }
      size="small"
    />
  )

  buttons.push(
    <IconButton
      disabled={ isLast }
      icon={ { value: 'chevron-down' } }
      key="down"
      onClick={ () => { onMoveAreaDown(element) } }
      size="small"
    />
  )

  // Add dialog button if area type has dialog box configuration
  if (areaTypeConfig?.hasDialogBoxConfiguration === true) {
    buttons.push(
      <IconButton
        icon={ { value: 'settings' } }
        key="dialog"
        onClick={ () => { onOpenDialog?.(id) } }
        size="small"
      />
    )
  }

  deleteButton = (
    <IconButton
      icon={ { value: 'trash' } }
      key="minus"
      onClick={ () => { onRemoveArea(element) } }
      size="small"
    />
  )

  return (
    <DraggableWrapper>
      <ToolStrip
      dragger
        activateOnHover
        className={ styles.areablockToolstrip }
        key={ `toolbar-${element.getAttribute('key')}` }
        theme="inverse"
        title={ toolbarTitle }
      >
        <Split
          dividerSize="small"
          size="mini"
          theme="secondary"
        >
          <Space size="small">
            {buttons}
          </Space>
          {deleteButton}
        </Split>
      </ToolStrip>
    </DraggableWrapper>
  )
}
