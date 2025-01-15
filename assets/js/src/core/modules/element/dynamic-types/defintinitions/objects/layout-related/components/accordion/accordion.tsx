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
import { BaseView } from '../../views/base-view'
import { Collapse, type CollapseProps } from '@Pimcore/components/collapse/collapse'

export interface AccordionProps extends AbstractObjectLayoutDefinition {
  title?: string
  border?: boolean
  collapsible?: boolean
  collapsed?: boolean
}

export const Accordion = ({ children, title, border, collapsed, collapsible }: AccordionProps): React.JSX.Element => {
  const items: CollapseProps['items'] = children.map((child, index) => ({
    key: index,
    label: child.title,
    forceRender: true,
    children: (
      <ObjectComponent
        { ...{ ...child, title: '' } }
      />
    )
  }))

  return (
    <BaseView
      border={ border }
      collapsed={ collapsed }
      collapsible={ collapsible }
      title={ title }
    >
      <Collapse
        accordion
        bordered
        items={ items }
        size='small'
      />
    </BaseView>
  )
}
