/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode } from 'react'
import { isNil } from 'lodash'
import { type AbstractObjectLayoutDefinition } from '../../dynamic-type-object-layout-abstract'
import { ObjectComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'
import { Tabpanel, type TabpanelItem } from '@Pimcore/components/tabpanel/tabpanel'
import { type ITabsProps } from '@Pimcore/components/tabs/tabs'
import { Icon, type ElementIcon } from '@Pimcore/components/icon/icon'
import { Flex } from '@Pimcore/components/flex/flex'
import { useTranslation } from 'react-i18next'
import { isNonEmptyString } from '@sdk/utils'

export interface ObjectTabpanelProps extends AbstractObjectLayoutDefinition {
  title?: string
  border?: boolean
  collapsible?: boolean
  collapsed?: boolean
  children: AbstractObjectLayoutDefinition[]
  tabPosition?: ITabsProps['tabPosition']
  hasStickyHeader?: boolean
}

const isPanelFieldtype = (child: AbstractObjectLayoutDefinition): boolean =>
  child.fieldtype === 'panel' || child.fieldType === 'panel'

const composeTabLabel = (rawTitle: string | undefined, icon: ElementIcon | null | undefined, fallback: string): ReactNode => {
  const titleText = isNonEmptyString(rawTitle) ? rawTitle : fallback

  if (isNil(icon)) {
    return titleText
  }

  return (
    <Flex
      align='center'
      gap='extra-small'
    >
      <Icon
        type={ icon.type }
        value={ icon.value }
      />
      {titleText}
    </Flex>
  )
}

export const ObjectTabpanel = ({ children, noteditable, ...props }: ObjectTabpanelProps): React.JSX.Element => {
  const { t } = useTranslation()

  const items: TabpanelItem[] = children.map((child, index) => {
    const name = child.name as string | undefined
    const fallback = name ?? `Tab ${index + 1}`
    const rawTitle = child.title as string | undefined
    const translatedTitle = isNonEmptyString(rawTitle) ? t(rawTitle) : undefined
    const label = composeTabLabel(translatedTitle, child.icon as ElementIcon | null | undefined, fallback)

    const childProps: AbstractObjectLayoutDefinition = isPanelFieldtype(child)
      ? { ...child, title: '', border: false, collapsible: false, icon: null }
      : child

    return {
      key: name ?? index.toString(),
      label,
      children: (
        <ObjectComponent
          { ...childProps }
          noteditable={ noteditable === true || childProps.noteditable }
        />
      )
    }
  })

  return (
    <Tabpanel
      { ...props }
      items={ items }
    />
  )
}
