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
import { type WidgetTypeRegistry } from './registry/widget-type-registry'
import { serviceIds } from '@sdk/app'
import { container } from '@Pimcore/app/depency-injection'
import { ElementTreeWidgetTypeForm } from './components/widget-type-form/element-tree-widget-type-form'

moduleSystem.registerModule({
  onInit: () => {
    const widgetRegistry = container.get<WidgetTypeRegistry>(serviceIds['WidgetEditor/WidgetTypeRegistry'])

    widgetRegistry.registerWidgetType({
      id: 'element_tree',
      form: ElementTreeWidgetTypeForm
    })

    widgetRegistry.registerWidgetType({
      id: 'foo',
      form: ElementTreeWidgetTypeForm
    })

    widgetRegistry.registerWidgetType({
      id: 'bar',
      form: ElementTreeWidgetTypeForm
    })
  }
})
