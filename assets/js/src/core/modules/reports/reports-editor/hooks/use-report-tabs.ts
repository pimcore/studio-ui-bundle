/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useState } from 'react'
import { type BundleCustomReportsConfigurationTreeNode } from '@Pimcore/modules/reports/custom-reports-api-slice.gen'

export interface ReportTabs {
  openedReports: BundleCustomReportsConfigurationTreeNode[]
  activeTabKey: string | undefined
  openReport: (report: BundleCustomReportsConfigurationTreeNode) => void
  closeReport: (key: string) => void
  setActiveTab: (key: string) => void
}

/**
 * The tab that becomes active when `key` closes: the one before it, or the one after it
 * when it was the first; undefined when no tab remains.
 */
const neighbourTabKey = (tabs: BundleCustomReportsConfigurationTreeNode[], key: string): string | undefined => {
  const index = tabs.findIndex((tab) => tab.id === key)

  return (tabs[index - 1] ?? tabs[index + 1])?.id
}

export const useReportTabs = (): ReportTabs => {
  const [openedReports, setOpenedReports] = useState<BundleCustomReportsConfigurationTreeNode[]>([])
  const [activeTabKey, setActiveTabKey] = useState<string | undefined>(undefined)

  // Functional updates: an import opens its report only after the tree refetch, and the sidebar
  // keeps calling the callback it captured before, so a tab closed meanwhile must stay closed.
  const openReport = useCallback((report: BundleCustomReportsConfigurationTreeNode) => {
    setOpenedReports((prev) => prev.some((tab) => tab.id === report.id) ? prev : [...prev, report])
    setActiveTabKey(report.id)
  }, [])

  const closeReport = useCallback((key: string) => {
    setOpenedReports((prev) => {
      const neighbour = neighbourTabKey(prev, key)
      setActiveTabKey((current) => current === key ? neighbour : current)

      return prev.filter((tab) => tab.id !== key)
    })
  }, [])

  const setActiveTab = useCallback((key: string) => {
    setActiveTabKey(key)
  }, [])

  return { openedReports, activeTabKey, openReport, closeReport, setActiveTab }
}
