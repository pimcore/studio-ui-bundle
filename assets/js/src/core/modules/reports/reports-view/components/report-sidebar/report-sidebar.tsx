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
import { ColumnsConfiguration } from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/columns-configuration/columns-configuration'
import { ColumnsFilters } from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/columns-filters/columns-filters'
import { type BundleCustomReportsDetails } from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'

export const ReportSidebar = ({ reportData }: { reportData: BundleCustomReportsDetails }): React.JSX.Element => {
  const { t } = useTranslation()

  const sidebarProps = {
    entries: [
      {
        component: <ColumnsConfiguration />,
        key: 'reports-columns-configuration',
        icon: <Icon value="columns" />,
        tooltip: t('sidebar.grid_config')
      },
      {
        component: <ColumnsFilters reportData={ reportData } />,
        key: 'reports-field-filters',
        icon: <Icon value="filter" />,
        tooltip: t('reports.field-filters')
      }
    ]
  }

  return (
    <Sidebar { ...sidebarProps } />
  )
}
