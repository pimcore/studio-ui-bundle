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
import { useStyle } from './accordion-timeline.styles'
import { VerticalTimeline } from '@Pimcore/components/vertical-timeline/vertical-timeline'
import { Accordion, type AccordionItemType } from '@Pimcore/components/accordion/accordion'

export interface TimeLineAccordionItemType extends AccordionItemType {
  selected?: boolean
  key: string
}

interface AccordionTimelineProps {
  items: TimeLineAccordionItemType[]
}

export const AccordionTimeline = ({ items }: AccordionTimelineProps): React.JSX.Element => {
  const { styles } = useStyle()

  const ItemAccordions = items.map((item) => {
    return (
      <div
        className={ [styles.card, item.className].join(' ') }
        key={ item.key }
      >
        {item.selected === true
          ? (
            <Accordion
              activeKey={ item.key }
              expandIconPosition={ 'after-title' }
              items={ [item] }
            />
            )
          : (
            <Accordion
              expandIconPosition={ 'after-title' }
              items={ [item] }
            />
            )
        }
      </div>
    )
  })

  return (
    <VerticalTimeline timeStamps={ ItemAccordions } />
  )
}
