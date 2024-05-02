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

interface TabTitleContainerProps {
  node: TabNode
}

export const TabTitleContainer = ({ node }: TabTitleContainerProps): React.JSX.Element => {
  const [isBorderNode] = useState(node.getParent() instanceof BorderNode)
  const [icon] = useState(node.getIcon() ?? 'widget-default')

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
      title={ node.getName() }
    />
  )
}
