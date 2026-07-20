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
import React, { memo, useCallback, useRef, useState } from 'react'
import { BorderTitleView } from './border-title-view'
import { TabTitleView } from './tab-title-view'
import { useWidgetManager } from '../hooks/use-widget-manager'
import { createTabTitleTestId, createBorderTestId } from '@Pimcore/utils/test-id-generator'
import { type ElementIcon } from '@sdk/components'
import { useWidgetTitle } from '../hooks/use-widget-title'
import { useAppSelector } from '@sdk/app'
import { selectMainWidgetContext } from '../widget-manager-slice'

export interface TabTitleContainerProps {
  node: TabNode
  modified?: boolean
  title?: string
  icon?: ElementIcon
}

const TabTitleContainerInner = ({ node, modified, title: titleProp, icon: iconProp }: TabTitleContainerProps): React.JSX.Element => {
  const [isBorderNode] = useState(node.getParent() instanceof BorderNode)

  const { closeWidget } = useWidgetManager()
  const { title, icon } = useWidgetTitle(node, { titleOverride: titleProp, iconOverride: iconProp })
  const mainWidgetContext = useAppSelector(selectMainWidgetContext)

  const isActiveMainWidget = mainWidgetContext?.nodeId === node.getId()
  const config = node.getConfig()
  const isDetached = config.detached === true
  const isCloseable = node.isEnableClose()

  // keep closeWidget in a ref so the stable callbacks below always call the latest version
  const closeWidgetRef = useRef(closeWidget)
  closeWidgetRef.current = closeWidget

  const onClose = useCallback((): void => {
    if (modified === false || modified === undefined) {
      closeWidgetRef.current(node.getId())
    }
  }, [modified, node])

  const onConfirm = useCallback((): void => {
    closeWidgetRef.current(node.getId())
  }, [node])

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
      active={ isActiveMainWidget }
      dataTestId={ createTabTitleTestId(getTitle(), nodeId, elementType) }
      detached={ isDetached }
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

export const TabTitleContainer = memo(TabTitleContainerInner)
