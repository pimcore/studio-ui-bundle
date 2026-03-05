/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { BorderNode, type TabNode } from 'flexlayout-react'
import React, { useState } from 'react'
import { BorderTitleView } from './border-title-view'
import { TabTitleView } from './tab-title-view'
import { useWidgetManager } from '../hooks/use-widget-manager'
import { createTabTitleTestId, createBorderTestId } from '@Pimcore/utils/test-id-generator'
import { type ElementIcon } from '@sdk/components'
import { useWidgetTitle } from '../hooks/use-widget-title'

export interface TabTitleContainerProps {
  node: TabNode
  modified?: boolean
  title?: string
  icon?: ElementIcon
}

export const TabTitleContainer = ({ node, modified, title: titleProp, icon: iconProp }: TabTitleContainerProps): React.JSX.Element => {
  const [isBorderNode] = useState(node.getParent() instanceof BorderNode)
  const { closeWidget } = useWidgetManager()
  const { title, icon } = useWidgetTitle(node, { titleOverride: titleProp, iconOverride: iconProp })
  const config = node.getConfig()

  const isCloseable = node.isEnableClose()

  const onClose = (): void => {
    if (modified === false || modified === undefined) {
      closeWidget(node.getId())
    }
  }

  const onConfirm = (): void => {
    closeWidget(node.getId())
  }

  // Type-safe config extraction
  const nodeId = typeof config.id === 'string' || typeof config.id === 'number' ? String(config.id) : undefined
  const elementType = typeof config.elementType === 'string' ? config.elementType as string : undefined
  const iconColorGroup = typeof config.iconColorGroup === 'string' ? config.iconColorGroup : undefined
  const rawNodeName = node.getName()
  const nodeName = typeof rawNodeName === 'string' ? rawNodeName : undefined

  if (isBorderNode) {
    const dataTestId = createBorderTestId(nodeId, nodeName, elementType)

    return (
      <BorderTitleView
        dataTestId={ dataTestId }
        icon={ icon }
        iconColorGroup={ iconColorGroup }
        title={ title }
      />
    )
  }

  return (
    <TabTitleView
      dataTestId={ createTabTitleTestId(getTitle(), nodeId, elementType) }
      icon={ icon }
      iconColorGroup={ iconColorGroup }
      onClose={ isCloseable ? onClose : undefined }
      onConfirm={ modified === true ? onConfirm : undefined }
      title={ getTitle() }
    />
  )

  function getTitle (): string {
    return title + (modified === true ? '*' : '')
  }
}
