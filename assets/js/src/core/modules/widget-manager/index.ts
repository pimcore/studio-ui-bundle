/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { type WidgetRestorerRegistry } from './services/widget-restorer-registry'
import { staticWidgetRestorer } from './services/static-widget-restorer'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { IframeContent } from '@Pimcore/components/iframe-content/iframe-content'
import { WidgetRegistry } from './services/widget-registry'

moduleSystem.registerModule({
  onInit: () => {
    const widgetRestorerRegistry = container.get<WidgetRestorerRegistry>(serviceIds.widgetRestorerRegistry)
    widgetRestorerRegistry.register(staticWidgetRestorer)


    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)
    widgetRegistryService.registerWidget({
      name: 'iframe-widget',
      component: IframeContent
    })
  }
})
