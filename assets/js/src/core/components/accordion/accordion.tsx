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

import React, { useEffect, useState } from 'react'
import { Collapse, type CollapseProps, Flex } from 'antd'
import { useStyles } from '@Pimcore/components/accordion/accordion.styles'
import { type ItemType } from 'rc-collapse/es/interface'
import i18n from 'i18next'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'

export type CustomExpandIconPosition = 'start' | 'after-title' // Custom values

export interface AccordionItemType extends ItemType {
  title: React.ReactElement
  subtitle?: React.ReactElement
}

export interface AccordionProps extends Omit<CollapseProps, 'expandIconPosition'> {
  items: AccordionItemType[]
  spaced?: boolean
  expandIconPosition?: CustomExpandIconPosition
}

export const Accordion = ({
  items,
  accordion = false,
  spaced = false,
  className,
  activeKey,
  expandIconPosition = 'after-title',
  ...props
}: AccordionProps): React.JSX.Element => {
  const { styles } = useStyles()
  const [expandedIds, setExpandedIds] = useState<string[]>([])

  useEffect(() => {
    setExpandedIds([String(activeKey)])
  }, [activeKey])

  const onClickChevron = (id: string): void => {
    if (accordion) {
      setExpandedIds((prevIds) =>
        prevIds.includes(id) ? [] : [id]
      )
    } else {
      setExpandedIds((prevIds) =>
        prevIds.includes(id)
          ? prevIds.filter((expandedId) => expandedId !== id)
          : [...prevIds, id]
      )
    }
  }

  const itemsWithCardClassName = items?.map((item) => {
    const chevronClassName = ['chevron', item.key != null && expandedIds.includes(String(item.key)) ? 'chevron-up' : ''].join(' ')
    const collapsibleDisabled = item.collapsible === 'icon'

    const chevronButton = (): React.ReactElement => {
      return (
        <IconButton
          aria-label={ i18n.t('aria.notes-and-events.expand') }
          className={ 'card-title__chevron-btn' }
          icon={ 'chevron-up' }
          iconOptions={ { className: chevronClassName } }
          onClick={ () => {
            if (item.id != null) {
              onClickChevron(item.id)
            }
          } }
          role={ 'button' }
          size="small"
          type={ 'text' }
        />
      )
    }

    return ({
      ...item,
      className: [item?.className, 'card'].filter(Boolean).join(' '),
      label: <>
        <Flex
          align={ 'center' }
          vertical={ false }
        >
          {expandIconPosition === 'start' && (item.children !== null) && !collapsibleDisabled &&
                        chevronButton()}
          {item.title}
          {expandIconPosition === 'after-title' && (item.children !== null) && !collapsibleDisabled &&
                        chevronButton()}
        </Flex>
        {item.subtitle}
      </>
    })
  }) ?? []

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
      accordion={ accordion }
      activeKey={ expandedIds }
      bordered={ !spaced }
      className={ allClassNames.join(' ') }
      items={ itemsWithCardClassName }
      onChange={ (keys) => {
        setExpandedIds(Array.isArray(keys) ? keys : [keys])
      } }
      { ...props }
    />
  )
}
