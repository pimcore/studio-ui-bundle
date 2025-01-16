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

import { type BoxProps } from '@Pimcore/components/box/box'
import { CollapseItem } from '@Pimcore/components/collapse/item/collapse-item'
import React, { type ReactNode } from 'react'

export interface AccordionViewProps {
  title?: ReactNode
  children?: React.ReactNode
  bordered?: boolean
  collapsed?: boolean
  collapsible: true
  theme?: 'fieldset' | 'card-with-highlight' | 'default'
  contentPadding?: BoxProps['padding']
  extra?: ReactNode
  extraPosition?: 'start' | 'end'
}

export const AccordionView = ({ collapsed, bordered, ...props }: AccordionViewProps): React.JSX.Element => {
  return (
    <CollapseItem
      bordered={ bordered }
      contentPadding={ props.contentPadding }
      defaultActive={ !(collapsed ?? true) }
      extra={ props.extra }
      extraPosition={ props.extraPosition }
      forceRender
      hasContentSeparator={ props.theme !== 'fieldset' }
      label={ (<>{props.title}</>) }
      size='small'
      theme={ props.theme }
    >
      {props.children}
    </CollapseItem>
  )
}
