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

import React, { useState } from 'react'
import { Collapse, type CollapseProps } from 'antd'
import { useStyles } from '@Pimcore/components/accordion/accordion.styles'
import { type ItemType } from 'rc-collapse/es/interface'
import { Button } from '@Pimcore/components/button/button'
import { Icon } from '@Pimcore/components/icon/icon'
import i18n from 'i18next'

export interface AccordionProps extends CollapseProps {
  items: ItemType[]
  exclusive?: boolean
  spaced?: boolean
  header: string
  subheader?: string
}

export const Accordion = ({ items, exclusive = false, spaced = false, className, ...props }: AccordionProps): React.JSX.Element => {
  const { styles } = useStyles()
  const [isExpanded, setIsExpanded] = useState(false)

  const itemsWithCardClassName = items?.map((i) => ({
    ...i,
    className: [i?.className, 'card'].filter(Boolean).join(' '),
    label: <>
      <span></span>
      { (description !== '' || showDetails) && (
      <Button
        aria-label={ i18n.t('aria.notes-and-events.expand') }
        className={ 'card-title__chevron-btn' }
        icon={ <Icon
          className={ ['chevron', isExpanded ? 'chevron-up' : ''].join(' ') }
          name={ 'chevron-up' }
               /> }
        onClick={ onClickChevron }
        role={ 'button' }
        size="small"
        type={ 'text' }
      />
      )}
      <span></span>
    </>
  })) ?? []

  const allClassNames = [
    'accordion',
    className,
    styles.accordion
  ]

  if (spaced) {
    allClassNames.push('spaced')
    allClassNames.push(styles.spaced)
  }

  return (
    <Collapse
      accordion={ exclusive }
      bordered={ !spaced }
      className={ allClassNames.join(' ') }
      expandIconPosition='end'
      items={ itemsWithCardClassName }
      { ...props }
    />
  )
}
