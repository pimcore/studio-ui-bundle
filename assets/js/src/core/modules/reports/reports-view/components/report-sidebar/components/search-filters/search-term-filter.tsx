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
import { useTranslation } from 'react-i18next'
import { defineFilter, type FilterControlProps } from '@Pimcore/components/filters'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import { FieldFilterOperators } from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/columns-filters/field-filters/types'
import {
  type ReportFilterContext,
  type ReportFilterContribution
} from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/filters/reports-filters'

export const REPORTS_SEARCH_FILTER_TYPE = 'system.fulltext'

const buildSearchTermFilter = (term: string): ReportFilterContribution => [
  {
    property: '',
    value: term,
    type: REPORTS_SEARCH_FILTER_TYPE,
    operator: FieldFilterOperators.LIKE
  }
]

const SearchTermControl = ({ value, onChange }: FilterControlProps<string>): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <SearchInput
      className='w-full'
      data-testid="report-search-term-input"
      maxWidth='100%'
      onChange={ (event) => { onChange(event.target.value) } }
      placeholder={ t('search') }
      value={ value }
    />
  )
}

export const searchTermFilterDescriptor = defineFilter<string, ReportFilterContribution, ReportFilterContext>({
  key: 'searchTerm',
  defaultValue: '',
  section: 'search',
  order: 0,
  isEnabled: () => true,
  Control: SearchTermControl,
  toQuery: (value) => {
    const term = value.trim()

    if (term === '') {
      return undefined
    }

    return buildSearchTermFilter(term)
  }
})
