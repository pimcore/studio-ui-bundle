/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { BorderNode, type TabNode } from 'flexlayout-react'
import React, { useState } from 'react'
import { BorderTitleView } from './border-title-view'
import { TabTitleView } from './tab-title-view'
import { useWidgetManager } from '../hooks/use-widget-manager'

export interface TabTitleContainerProps {
  node: TabNode
  modified?: boolean
}

export const TabTitleContainer = ({ node, modified }: TabTitleContainerProps): React.JSX.Element => {
  const [isBorderNode] = useState(node.getParent() instanceof BorderNode)
  const config = node.getConfig()
  const icon = config.icon ?? { value: 'widget-default', type: 'name' }
  const { closeWidget } = useWidgetManager()
  const isCloseable = node.isEnableClose()

  const onClose = (): void => {
    if (modified === false || modified === undefined) {
      closeWidget(node.getId())
    }
  }

  const onConfirm = (): void => {
    closeWidget(node.getId())
  }

  if (isBorderNode) {
    return (
      <BorderTitleView
        icon={ icon }
        title={ node.getName() }
      />
    )
  }

  return (
    <TabTitleView
      icon={ icon }
      onClose={ isCloseable ? onClose : undefined }
      onConfirm={ modified === true ? onConfirm : undefined }
      title={ getTitle() }
    />
  )

  function getTitle (): string {
    return node.getName() + (modified === true ? '*' : '')
  }
}
