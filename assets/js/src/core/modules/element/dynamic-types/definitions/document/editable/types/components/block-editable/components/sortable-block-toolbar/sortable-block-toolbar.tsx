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
import { isNull } from 'lodash'
import { ToolStrip } from '@Pimcore/components/toolstrip/tool-strip'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Split } from '@Pimcore/components/split/split'
import { Space } from 'antd'
import { useSortable } from '@dnd-kit/sortable'
import { type useBlockEditableStyles } from '../../block-editable.styles'

export interface SortableBlockToolbarProps {
  id: string
  buttonsContainer: HTMLElement
  element: HTMLElement
  limitReached: boolean
  editableName: string
  onAddBlock: (element: HTMLElement | null, amount?: number) => void
  onRemoveBlock: (element: HTMLElement) => void
  onMoveBlockUp: (element: HTMLElement) => void
  onMoveBlockDown: (element: HTMLElement) => void
  t: (key: string) => string
  styles: ReturnType<typeof useBlockEditableStyles>['styles']
  activeId: string | null
}

export const SortableBlockToolbar = ({
  id,
  buttonsContainer,
  element,
  limitReached,
  editableName,
  onAddBlock,
  onRemoveBlock,
  onMoveBlockUp,
  onMoveBlockDown,
  t,
  styles,
  activeId
}: SortableBlockToolbarProps): React.JSX.Element => {
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

  const elements = Array.from(element.parentElement?.querySelectorAll('.pimcore_block_entry[data-name="' + editableName + '"][key]') ?? [])
  const elementIndex = elements.indexOf(element)
  const isFirst = elementIndex === 0
  const isLast = elementIndex === elements.length - 1

  const hasPlus = !isNull(buttonsContainer.querySelector('.pimcore_block_plus'))
  const hasMinus = !isNull(buttonsContainer.querySelector('.pimcore_block_minus'))
  const hasUp = !isNull(buttonsContainer.querySelector('.pimcore_block_up'))
  const hasDown = !isNull(buttonsContainer.querySelector('.pimcore_block_down'))
  const amountDisplay = buttonsContainer.querySelector('.pimcore_block_amount')

  const buttons: React.ReactNode[] = []
  let deleteButton: React.ReactNode = null

  buttons.push(
    <IconButton
      icon={ { value: 'drag-option' } }
      key="drag"
      style={ { cursor: 'grab' } }
      title={ t('drag-to-reorder') }
      { ...listeners }
    />
  )

  if (hasPlus && !limitReached) {
    buttons.push(
      <IconButton
        icon={ { value: 'new' } }
        key="plus"
        onClick={ () => { onAddBlock(element, 1) } }
        title={ t('add-block-entry') }
      />
    )
  }

  if (hasUp) {
    buttons.push(
      <IconButton
        disabled={ isFirst }
        icon={ { value: 'move-up' } }
        key="up"
        onClick={ () => { onMoveBlockUp(element) } }
        title={ isFirst ? t('cannot-move-up') : t('move-up') }
      />
    )
  }

  if (hasDown) {
    buttons.push(
      <IconButton
        disabled={ isLast }
        icon={ { value: 'move-down' } }
        key="down"
        onClick={ () => { onMoveBlockDown(element) } }
        title={ isLast ? t('cannot-move-down') : t('move-down') }
      />
    )
  }

  if (hasMinus) {
    deleteButton = (
      <IconButton
        icon={ { value: 'trash' } }
        key="minus"
        onClick={ () => { onRemoveBlock(element) } }
        title={ t('remove-block-entry') }
      />
    )
  }

  if (!isNull(amountDisplay)) {
    const htmlAmountDisplay = amountDisplay as HTMLElement
    htmlAmountDisplay.textContent = `${elementIndex + 1}/${elements.length}`
    htmlAmountDisplay.style.display = 'none'
  }

  return (
    <ToolStrip
      className={ styles.blockToolstrip }
      key={ `toolbar-${element.getAttribute('key')}` }
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
