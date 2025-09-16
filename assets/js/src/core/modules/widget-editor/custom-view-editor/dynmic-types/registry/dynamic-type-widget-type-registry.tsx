/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ItemType } from '@Pimcore/components/dropdown/dropdown'
import { DynamicTypeRegistryAbstract } from '@Pimcore/modules/element/dynamic-types/registry/dynamic-type-registry-abstract'
import { injectable } from 'inversify'
import { DynamicTypeWidgetTypeAbstract } from '../definitions/dynamic-type-widget-type-abstract'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'

@injectable()
export class DynamicTypeWidgetTypeRegistry extends DynamicTypeRegistryAbstract<DynamicTypeWidgetTypeAbstract> {
  getMenuItems(configs: any[]): ItemType[] {
    const widgetTypes: Record<string, DynamicTypeWidgetTypeAbstract[]> = {}

    this.getDynamicTypes().map((dynamicType) => {
      widgetTypes[dynamicType.group] = widgetTypes[dynamicType.group] ?? []
      widgetTypes[dynamicType.group].push(dynamicType);
    })

    return Object.entries(widgetTypes).map(([groupName, dynamicTypes]) => {
      return {
        key: groupName,
        label: groupName,
        type: 'group',
        children: dynamicTypes.map((dynamicType) => ({
          label: dynamicType.name,
          key: dynamicType.id,
          icon: <Icon value={dynamicType.icon} />,
          children: dynamicType.getSubMenuItems(
            configs.filter((config) => config.widgetType === dynamicType.id)
          )
        }))
      }
    })
  }
}
