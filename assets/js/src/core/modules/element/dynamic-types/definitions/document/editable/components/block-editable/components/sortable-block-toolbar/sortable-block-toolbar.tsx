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
import { Space } from 'antd'
import { useBlockEditableStyles } from '../../block-editable.styles'
import { useTranslation } from 'react-i18next'
import { useSortableElement } from '../../../../helpers/editable-dropzone-sorting/hooks/use-sortable-element'
import { InheritanceWrapper } from '../../../inheritance-wrapper/inheritance-wrapper'

export interface SortableBlockToolbarProps {
  id: string
  element: HTMLElement
  limitReached: boolean
  // Pre-computed in the parent (use-block-controls) so this component can be memoized.
  isFirst: boolean
  isLast: boolean
  hasPlus: boolean
  hasMinus: boolean
  hasUp: boolean
  hasDown: boolean
  onAddBlock: (element: HTMLElement | null, amount?: number) => void
  onRemoveBlock: (element: HTMLElement) => void
  onMoveBlockUp: (element: HTMLElement) => void
  onMoveBlockDown: (element: HTMLElement) => void
  isInherited?: boolean
  onOverwrite?: () => void
}

type DragListeners = ReturnType<typeof useSortableElement>['listeners']

interface SortableBlockToolbarInnerProps extends SortableBlockToolbarProps {
  dragListeners: DragListeners
}

// Inner toolbar — memoized, doesn't subscribe to dnd-kit. The outer wrapper
// owns the subscription so re-renders on drag don't reach this body.
const SortableBlockToolbarInnerComponent = ({
  id,
  element,
  limitReached,
  isFirst,
  isLast,
  hasPlus,
  hasMinus,
  hasUp,
  hasDown,
  onAddBlock,
  onRemoveBlock,
  onMoveBlockUp,
  onMoveBlockDown,
  isInherited = false,
  onOverwrite,
  dragListeners
}: SortableBlockToolbarInnerProps): React.JSX.Element => {
  const { styles } = useBlockEditableStyles()
  const { t } = useTranslation()

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
    <InheritanceWrapper
      isInherited={ isInherited }
      onOverwrite={ onOverwrite }
    >
      <ToolStrip
        activateOnHover
        additionalIcon={ isInherited ? 'inheritance-active' : undefined }
        className={ styles.blockToolstrip }
        disabled={ isInherited }
        dragger={ { listeners: dragListeners } }
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
    </InheritanceWrapper>
  )
}

const SortableBlockToolbarInner = React.memo(SortableBlockToolbarInnerComponent)

// Outer wrapper isolates the dnd-kit subscription from the memoized inner.
export const SortableBlockToolbar = (props: SortableBlockToolbarProps): React.JSX.Element => {
  const { listeners } = useSortableElement({ id: props.id, element: props.element })
  return (
    <SortableBlockToolbarInner
      { ...props }
      dragListeners={ listeners }
    />
  )
}
