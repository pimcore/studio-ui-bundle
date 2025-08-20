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
import { useTranslation } from 'react-i18next'
import { ConfigLayout } from '@Pimcore/components/predefined-layouts/config/config-layout'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Tabs } from '@Pimcore/components/tabs/tabs'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Button } from '@Pimcore/components/button/button'
import { Content } from '@Pimcore/components/content/content'
import { ReportsSidebar } from '@Pimcore/modules/reports/reports-editor/components/reports-sidebar/reports-sidebar'
import { ReportConfiguration } from '@Pimcore/modules/reports/reports-editor/components/report-configuration/report-configuration'
import { type BundleCustomReportsConfigurationTreeNode, useCustomReportsConfigGetTreeQuery } from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'
import { useStyles } from './reports-editor.styles'

export const ReportsEditor = (): React.JSX.Element => {
  const { data: reportsConfigTreeData, isLoading, isFetching, refetch } = useCustomReportsConfigGetTreeQuery({ page: 1, pageSize: 9999 })

  const [openedReports, setOpenedReports] = useState<BundleCustomReportsConfigurationTreeNode[]>([])
  const [activeTabKey, setActiveTabKey] = useState<string | undefined>(undefined)

  const handleSave = (): void => {
    console.log('Form Values')
  }

  const { styles } = useStyles()
  const { t } = useTranslation()

  const tabItems = useMemo(() => {
    const existingReportIds = new Set(reportsConfigTreeData?.items?.map(report => report.id))

    return openedReports
      .filter(report => existingReportIds.has(report.id))
      .map((report) => ({
        key: report.id,
        label: report.text,
        children: <ReportConfiguration report={ report } />
      }))
  }, [reportsConfigTreeData, openedReports])

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

  const mainContent = (): React.JSX.Element => {
    if (isUndefined(activeTabKey)) {
      return <Content none />
    }

    return (
      <ContentLayout
        renderToolbar={ (
          <Toolbar justify="flex-end">
            <Button
              onClick={ handleSave }
              type="primary"
            >
              {t('save')}
            </Button>
          </Toolbar>
        ) }
      >
        <Tabs
          activeKey={ activeTabKey }
          className={ styles.tabs }
          items={ tabItems }
          onChange={ handleChangeTab }
          onClose={ handleCloseTab }
        />
      </ContentLayout>
    )
  }

  return (
    <ConfigLayout
      leftItem={ {
        children: (
          <ReportsSidebar
            handleCloseReport={ handleCloseTab }
            handleOpenReport={ handleOpenReport }
            isFetching={ isFetching }
            isLoading={ isLoading }
            refetch={ refetch }
            reportsList={ reportsConfigTreeData }
          />
        )
      } }
      rightItem={ { children: mainContent() } }
    />
  )
}
