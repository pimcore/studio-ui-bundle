/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { type AbstractObjectLayoutDefinition } from '../../dynamic-type-object-layout-abstract'
import { ObjectComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'
import { Tabpanel, type TabpanelItem } from '@Pimcore/components/tabpanel/tabpanel'
import { type ITabsProps } from '@Pimcore/components/tabs/tabs'

export interface ObjectTabpanelProps extends AbstractObjectLayoutDefinition {
  title?: string
  border?: boolean
  collapsible?: boolean
  collapsed?: boolean
  children: AbstractObjectLayoutDefinition[]
  tabPosition?: ITabsProps['tabPosition']
  hasStickyHeader?: boolean
}

export const ObjectTabpanel = ({ children, noteditable, ...props }: ObjectTabpanelProps): React.JSX.Element => {
  // Convert AbstractObjectLayoutDefinition[] to TabpanelItem[]
  const items: TabpanelItem[] = children.map((child, index) => ({
    key: child.name ?? index.toString(),
    label: child.title ?? child.name ?? `Tab ${index + 1}`,
    children: (
      <ObjectComponent
        { ...child }
        noteditable={ noteditable }
      />
    )
  }))

  return (
    <Tabpanel
      { ...props }
      items={ items }
    />
  )
}
