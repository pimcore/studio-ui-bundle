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
import { Collapse, type CollapseProps, Flex, type FlexProps } from 'antd'
import cn from 'classnames'
import { useStyles } from '@Pimcore/components/accordion/accordion.styles'
import { type ItemType } from 'rc-collapse/es/interface'
import { useTranslation } from 'react-i18next'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { type CollapsibleType } from 'antd/es/collapse/CollapsePanel'

export type CustomExpandIconPosition = 'start' | 'after-title'

export type PanelTheme = 'theme-success' | 'theme-primary' | 'theme-default'

export interface AccordionItemType extends ItemType {
  title: React.ReactElement
  subtitle?: React.ReactElement
  info?: string
  disabled?: boolean
  theme?: PanelTheme
}

export interface AccordionProps extends Omit<CollapseProps, 'expandIconPosition'> {
  items: AccordionItemType[]
  spaced?: boolean
  bordered?: boolean
  expandIconPosition?: CustomExpandIconPosition
  headerAlign?: FlexProps['align']
}

export const Accordion = ({
  items,
  accordion = false,
  spaced = false,
  bordered = false,
  headerAlign = 'baseline',
  className,
  activeKey,
  expandIconPosition = 'after-title',
  ...props
}: AccordionProps): React.JSX.Element => {
  const { styles } = useStyles()
  const [expandedIds, setExpandedIds] = useState<string[]>([])

  const { t } = useTranslation()

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
    const chevronClassName = cn('accordion__chevron', {
      'accordion__chevron--up': item.key != null && expandedIds.includes(String(item.key))
    })

    const chevronButton = (): React.ReactElement => {
      return (
        <IconButton
          aria-label={ t('aria.notes-and-events.expand') }
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

    const itemClassNames = cn(
      item?.className,
      'accordion__item',
      { [`accordion__item--${item.theme}`]: item.theme !== undefined }
    )

    return ({
      ...restItem,
      className: itemClassNames,
      label: <>
        <Flex
          align={ headerAlign }
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
      ...(item.disabled ?? false ? collapseDisabled : {})
    })
  }) ?? []

  const allClassNames = cn('accordion', className, styles.accordion, {
    'accordion--spaced': spaced,
    [styles.spaced]: spaced,
    'accordion--bordered': bordered,
    [styles.bordered]: bordered
  })

  return (
    <Collapse
      accordion={ accordion }
      activeKey={ expandedIds }
      bordered={ !spaced }
      className={ allClassNames }
      items={ itemsWithCardClassName }
      onChange={ (keys) => {
        setExpandedIds(Array.isArray(keys) ? keys : [keys])
      } }
      { ...props }
    />
  )
}
