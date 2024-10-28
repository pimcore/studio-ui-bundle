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
import { type AbstractObjectLayoutDefinition } from '../../dynamic-type-object-layout-abstract'
import { ObjectComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'
import { Tabs, type TabsProps } from 'antd'

export interface TabpanelProps extends AbstractObjectLayoutDefinition {}

export const Tabpanel = ({ children }: TabpanelProps): React.JSX.Element => {
  const items: TabsProps['items'] = children.map((child, index) => ({
    key: child.name,
    label: child.title,
    forceRender: true,
    children: (
      <ObjectComponent
        { ...child }
        key={ child.name }
      />
    )
  }))

  return (
    <Tabs items={ items } />
  )
}
