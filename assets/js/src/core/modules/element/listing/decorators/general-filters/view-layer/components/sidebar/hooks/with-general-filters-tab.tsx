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
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { Icon } from '@Pimcore/components/icon/icon'
import { FilterContainer } from '../tabs/filters/filter-container'
import { useAppliedFilters } from '../../../../element-filters/stores'
import { readElementFilterValues } from '../../../../element-filters/use-element-filter-values'

export const generalFiltersTabKey = 'general-filters'

export const withGeneralFiltersTab = (useBaseHook: AbstractDecoratorProps['useSidebarOptions']): AbstractDecoratorProps['useSidebarOptions'] => {
  const useSidebarGeneralFiltersExtension: typeof useBaseHook = () => {
    const { getProps: baseGetProps } = useBaseHook()
    const { t } = useTranslation()
    const { values } = useAppliedFilters()

    const getProps: typeof baseGetProps = () => {
      const baseProps = baseGetProps()
      let sidebarHighlights: typeof baseProps['highlights'] = baseProps.highlights ?? []

      const filterValues = readElementFilterValues(values)
      const hasActiveFilters =
        filterValues.searchTerm !== '' ||
        filterValues.directChildren === true ||
        filterValues.unreferenced === true ||
        filterValues.pql !== '' ||
        filterValues.fieldFilters.length > 0

      if (hasActiveFilters) {
        if (!sidebarHighlights.includes(generalFiltersTabKey)) {
          sidebarHighlights = [...sidebarHighlights, generalFiltersTabKey]
        }
      } else {
        sidebarHighlights = sidebarHighlights.filter((highlight) => highlight !== generalFiltersTabKey)
      }

      return {
        ...baseProps,
        highlights: sidebarHighlights,
        entries: [
          {
            component: <FilterContainer />,
            key: generalFiltersTabKey,
            icon: <Icon value="filter" />,
            tooltip: t('sidebar.search_filter')
          },
          ...baseProps.entries
        ]
      }
    }

    return {
      getProps
    }
  }

  return useSidebarGeneralFiltersExtension
}
