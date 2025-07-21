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
import {
  ColumnsConfiguration
} from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/columns-configuration/columns-configuration'

export const ReportSidebar = (): React.JSX.Element => {
  const { t } = useTranslation()

  const sidebarProps = {
    entries: [
      {
        component: <ColumnsConfiguration />,
        key: 'column-configuration',
        icon: <Icon value="settings" />,
        tooltip: t('sidebar.grid_config')
      },
      {
        component: <div>Search & Filter</div>,
        key: 'search-filter',
        icon: <Icon value="filter" />,
        tooltip: t('sidebar.search_filter')
      }
    ]
  }

  return (
    <Sidebar { ...sidebarProps } />
  )
}
