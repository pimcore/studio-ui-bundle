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

import React, { createContext, type ComponentType, useState, useMemo } from 'react'
import { BorderNode, type TabNode } from 'flexlayout-react'
import { WidgetView } from '@Pimcore/modules/widget-manager/widget/widget-view'
import ErrorBoundary from '@Pimcore/modules/app/error-boundary/error-boundary'

interface WidgetContainerProps {
  node: TabNode
  component: ComponentType
}

interface IWidgetContext {
  nodeId: string | null
}

export const WidgetContext = createContext<IWidgetContext>({ nodeId: null })

const WidgetContainer = (props: WidgetContainerProps): React.JSX.Element => {
  const { node, component: Component } = props
  const [nodeId] = useState(node.getId())
  const isBorderNode = node.getParent() instanceof BorderNode
  const config = node.getConfig()
  const icon = config.icon ?? { value: 'widget-default', type: 'name' }

  return useMemo(() => (
    <ErrorBoundary>
      <WidgetContext.Provider value={ { nodeId } }>
        <WidgetView
          icon={ icon }
          showTitle={ isBorderNode }
          title={ node.getName() }
        >
          <Component { ...node.getConfig() } />
        </WidgetView>
      </WidgetContext.Provider>
    </ErrorBoundary>
  ), [nodeId, isBorderNode])
}

export { WidgetContainer }
