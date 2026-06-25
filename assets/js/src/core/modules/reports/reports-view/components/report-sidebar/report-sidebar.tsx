/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'lodash'
import { Sidebar } from '@Pimcore/components/sidebar/sidebar'
import { Icon } from '@Pimcore/components/icon/icon'
import { ColumnsConfiguration } from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/columns-configuration/columns-configuration'
import {
  ReportsDraftFiltersProvider,
  ReportsDraftFiltersReset,
  reportsFilterDescriptors
} from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/filters/reports-filters'
import { SearchFilters } from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/search-filters/search-filters'
import { useReportDataContext } from '@Pimcore/modules/reports/reports-view/context/report-data-context'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { type ISidebarEntry } from '@Pimcore/modules/element/sidebar/sidebar-manager'

export const ReportSidebar = (): React.JSX.Element => {
  const { t } = useTranslation()

  const { reportDetailData } = useReportDataContext()

  const filterableColumnConfigurations = useMemo(() => {
    return reportDetailData?.columnConfigurations?.filter(item => !isEmptyValue(item.filterType))
  }, [reportDetailData])

  const sidebarProps = useMemo(() => {
    const entries: ISidebarEntry[] = [
      {
        component: <ColumnsConfiguration />,
        key: 'reports-columns-configuration',
        icon: <Icon value="columns" />,
        tooltip: t('reports.grid-config.title-columns')
      }
    ]

    if (!isEmpty(filterableColumnConfigurations)) {
      entries.push({
        component: <SearchFilters />,
        key: 'reports-search-filters',
        icon: <Icon value="filter" />,
        tooltip: t('sidebar.search_filter')
      })
    }

    return { entries }
  }, [filterableColumnConfigurations, t])

  return (
    <ReportsDraftFiltersProvider descriptors={ reportsFilterDescriptors }>
      <ReportsDraftFiltersReset>
        <Sidebar
          sizing='large'
          { ...sidebarProps }
        />
      </ReportsDraftFiltersReset>
    </ReportsDraftFiltersProvider>
  )
}
