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
import { Sidebar } from '@Pimcore/components/sidebar/sidebar'
import { Icon } from '@Pimcore/components/icon/icon'
import { type ISidebarEntry } from '@Pimcore/modules/element/sidebar/sidebar-manager'
import { TranslationsDraftFiltersProvider, translationsFilterDescriptors, useTranslationsAppliedFilters } from '@Pimcore/modules/translations/filters/filters'
import { FilterTab } from '@Pimcore/modules/translations/translations-sidebar/components/filter-tab/filter-tab'

export const TranslationsSidebar = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { values: appliedValues } = useTranslationsAppliedFilters()

  const entries: ISidebarEntry[] = [
    {
      component: <FilterTab />,
      key: 'translations-filter',
      icon: <Icon value="filter" />,
      tooltip: t('sidebar.search_filter')
    }
  ]

  return (
    <TranslationsDraftFiltersProvider
      descriptors={ translationsFilterDescriptors }
      initialValues={ appliedValues }
    >
      <Sidebar
        entries={ entries }
        sizing='large'
      />
    </TranslationsDraftFiltersProvider>
  )
}
