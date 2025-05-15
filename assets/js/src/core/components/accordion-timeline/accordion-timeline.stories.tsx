/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Meta } from '@storybook/react'
import { AccordionTimeline } from '@Pimcore/components/accordion-timeline/accordion-timeline'
import { type AccordionItemType } from '@Pimcore/components/accordion/accordion'
import React from 'react'

const config: Meta = {
  title: 'Components/Data Display/AccordionTimeline',
  component: AccordionTimeline,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
}
export default config

const item1: AccordionItemType = {
  key: '1',
  theme: 'theme-success',
  title: <span>This is panel header 1</span>,
  subtitle: <span style={ { color: 'grey' } }>I ate a clock yesterday, and it was so time-consuming, especially when I went back for seconds!</span>,
  children: <p>Mount Vesuvius is a stratovolcano, which is an extremely deadly form of volcano.</p>
}

const Item2: AccordionItemType = {
  key: '2',
  theme: 'theme-primary',
  title: <span>This is panel header 2</span>,
  subtitle: <span style={ { color: 'grey' } }>I ate a clock yesterday, and it was so time-consuming, especially when I went back for seconds!</span>,
  children: <p>Mount Vesuvius is a stratovolcano, which is an extremely deadly form of volcano.</p>
}

const items = [item1, Item2]

export const DefaultAccordionTimeline = {
  args: {
    ghost: true,
    items
  }
}
