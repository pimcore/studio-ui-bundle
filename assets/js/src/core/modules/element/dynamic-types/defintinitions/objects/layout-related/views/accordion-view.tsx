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

import { CollapseItem } from '@Pimcore/components/collapse/item/collapse-item'
import React from 'react'

export interface AccordionViewProps {
  title?: string
  children?: React.ReactNode
  bordered?: boolean
  collapsed?: boolean
  theme?: 'fieldset' | 'card-with-highlight'
}

export const AccordionView = ({ collapsed, bordered, ...props }: AccordionViewProps): React.JSX.Element => {
  return (
    <CollapseItem
      bordered={ bordered }
      defaultActive={ collapsed ?? false }
      forceRender
      hasContentSeparator={ props.theme !== 'fieldset' }
      label={ (<>{props.title}</>) }
      theme={ props.theme }
    >
      {props.children}
    </CollapseItem>
  )
}
