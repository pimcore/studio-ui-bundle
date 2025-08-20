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
import { useSortable } from '@dnd-kit/sortable'
import { useAreablockEditableStyles } from '../../areablock-editable.styles'
import { type AreablockManager } from '../../utils/areablock-manager'
import { type AreaType } from '../../areablock-editable'
import { useTranslation } from 'react-i18next'

export interface SortableAreablockToolbarProps {
  id: string
  buttonsContainer: HTMLElement
  element: HTMLElement
  limitReached: boolean
  areaTypes: AreaType[]
  areablockManager: AreablockManager
  onAddArea: (element: HTMLElement | null, areaType?: string) => void
  onRemoveArea: (element: HTMLElement) => void
  onMoveAreaUp: (element: HTMLElement) => void
  onMoveAreaDown: (element: HTMLElement) => void
  activeId: string | null
}

export const SortableAreablockToolbar = ({
  id,
  buttonsContainer,
  element,
  limitReached,
  areaTypes,
  areablockManager,
  onAddArea,
  onRemoveArea,
  onMoveAreaUp,
  onMoveAreaDown,
  activeId
}: SortableAreablockToolbarProps): React.JSX.Element => {
  const { styles } = useAreablockEditableStyles()
  const { t } = useTranslation()
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
    isOver
  } = useSortable({ id })

  React.useEffect(() => {
    if (setNodeRef !== null) {
      setNodeRef(element)

      Object.keys(attributes).forEach(key => {
        if (attributes[key] !== undefined && key.startsWith('data-')) {
          element.setAttribute(key, String(attributes[key]))
        }
      })
    }
  }, [setNodeRef, element, attributes])

  React.useEffect(() => {
    if (isDragging) {
      element.classList.add(styles.dragActive)
    } else if (isOver && activeId !== null && activeId !== id) {
      element.classList.add(styles.dragDropTarget)
    } else {
      element.classList.remove(styles.dragActive, styles.dragDropTarget)
    }
  }, [isDragging, isOver, element, activeId, id, styles])

  const elements = areablockManager.queryElements()
  const elementIndex = areablockManager.findElementIndex(element)
  const isFirst = elementIndex === 0
  const isLast = elementIndex === elements.length - 1

  const elementType = areablockManager.getElementType(element)
  const areaTypeConfig = areaTypes.find(areaType => areaType.type === elementType)
  const toolbarTitle = (areaTypeConfig?.name != null) ? t(areaTypeConfig.name) : ((elementType != null) ? t(elementType) : t('areablock'))

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
      const dropdownItems = areaTypes.map(areaType => ({
        key: areaType.type,
        label: t(areaType.name),
        onClick: () => {
          onAddArea(element, areaType.type)
        }
      }))

      buttons.push(
        <Dropdown
          key="plus-dropdown"
          menu={ { items: dropdownItems } }
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

  deleteButton = (
    <IconButton
      icon={ { value: 'trash' } }
      key="minus"
      onClick={ () => { onRemoveArea(element) } }
      size="small"
    />
  )

  return (
    <ToolStrip
      activateOnHover
      className={ styles.areablockToolstrip }
      dragger={ { listeners } }
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
  )
}
