/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode } from 'react'
import { type TabNode } from 'flexlayout-react'
import { WidgetContainer } from '@Pimcore/modules/widget-manager/widget/widget-container'
import { WidgetManagerInnerContainer } from '../widget-manager-inner-container'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type WidgetRegistry } from '../services/widget-registry'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

export const widgetManagerFactory = (node: TabNode): ReactNode | undefined => {
  if (node.getComponent() === 'inner-widget-manager') {
    return <WidgetManagerInnerContainer />
  }

  const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)
  const widgetName = node.getComponent()

  if (widgetName === undefined) {
    return undefined
  }

  const widget = widgetRegistryService.getWidget(widgetName)

  if (widget === undefined) {
    trackError(new GeneralError(`Widget ${widgetName} not found`))

    return undefined
  }

  const { component } = widget

  return (
    <WidgetContainer
      component={ component }
      node={ node }
    />
  )
}
