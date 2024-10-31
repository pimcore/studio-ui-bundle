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
import { AccordionView } from './accordion-view'
import { CardView } from './card-view'
import { isEmptyValue } from '@Pimcore/utils/type-utils'

export interface BaseViewProps {
  title?: string
  collapsible?: boolean
  collapsed?: boolean
  children?: React.ReactNode
  border?: boolean
}

export const BaseView = (props: BaseViewProps): React.JSX.Element => {
  const isPaddedLayout = props.border === true || props.collapsible === true || !isEmptyValue(props.title)

  if (!isPaddedLayout) {
    return (
      <>
        {props.children}
      </>
    )
  }

  if (props.collapsible === true) {
    return (
      <AccordionView
        bordered={ props.border }
        collapsed={ props.collapsed }
        title={ props.title }
      >{props.children}</AccordionView>
    )
  }

  return (
    <CardView
      bordered={ props.border }
      title={ props.title }
    >{props.children}</CardView>
  )
}
