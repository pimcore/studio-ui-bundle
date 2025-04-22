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
import { type CollapsibleType } from 'antd/es/collapse/CollapsePanel'

export type CustomExpandIconPosition = 'start' | 'after-title'

export type PanelTheme = 'theme-success' | 'theme-primary' | 'theme-default'

export interface AccordionItemType extends ItemType {
  title: React.ReactElement
  subtitle?: React.ReactElement
  info?: React.ReactElement | string
  disabled?: boolean
  theme?: PanelTheme
}

export interface AccordionProps extends Omit<CollapseProps, 'expandIconPosition'> {
  items: AccordionItemType[]
  spaced?: boolean
  bordered?: boolean
  table?: boolean
  expandIconPosition?: CustomExpandIconPosition
}

export const Accordion = ({
  items,
  accordion = false,
  spaced = false,
  bordered = false,
  table = false,
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
    const chevronClassName = ['accordion__chevron', item.key != null && expandedIds.includes(String(item.key)) ? 'accordion__chevron--up' : ''].join(' ')

    const chevronButton = (): React.ReactElement => {
      return (
        <IconButton
          aria-label={ i18n.t('aria.notes-and-events.expand') }
          className={ 'accordion__chevron-btn' }
          icon={ {
            value: 'chevron-up',
            className: chevronClassName
          } }
          onClick={ () => {
            if (item.id != null) {
              onClickChevron(item.id)
            }
          } }
          role={ 'button' }
          size="small"
          type={ 'text' }
          variant='minimal'
        />
      )
    }

    const { disabled, ...restItem } = item

    const collapseDisabled: { collapsible: CollapsibleType } = { collapsible: 'icon' }

    const itemClassNames = [item?.className, 'accordion__item'].filter(Boolean)
    if (item.theme !== undefined) {
      itemClassNames.push(`accordion__item--${item.theme}`)
    }

    return ({
      ...restItem,
      className: itemClassNames.join(' '),
      label: <>
        <Flex
          align={ 'baseline' }
        >
          {expandIconPosition === 'start' && (item.children !== null) && !(item.disabled === true) &&
                        chevronButton()}
          {item.title}
          {expandIconPosition === 'after-title' && (item.children !== null) && !(item.disabled === true) &&
                        chevronButton()}

          <span className="accordion-item__header-info">{item.info !== null && item.info}</span>
        </Flex>
        {item.subtitle}
      </>,
      title: '',
      subtitle: '',
      ...(item.disabled ?? false ? collapseDisabled : {})
    })
  }) ?? []

  const allClassNames = [
    'accordion',
    className,
    styles.accordion
  ]

  if (spaced) {
    allClassNames.push('accordion--spaced', styles.spaced)
    allClassNames.push(styles.spaced)
  }

  if (bordered) {
    allClassNames.push('accordion--bordered', styles.bordered)
    allClassNames.push(styles.bordered)
  }

  if (table) {
    allClassNames.push('accordion--table', styles.table)
    allClassNames.push(styles.table)
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
