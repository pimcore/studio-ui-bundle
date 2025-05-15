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
import { BaseView } from '../../views/base-view'
import { Collapse, type CollapseProps } from '@Pimcore/components/collapse/collapse'

export interface AccordionProps extends AbstractObjectLayoutDefinition {
  title?: string
  border?: boolean
  collapsible?: boolean
  collapsed?: boolean
}

export const Accordion = ({ children, title, border, collapsed, collapsible, noteditable }: AccordionProps): React.JSX.Element => {
  const items: CollapseProps['items'] = children.map((child, index) => ({
    key: index,
    label: child.title,
    forceRender: true,
    children: (
      <ObjectComponent
        { ...{ ...child, title: '' } }
        noteditable={ noteditable }
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
