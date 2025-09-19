/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { container } from '@Pimcore/app/depency-injection'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { serviceIds } from '@sdk/app'
import { type DynamicTypeWidgetTypeElementTree } from './dynmic-types/definitions/dynamic-type-widget-type-element-tree'
import { type DynamicTypeWidgetTypeRegistry } from './dynmic-types/registry/dynamic-type-widget-type-registry'

moduleSystem.registerModule({
  onInit: () => {
    const widgetRegistry = container.get<DynamicTypeWidgetTypeRegistry>(serviceIds['DynamicTypes/WidgetEditor/WidgetTypeRegistry'])

    widgetRegistry.registerDynamicType(
      container.get<DynamicTypeWidgetTypeElementTree>(serviceIds['DynamicTypes/WidgetEditor/ElementTree'])
    )
  }
})
