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
import { ConfigLayout } from '@Pimcore/components/predefined-layouts/config/config-layout'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Tabs } from '@Pimcore/components/tabs/tabs'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Content } from '@Pimcore/components/content/content'
import { ReportsSidebar } from '@Pimcore/modules/reports/reports-editor/components/reports-sidebar/reports-sidebar'
import { ReportConfiguration } from '@Pimcore/modules/reports/reports-editor/components/report-configuration/report-configuration'
import { type BundleCustomReportsConfigurationTreeNode, useCustomReportsConfigGetTreeQuery } from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'
import { PortalSlot } from '@Pimcore/components/portal/portal-slot'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'
import { isFolder } from '@Pimcore/modules/reports/reports-editor/components/helpers'
import { useStyles } from './reports-editor.styles'

export const REFETCH_BTN_PORTAL_ID = 'reports-editor-toolbar-refetch-btn'
export const SAVE_BTN_PORTAL_ID = 'reports-editor-toolbar-save-btn'

export const ReportsEditor = (): React.JSX.Element => {
  const hasPermission = isAllowed(UserPermission.ReportsConfig)

  const { data: reportsConfigTreeData, isLoading, isFetching, refetch } = useCustomReportsConfigGetTreeQuery({ withGroup: true },
    { skip: !hasPermission }
  )

  const [openedReports, setOpenedReports] = useState<BundleCustomReportsConfigurationTreeNode[]>([])
  const [activeTabKey, setActiveTabKey] = useState<string | undefined>(undefined)
  const [modifiedReports, setModifiedReports] = useState<string[]>([])

  const { styles } = useStyles()

  const tabItems = useMemo(() => {
    const existingReportIds = new Set(
      reportsConfigTreeData?.items?.flatMap(item =>
        isFolder(item) ? item?.children?.map(child => child.id) : [item.id]
      )
    )

    return openedReports
      .filter(report => existingReportIds.has(report.id))
      .map((report) => ({
        key: report.id,
        label: `${report.text} ${modifiedReports.includes(report.id) ? '*' : ''}`,
        children: (
          <ReportConfiguration
            isActive={ activeTabKey === report.id }
            modifiedReports={ modifiedReports }
            report={ report }
            setModifiedReports={ setModifiedReports }
          />
        )
      }))
  }, [reportsConfigTreeData, openedReports, activeTabKey, modifiedReports])

  const handleOpenReport = (report: BundleCustomReportsConfigurationTreeNode): void => {
    const isAlreadyOpened = openedReports.some(item => item.id === report.id)

    if (!isAlreadyOpened) {
      setOpenedReports([...openedReports, report])
    }

    setActiveTabKey(report.id)
  }

  const handleCloseTab = (key: string): void => {
    const targetIndex = openedReports.findIndex((tab) => tab?.id === key)
    const updatedOpenedReports = openedReports.filter((report) => report.id !== key)

    if (key === activeTabKey) {
      const prevTab = openedReports[targetIndex - 1]
      const nextTab = openedReports[targetIndex + 1]

      const prevTabId = prevTab?.id
      const nextTabId = !isUndefined(nextTab) ? nextTab?.id : undefined

      const activeId = !isUndefined(prevTab) ? prevTabId : nextTabId

      setActiveTabKey(activeId)
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
          <Toolbar justify="space-between">
            <PortalSlot id={ REFETCH_BTN_PORTAL_ID } />
            <PortalSlot id={ SAVE_BTN_PORTAL_ID } />
          </Toolbar>
        ) }
      >
        <Tabs
          activeKey={ activeTabKey }
          className={ styles.tabs }
          hasStickyHeader
          items={ tabItems }
          onChange={ handleChangeTab }
          onClose={ handleCloseTab }
          rootClassName={ styles.tabsContainer }
        />
      </ContentLayout>
    )
  }

  return (
    <ConfigLayout
      leftItem={ {
        minSize: 180,
        maxSize: 300,
        size: 180,
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
      resizeAble
      rightItem={ { children: mainContent() } }
    />
  )
}
