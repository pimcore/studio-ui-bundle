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
import { useBlockEditableStyles } from '../../block-editable.styles'
import { type BlockManager } from '../../utils/block-manager'
import { useTranslation } from 'react-i18next'
import { useSortableElement } from '../../../../helpers/editable-dropzone-sorting/hooks/use-sortable-element'

export interface SortableBlockToolbarProps {
  id: string
  buttonsContainer: HTMLElement
  element: HTMLElement
  limitReached: boolean
  blockManager: BlockManager
  onAddBlock: (element: HTMLElement | null, amount?: number) => void
  onRemoveBlock: (element: HTMLElement) => void
  onMoveBlockUp: (element: HTMLElement) => void
  onMoveBlockDown: (element: HTMLElement) => void
}

export const SortableBlockToolbar = ({
  id,
  buttonsContainer,
  element,
  limitReached,
  blockManager,
  onAddBlock,
  onRemoveBlock,
  onMoveBlockUp,
  onMoveBlockDown
}: SortableBlockToolbarProps): React.JSX.Element => {
  const { styles } = useBlockEditableStyles()
  const { t } = useTranslation()
  const { listeners } = useSortableElement({ id, element })

  const elements = blockManager.queryElements()
  const elementIndex = blockManager.findElementIndex(element)
  const isFirst = elementIndex === 0
  const isLast = elementIndex === elements.length - 1

  const hasPlus = !isNull(buttonsContainer.querySelector('.pimcore_block_plus'))
  const hasMinus = !isNull(buttonsContainer.querySelector('.pimcore_block_minus'))
  const hasUp = !isNull(buttonsContainer.querySelector('.pimcore_block_up'))
  const hasDown = !isNull(buttonsContainer.querySelector('.pimcore_block_down'))

  const buttons: React.ReactNode[] = []
  let deleteButton: React.ReactNode = null

  if (hasPlus && !limitReached) {
    buttons.push(
      <IconButton
        icon={ { value: 'new' } }
        key="plus"
        onClick={ () => { onAddBlock(element, 1) } }
        size="small"
      />
    )
  }

  if (hasUp) {
    buttons.push(
      <IconButton
        disabled={ isFirst }
        icon={ { value: 'chevron-up' } }
        key="up"
        onClick={ () => { onMoveBlockUp(element) } }
        size="small"
      />
    )
  }

  if (hasDown) {
    buttons.push(
      <IconButton
        disabled={ isLast }
        icon={ { value: 'chevron-down' } }
        key="down"
        onClick={ () => { onMoveBlockDown(element) } }
        size="small"
      />
    )
  }

  if (hasMinus) {
    deleteButton = (
      <IconButton
        icon={ { value: 'trash' } }
        key="minus"
        onClick={ () => { onRemoveBlock(element) } }
        size="small"
      />
    )
  }

  return (
    <ToolStrip
      activateOnHover
      className={ styles.blockToolstrip }
      dragger={ { listeners } }
      key={ `toolbar-${element.getAttribute('key')}` }
      theme="inverse"
      title={ t('block') }
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
