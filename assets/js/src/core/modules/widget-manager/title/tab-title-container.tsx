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
import { useTranslation } from 'react-i18next'
import { isString } from 'lodash'

export interface TabTitleContainerProps {
  node: TabNode
  modified?: boolean
}

export const TabTitleContainer = ({ node, modified }: TabTitleContainerProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [isBorderNode] = useState(node.getParent() instanceof BorderNode)
  const config = node.getConfig()
  const icon = config.icon ?? { value: 'widget-default', type: 'name' }
  const title = isString(config.translationKey)
    ? t(config.translationKey as string)
    : node.getName()
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
        title={ t(`${node.getName()}`) }
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
    return title + (modified === true ? '*' : '')
  }
}
