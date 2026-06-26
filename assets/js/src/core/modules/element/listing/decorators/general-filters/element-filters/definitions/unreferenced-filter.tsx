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
import { Checkbox } from 'antd'
import { useTranslation } from 'react-i18next'
import { defineFilter, type FilterControlProps } from '@Pimcore/components/filters'
import { type ColumnFilter } from '@Pimcore/modules/app/types/column-filter'
import { type ElementFilterQueryPart, type ElementFilterContext } from '../element-filter-types'

export const unreferencedFilterType = 'system.unreferenced'

const UnreferencedControl = ({ value, onChange }: FilterControlProps<boolean>): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Checkbox
      checked={ value }
      onChange={ (e) => { onChange(e.target.checked) } }
    >
      {t('element.sidebar.filter.only-unreferenced')}
    </Checkbox>
  )
}

export const unreferencedFilterDescriptor = defineFilter<boolean, ElementFilterQueryPart, ElementFilterContext>({
  key: 'unreferenced',
  defaultValue: false,
  section: 'controls',
  order: 30,
  isEnabled: (context) => context.config.showOnlyUnreferencedFilter === true,
  isVisible: (context) => context.config.showOnlyUnreferencedFilter === true,
  Control: UnreferencedControl,
  toQuery: (value) => {
    if (!value) {
      return undefined
    }

    const filter: ColumnFilter & { key: string } = { key: 'unreferenced', type: unreferencedFilterType, filterValue: true }

    return { kind: 'columnFilters', filters: [filter] }
  }
})
