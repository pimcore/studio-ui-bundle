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

import { Accordion, type AccordionProps } from '@Pimcore/components/accordion/accordion'
import React from 'react'

export interface AccordionViewProps {
  title?: string
  children?: React.ReactNode
  bordered?: boolean
  collapsed?: boolean
}

export const AccordionView = ({ collapsed, bordered, ...props }: AccordionViewProps): React.JSX.Element => {
  const item: AccordionProps['items'][0] = {
    key: '0',
    title: <>{props.title}</>,
    children: props.children,
    forceRender: true
  }

  return (
    <Accordion
      bordered={ bordered }
      defaultActiveKey={ collapsed ?? false ? '0' : undefined }
      ghost
      items={ [item] }
    >
      {props.children}
    </Accordion>
  )
}
