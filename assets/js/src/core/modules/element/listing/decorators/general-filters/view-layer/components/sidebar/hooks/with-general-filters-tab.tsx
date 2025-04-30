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

export const generalFiltersTabKey = 'general-filters'

export const withGeneralFiltersTab = (useBaseHook: AbstractDecoratorProps['useSidebarOptions']): AbstractDecoratorProps['useSidebarOptions'] => {
  const useSidebarGeneralFiltersExtension: typeof useBaseHook = () => {
    const { getProps: baseGetProps } = useBaseHook()
    const { t } = useTranslation()

    const getProps: typeof baseGetProps = () => {
      const baseProps = baseGetProps()
      const sidebarHighlights: typeof baseProps['highlights'] = baseProps.highlights ?? []

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
