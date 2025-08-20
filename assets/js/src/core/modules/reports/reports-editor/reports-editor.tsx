/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { isNull, isUndefined } from 'lodash'
import { useTranslation } from 'react-i18next'
import { ConfigLayout } from '@Pimcore/components/predefined-layouts/config/config-layout'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Tabs } from '@Pimcore/components/tabs/tabs'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Button } from '@Pimcore/components/button/button'
import { Content } from '@Pimcore/components/content/content'
import { ReportsSidebar } from '@Pimcore/modules/reports/reports-editor/components/reports-sidebar/reports-sidebar'
import {
  ReportConfiguration,
  type ReportConfigurationRef
} from '@Pimcore/modules/reports/reports-editor/components/report-configuration/report-configuration'
import {
  type BundleCustomReportsConfigurationTreeNode,
  type CustomReportsConfigUpdateApiArg,
  useCustomReportsConfigGetTreeQuery,
  useCustomReportsConfigUpdateMutation
} from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'
import { useStyles } from './reports-editor.styles'

export const ReportsEditor = (): React.JSX.Element => {
  const { data: reportsConfigTreeData, isLoading, isFetching, refetch } = useCustomReportsConfigGetTreeQuery({ page: 1, pageSize: 9999 })
  const [updateReport, { isSuccess }] = useCustomReportsConfigUpdateMutation()

  const [openedReports, setOpenedReports] = useState<BundleCustomReportsConfigurationTreeNode[]>([])
  const [activeTabKey, setActiveTabKey] = useState<string | undefined>(undefined)

  const [isSaving, setIsSaving] = useState(false)
  const [reportsDirtyState, setReportsDirtyState] = useState<Record<string, boolean>>({})

  const reportRefs = useRef<Record<string, ReportConfigurationRef>>({})
  const isActiveTabDirty = !isUndefined(activeTabKey) && reportsDirtyState[activeTabKey]

  const { styles } = useStyles()
  const { t } = useTranslation()

  useEffect(() => {
    if (isSuccess) {
      setIsSaving(false)
    }
  }, [isSuccess])

  const handleSave = async (): Promise<void> => {
    if (isUndefined(activeTabKey)) return

    const activeReportRef = reportRefs.current[activeTabKey]

    if (!activeReportRef?.isDirty || isNull(activeReportRef.currentData)) return

    setIsSaving(true)

    const success = await activeReportRef.save()

    if (success) {
      await updateReport({
        name: activeTabKey,
        bundleCustomReportUpdate: activeReportRef.currentData as unknown as CustomReportsConfigUpdateApiArg['bundleCustomReportUpdate']
      })
    } else {
      setIsSaving(false)
    }
  }

  const tabItems = useMemo(() => {
    const existingReportIds = new Set(reportsConfigTreeData?.items?.map(report => report.id))

    return openedReports
      .filter(report => existingReportIds.has(report.id))
      .map((report) => ({
        key: report.id,
        label: report.text,
        children: (
          <ReportConfiguration
            onDirtyStateChange={ (isDirty) => {
              setReportsDirtyState(prev => ({
                ...prev,
                [report.id]: isDirty
              }))
            } }
            ref={ (ref) => {
              if (!isNull(ref)) {
                reportRefs.current[report.id] = ref
              } else {
                Reflect.deleteProperty(reportRefs.current, report.id)
              }
            } }
            report={ report }
          />
        )
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

    Reflect.deleteProperty(reportRefs.current, key)

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
              disabled={ !isActiveTabDirty }
              loading={ isSaving }
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
