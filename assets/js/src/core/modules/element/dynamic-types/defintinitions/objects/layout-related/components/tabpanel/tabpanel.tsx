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
import { Box } from '@Pimcore/components/box/box'
import { BaseView } from '../../views/base-view'
import { type ITabsProps, Tabs } from '@Pimcore/components/tabs/tabs'

export interface TabpanelProps extends AbstractObjectLayoutDefinition {
  title?: string
  border?: boolean
  collapsible?: boolean
  collapsed?: boolean
  children: AbstractObjectLayoutDefinition[]
  tabPosition?: ITabsProps['tabPosition']
  hasStickyHeader?: boolean
}

export const Tabpanel = ({ children, border, collapsed, collapsible, title, hasStickyHeader = false, ...props }: TabpanelProps): React.JSX.Element => {
  const items: ITabsProps['items'] = children.map((child, index) => {
    const tabPanelChild = {
      ...child,
      title: undefined
    }

    return {
      key: index.toString(),
      label: child.title,
      forceRender: true,
      children: (
        <Box padding={ 'small' }>
          <ObjectComponent
            { ...tabPanelChild }
          />
        </Box>
      )
    }
  })

  return (
    <BaseView
      border={ border }
      collapsed={ collapsed }
      collapsible={ collapsible }
      contentPadding={ border === true ? 'none' : undefined }
      title={ title }
    >
      <Tabs
        hasStickyHeader={ hasStickyHeader }
        items={ items }
        size='small'
        tabPosition={ props.tabPosition }
      />
    </BaseView>
  )
}
