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
import { useStyle } from './timeline-accordions.styles'
import { Accordion, type AccordionItemType } from '@Pimcore/components/accordion/accordion'

interface VersionAccordionProps {
  id: number
  item: AccordionItemType
  selected?: boolean
  className?: string
}

export const TimelineAccordions = ({
  id,
  item,
  selected = false,
  className
}: VersionAccordionProps): React.JSX.Element => {
  const { styles } = useStyle()

  return (
    <div className={ [styles.card, className].join(' ') }>
      {selected
        ? (
          <Accordion
            activeKey={ id }
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
}
