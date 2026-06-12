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
import { isNil } from 'lodash'
import { ToolStrip } from '@Pimcore/components/toolstrip/tool-strip'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Split } from '@Pimcore/components/split/split'
import { Space, Dropdown } from '@sdk/components'
import { useStyles } from '../../areablock-editable.styles'
import { type AreaType, type AreablockEditableConfig } from '../../areablock-editable'
import { useTranslation } from 'react-i18next'
import { useSortableElement } from '../../../../helpers/editable-dropzone-sorting/hooks/use-sortable-element'
import { useAreablockMenu } from '../../hooks/use-areablock-menu'
import { useAreablockClipboard } from '../../hooks/use-areablock-clipboard'
import { configUtils } from '../../utils/areablock-utils'
import { InheritanceWrapper } from '../../../inheritance-wrapper/inheritance-wrapper'

export interface SortableAreablockToolbarProps {
  id: string
  element: HTMLElement
  limitReached: boolean
  areaTypes: AreaType[]
  config?: AreablockEditableConfig
  // Pre-computed in the parent (use-areablock-controls) so this component can be memoized.
  isFirst: boolean
  isLast: boolean
  isHidden: boolean
  toolbarTitle?: string
  hasDialogBox: boolean
  onAddArea: (element: HTMLElement | null, areaType?: string) => void
  onRemoveArea: (element: HTMLElement) => void
  onMoveAreaUp: (element: HTMLElement) => void
  onMoveAreaDown: (element: HTMLElement) => void
  onCopyArea: (element: HTMLElement) => void
  onPasteArea: (element: HTMLElement | null) => void
  onOpenDialog?: (areaKey: string) => void
  onToggleHidden?: (element: HTMLElement) => void
  isInherited?: boolean
  onOverwrite?: () => void
}

type DragListeners = ReturnType<typeof useSortableElement>['listeners']

interface SortableAreablockToolbarInnerProps extends SortableAreablockToolbarProps {
  dragListeners: DragListeners
}

// Inner toolbar — memoized, doesn't subscribe to dnd-kit. The outer wrapper
// owns the subscription so re-renders on drag don't reach this body.
const SortableAreablockToolbarInnerComponent = ({
  id,
  element,
  limitReached,
  areaTypes,
  config,
  isFirst,
  isLast,
  isHidden,
  toolbarTitle,
  hasDialogBox,
  onAddArea,
  onRemoveArea,
  onMoveAreaUp,
  onMoveAreaDown,
  onCopyArea,
  onPasteArea,
  onOpenDialog,
  onToggleHidden,
  isInherited = false,
  onOverwrite,
  dragListeners
}: SortableAreablockToolbarInnerProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()

  const clipboardItem = useAreablockClipboard()
  const canPaste = !isNil(clipboardItem) && !limitReached && configUtils.isTypeAllowed(config, clipboardItem.type)

  const { menuItems } = useAreablockMenu({
    config,
    onAddArea: (areaType: string) => { onAddArea(element, areaType) }
  })

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

  buttons.push(
    <IconButton
      icon={ { value: 'copy' } }
      key="copy"
      onClick={ () => { onCopyArea(element) } }
      size="small"
      title={ t('copy') }
    />
  )

  buttons.push(
    <IconButton
      disabled={ !canPaste }
      icon={ { value: 'paste' } }
      key="paste"
      onClick={ () => { onPasteArea(element) } }
      size="small"
      title={ t('paste') }
    />
  )

  if (hasDialogBox) {
    buttons.push(
      <IconButton
        icon={ { value: 'settings' } }
        key="dialog"
        onClick={ () => { onOpenDialog?.(id) } }
        size="small"
      />
    )
  }

  buttons.push(
    <IconButton
      icon={ { value: isHidden ? 'eye-off' : 'eye' } }
      key="visibility"
      onClick={ () => { onToggleHidden?.(element) } }
      size="small"
      title={ t(isHidden ? 'areablock.show' : 'areablock.hide') }
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

  const toolStripContent = (
    <ToolStrip
      activateOnHover={ !isInherited }
      additionalIcon={ isInherited ? 'inheritance-active' : undefined }
      className={ styles.areablockToolstrip }
      disabled={ isInherited }
      dragger={ isInherited ? true : { listeners: dragListeners } }
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

  return (
    <InheritanceWrapper
      isInherited={ isInherited }
      onOverwrite={ onOverwrite }
    >
      {toolStripContent}
    </InheritanceWrapper>
  )
}

const SortableAreablockToolbarInner = React.memo(SortableAreablockToolbarInnerComponent)

// Outer wrapper isolates the dnd-kit subscription from the memoized inner.
export const SortableAreablockToolbar = (props: SortableAreablockToolbarProps): React.JSX.Element => {
  const { listeners } = useSortableElement({ id: props.id, element: props.element })
  return (
    <SortableAreablockToolbarInner
      { ...props }
      dragListeners={ listeners }
    />
  )
}
