/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useState } from 'react'
import { isUndefined } from 'lodash'
import { SplitLayout } from '@Pimcore/components/split-layout/split-layout'
import { Content } from '@Pimcore/components/content/content'
import { useReportEditorData } from '@Pimcore/modules/reports/reports-editor/hooks/useReportEditorData'
import { type BundleCustomReportsConfigurationTreeNode } from '@Pimcore/modules/reports/custom-reports-api-slice.gen'
import { Tabs } from '@Pimcore/components/tabs/tabs'
import { ReportsSidebar } from '@Pimcore/modules/reports/reports-editor/components/reports-sidebar/reports-sidebar'
import { ReportConfiguration } from '@Pimcore/modules/reports/reports-editor/components/report-configuration/report-configuration'

export const ReportsEditor = (): React.JSX.Element => {
  const { isReportsConfigTreeLoading, reportsConfigTreeData } = useReportEditorData()

  const [openedReports, setOpenedReports] = useState<BundleCustomReportsConfigurationTreeNode[]>([])
  const [activeTabKey, setActiveTabKey] = useState<string | undefined>(undefined)

  const tabItems = useMemo(() =>
    openedReports.map((report) => ({
      key: report.id,
      label: report.text,
      children: <ReportConfiguration report={ report } />
    })),
  [openedReports]
  )

  const handleOpenReport = (report: BundleCustomReportsConfigurationTreeNode): void => {
    const isAlreadyOpened = openedReports.some(item => item.id === report.id)

    if (!isAlreadyOpened) {
      setOpenedReports([...openedReports, report])
    }

    setActiveTabKey(report.id)
  }

  const handleCloseTab = (key: string): void => {
    const targetIndex = openedReports.findIndex((tab) => tab.id === key)
    const updatedOpenedReports = openedReports.filter((report) => report.id !== key)

    if (key === activeTabKey) {
      const prevTab = openedReports[targetIndex - 1]

      setActiveTabKey(!isUndefined(prevTab) ? prevTab.id : undefined)
    }

    setOpenedReports(updatedOpenedReports)
  }

  const handleChangeTab = (key: string): void => {
    setActiveTabKey(key)
  }

  return (
    <SplitLayout
      leftItem={ {
        minSize: 150,
        size: 25,
        children: (
          <Content
            loading={ isReportsConfigTreeLoading }
            padded
          >
            <ReportsSidebar
              handleOpenReport={ handleOpenReport }
              reportsList={ reportsConfigTreeData }
            />
          </Content>
        )
      } }
      resizeAble
      rightItem={ {
        minSize: 300,
        size: 75,
        children: (
          <Tabs
            activeKey={ activeTabKey }
            items={ tabItems }
            onChange={ handleChangeTab }
            onClose={ handleCloseTab }
          />
        )
      } }
      withDivider
    />
  )
}
