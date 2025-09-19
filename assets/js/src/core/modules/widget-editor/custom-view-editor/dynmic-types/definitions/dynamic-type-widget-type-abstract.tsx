/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type DynamicTypeAbstract } from '@Pimcore/modules/element/dynamic-types/registry/dynamic-type-registry-abstract'
import { type WidgetConfig } from '@sdk/api/perspectives'
import { Icon, type ItemType } from '@sdk/components'
import { injectable } from 'inversify'
import React from 'react'

@injectable()
export abstract class DynamicTypeWidgetTypeAbstract implements DynamicTypeAbstract {
  abstract readonly id: string
  name: string
  group: string
  icon: string

  abstract form (): React.JSX.Element

  getSubMenuItems (configs: WidgetConfig[], onWidgetClick?: (config: WidgetConfig) => void): ItemType[] {
    return configs.map((config) => {
      return {
        label: config.name,
        key: config.id,
        icon: <Icon value={ config.icon.value } />,
        onClick: onWidgetClick !== undefined ? () => { onWidgetClick(config) } : undefined
      }
    })
  }
}
