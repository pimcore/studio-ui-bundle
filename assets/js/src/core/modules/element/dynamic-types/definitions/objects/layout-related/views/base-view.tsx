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

import React, { useMemo } from 'react'
import { isEmpty } from 'lodash'
import { AccordionView, type AccordionViewProps } from './accordion-view'
import { CardView, type CardViewProps } from './card-view'

export type BaseViewProps = (CardViewProps | AccordionViewProps) & {
  border?: boolean
  extra?: CardViewProps['extra'] | AccordionViewProps['extra']
}

export const BaseView = ({ theme = 'card-with-highlight', ...props }: BaseViewProps): React.JSX.Element => {
  const isPaddedLayout = props.border === true || props.collapsible === true || !isEmpty(props.title)

  return useMemo(() => {
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
          collapsible
          contentPadding={ props.contentPadding }
          extra={ props.extra }
          theme={ theme }
          title={ props.title }
        >{props.children}</AccordionView>
      )
    }

    return (
      <CardView
        bordered={ props.border }
        contentPadding={ props.contentPadding }
        extra={ props.extra }
        extraPosition={ props.extraPosition }
        theme={ theme }
        title={ props.title }
      >{props.children}</CardView>
    )
  }, [props, isPaddedLayout])
}
