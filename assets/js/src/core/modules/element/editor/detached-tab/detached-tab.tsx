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
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { serviceIds } from '@Pimcore/app/config/services'
import { type WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { container } from '@Pimcore/app/depency-injection'
import { type TabManager } from '@Pimcore/modules/element/editor/tab-manager/tab-manager'

interface IDetachedTabProps {
  tabKey: string
  tabManagerServiceId: keyof typeof serviceIds
}

export const DetachedTab = ({ tabManagerServiceId, tabKey }: IDetachedTabProps): React.JSX.Element => {
  const { getOpenedMainWidget } = useWidgetManager()
  const tabManager = container.get<TabManager>(tabManagerServiceId)
  const tab = tabManager.getTab(tabKey)
  const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)
  const openedMainWidget = getOpenedMainWidget()
  const missingContext = <div>Missing context!</div>

  if (openedMainWidget === undefined || tab === undefined) {
    return missingContext
  }

  const openedMainWidgetComponent = widgetRegistryService.getWidget(openedMainWidget?.getComponent() ?? '')
  if (openedMainWidgetComponent?.getContextProvider === undefined) {
    return missingContext
  }

  const context = openedMainWidgetComponent.getContextProvider(openedMainWidget, tab.children)
  if (context === undefined) {
    return missingContext
  }

  return context
}
