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
import { useInjection } from '@Pimcore/app/depency-injection'
import { type WidgetRegistry } from '../services/widget-registry'
import { TabTitleContainer, type TabTitleContainerProps } from './tab-title-container'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'

export interface TabTitleOuterContainerProps {
  node: TabTitleContainerProps['node']
}

export const TabTitleOuterContainer = ({ node }: TabTitleOuterContainerProps): React.JSX.Element => {
  const componentName = node.getComponent()
  const widgetConfig = useInjection<WidgetRegistry>(serviceIds.widgetManager)

  const config = widgetConfig.getWidget(componentName!)

  let Component = (
    <TabTitleContainer
      modified={ false }
      node={ node }
    />
  )

  if (config?.titleComponent !== undefined) {
    Component = <config.titleComponent node={ node } />
  }

  return <> {Component} </>
}
