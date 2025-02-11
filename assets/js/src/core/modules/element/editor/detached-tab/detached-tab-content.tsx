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

import React from 'react'
import { Content } from '@Pimcore/components/content/content'
import { container } from '@Pimcore/app/depency-injection'
import type { TabManager } from '@Pimcore/modules/element/editor/tab-manager/tab-manager'
import type { WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'
import MissingContext from '@Pimcore/modules/element/editor/detached-tab/missing-context'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { type GlobalElementContext } from '@Pimcore/modules/element/hooks/use-global-element-context'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { ElementToolbar } from '@Pimcore/components/element-toolbar/element-toolbar'
import DraftIndicator from '@Pimcore/modules/data-object/editor/detached-tab/draft-indicator'

export interface DetachedTabContentProps {
  context: GlobalElementContext
  tabKey: string
}

export default function DetachedTabContent ({ context, tabKey }: DetachedTabContentProps): React.JSX.Element {
  const { getOpenedMainWidget } = useWidgetManager()
  const { editorType, isLoading } = useElementDraft(context.config.id, context.type)

  if (isLoading) {
    return <Content loading />
  }

  if (editorType === undefined) {
    return <MissingContext />
  }

  const openedMainWidget = getOpenedMainWidget()
  const tabManager = container.get<TabManager>(editorType.tabManagerServiceId)
  const tab = tabManager.getTab(tabKey)
  const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

  if (tab === undefined || openedMainWidget === undefined) {
    return <MissingContext />
  }

  const openedMainWidgetComponent = widgetRegistryService.getWidget(openedMainWidget?.getComponent() ?? '')
  if (openedMainWidgetComponent?.getContextProvider === undefined) {
    return <MissingContext />
  }

  const contextProvider = openedMainWidgetComponent.getContextProvider(context, tab.children)
  if (contextProvider === undefined) {
    return <MissingContext />
  }

  return (
    <ContentLayout
      renderTopBar={
        <Toolbar
          align="center"
          position='top'
          size='small'
          theme='secondary'
        >
          <ElementToolbar
            elementType={ context.type }
            id={ context.config.id }
          />
          { context.type === 'data-object' && <DraftIndicator id={ context.config.id } /> }
        </Toolbar>
      }
    >
      {contextProvider}
    </ContentLayout>
  )
}
