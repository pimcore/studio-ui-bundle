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
import { Accordion as BaseAccordion, type AccordionProps as BaseAccordionProps } from '@Pimcore/components/accordion/accordion'
import { ObjectComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'
import { Box } from '@Pimcore/components/box/box'

export interface AccordionProps extends AbstractObjectLayoutDefinition {}

export const Accordion = ({ children, name }: AccordionProps): React.JSX.Element => {
  const items: BaseAccordionProps['items'] = children.map((child, index) => ({
    key: child.name,
    title: child.title,
    forceRender: true,
    children: (
      <ObjectComponent
        { ...child }
        key={ child.name }
      />
    )
  }))

  return (
    <Box padding={ { x: 'small', y: 'small' } }>
      <BaseAccordion
        items={ items }
        spaced
      />
    </Box>
  )
}
