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
import cn from 'classnames'
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
        className={ cn(styles.card, item.className) }
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
