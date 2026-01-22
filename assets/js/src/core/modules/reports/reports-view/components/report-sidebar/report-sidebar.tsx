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
import { ColumnsFilters } from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/columns-filters/columns-filters'
import { ColumnsFiltersProvider } from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/columns-filters/context/columns-filters-context'
import { useReportDataContext } from '@Pimcore/modules/reports/reports-view/context/report-data-context'
import { isEmptyValue } from '@Pimcore/utils/type-utils'

export const ReportSidebar = (): React.JSX.Element => {
  const { t } = useTranslation()

  const { reportDetailData } = useReportDataContext()

  const filterableColumnConfigurations = useMemo(() => {
    return reportDetailData?.columnConfigurations?.filter(item => !isEmptyValue(item.filterType))
  }, [reportDetailData])

  const sidebarProps = {
    entries: [
      {
        component: <ColumnsConfiguration />,
        key: 'reports-columns-configuration',
        icon: <Icon value="columns" />,
        tooltip: t('reports.grid-config.title-columns')
      }
    ]
  }

  if (!isEmpty(filterableColumnConfigurations)) {
    sidebarProps.entries.push({
      component: (
        <ColumnsFiltersProvider>
          <ColumnsFilters />
        </ColumnsFiltersProvider>
      ),
      key: 'reports-field-filters',
      icon: <Icon value="filter" />,
      tooltip: t('reports.field-filters')
    })
  }

  return (
    <Sidebar
      sizing='medium'
      { ...sidebarProps }
    />
  )
}
