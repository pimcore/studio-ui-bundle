/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { act, renderHook } from '@testing-library/react'
import { type BundleCustomReportsConfigurationTreeNode } from '@Pimcore/modules/reports/custom-reports-api-slice.gen'
import { useReportTabs } from './use-report-tabs'

const report = (id: string): BundleCustomReportsConfigurationTreeNode => ({ id, text: id, cls: '', writeable: true })

const openedIds = (result: { current: ReturnType<typeof useReportTabs> }): string[] =>
  result.current.openedReports.map((tab) => tab.id)

describe('useReportTabs', () => {
  it('opens a report once and activates it', () => {
    const { result } = renderHook(() => useReportTabs())

    act(() => {
      result.current.openReport(report('a'))
      result.current.openReport(report('b'))
      result.current.openReport(report('a'))
    })

    expect(openedIds(result)).toEqual(['a', 'b'])
    expect(result.current.activeTabKey).toBe('a')
  })

  it('activates the previous tab when the active one closes', () => {
    const { result } = renderHook(() => useReportTabs())

    act(() => {
      result.current.openReport(report('a'))
      result.current.openReport(report('b'))
      result.current.openReport(report('c'))
    })
    act(() => { result.current.closeReport('c') })

    expect(openedIds(result)).toEqual(['a', 'b'])
    expect(result.current.activeTabKey).toBe('b')
  })

  it('activates the next tab when the first and active one closes', () => {
    const { result } = renderHook(() => useReportTabs())

    act(() => {
      result.current.openReport(report('a'))
      result.current.openReport(report('b'))
      result.current.setActiveTab('a')
    })
    act(() => { result.current.closeReport('a') })

    expect(openedIds(result)).toEqual(['b'])
    expect(result.current.activeTabKey).toBe('b')
  })

  it('keeps the active tab when another one closes', () => {
    const { result } = renderHook(() => useReportTabs())

    act(() => {
      result.current.openReport(report('a'))
      result.current.openReport(report('b'))
    })
    act(() => { result.current.closeReport('a') })

    expect(result.current.activeTabKey).toBe('b')
  })

  // The import modal closes before the tree refetch finishes, and the sidebar opens the
  // imported report through the callback it captured before. A tab closed in the meantime
  // must not come back with it.
  it('does not reopen a tab closed while an import refresh is pending', () => {
    const { result } = renderHook(() => useReportTabs())

    act(() => {
      result.current.openReport(report('a'))
      result.current.openReport(report('b'))
    })
    const openReportCapturedBeforeRefresh = result.current.openReport

    act(() => { result.current.closeReport('b') })
    act(() => { openReportCapturedBeforeRefresh(report('imported')) })

    expect(openedIds(result)).toEqual(['a', 'imported'])
    expect(result.current.activeTabKey).toBe('imported')
  })
})
