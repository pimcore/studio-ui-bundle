/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, type ComponentType, useState, useMemo, useEffect } from 'react'
import { BorderNode, type TabNode } from 'flexlayout-react'
import { WidgetView } from '@Pimcore/modules/widget-manager/widget/widget-view'
import ErrorBoundary from '@Pimcore/modules/app/error-boundary/error-boundary'
import { useAppSelector } from '@sdk/app'
import { selectMainWidgetContext } from '../widget-manager-slice'
import { useGlobalDefaultContextActions } from '@Pimcore/modules/element/hooks/use-global-default-context'
import { type WidgetContentTitleContainerProps } from './widget-content-title-container'
import { useWidgetTitle } from '../hooks/use-widget-title'

interface WidgetContainerProps {
  node: TabNode
  component: ComponentType
  defaultGlobalContext: boolean
  contentTitleComponent?: ComponentType<WidgetContentTitleContainerProps>
}

interface IWidgetContext {
  nodeId: string | null
}

export const WidgetContext = createContext<IWidgetContext>({ nodeId: null })

const WidgetContainer = (props: WidgetContainerProps): React.JSX.Element => {
  const { node, component: Component, defaultGlobalContext, contentTitleComponent: ContentTitleComponent } = props
  const [nodeId] = useState(node.getId())
  const isBorderNode = node.getParent() instanceof BorderNode
  const { title, icon } = useWidgetTitle(node)
  const mainWidgetContext = useAppSelector(selectMainWidgetContext)
  const isWidgetActive = mainWidgetContext?.nodeId === nodeId
  const { setGlobalDefaultContext } = useGlobalDefaultContextActions()
  const config = node.getConfig()
  const iconColorGroup = typeof config.iconColorGroup === 'string' ? config.iconColorGroup : undefined

  useEffect(() => {
    if (isWidgetActive && defaultGlobalContext) {
      setGlobalDefaultContext({
        type: 'default',
        widgetId: nodeId
      })
    }
  }, [isWidgetActive, defaultGlobalContext, nodeId])

  return useMemo(() => (
    <ErrorBoundary>
      <WidgetContext.Provider value={ { nodeId } }>
        <WidgetView
          contentTitleComponent={ ContentTitleComponent }
          icon={ icon }
          iconColorGroup={ iconColorGroup }
          node={ node }
          showTitle={ isBorderNode }
          title={ title }
        >
          <Component { ...node.getConfig() } />
        </WidgetView>
      </WidgetContext.Provider>
    </ErrorBoundary>
  ), [nodeId, isBorderNode])
}

export { WidgetContainer }
