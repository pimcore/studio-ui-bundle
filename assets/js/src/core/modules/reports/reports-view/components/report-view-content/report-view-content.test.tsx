/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactElement, type ReactNode, useState } from 'react'
import { render, screen } from '@testing-library/react'
import { DynamicTypeCustomReportDefinitionAbstract } from '@Pimcore/modules/reports/dynamic-types/definitions/custom-report-definition-adapters/dynamic-type-custom-report-definition-abstract'
import { type ICustomReportViewProps } from '@Pimcore/modules/reports/reports-view/types'
import { ReportViewContent } from './report-view-content'

const mockGetDynamicType = jest.fn()
const mockUseReportDataContext = jest.fn()

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('@Pimcore/app/depency-injection', () => ({
  container: { get: () => ({ getDynamicType: mockGetDynamicType }) }
}))
jest.mock('@Pimcore/app/config/services/service-ids', () => ({ serviceIds: {} }))
jest.mock('@Pimcore/modules/reports/reports-view/context/report-data-context', () => ({
  useReportDataContext: () => mockUseReportDataContext()
}))
jest.mock('@Pimcore/modules/element/editor/layouts/tabs-toolbar-view', () => ({
  TabsToolbarView: ({ renderTabbar }: { renderTabbar: ReactNode }) => <>{renderTabbar}</>
}))
jest.mock('@Pimcore/components/content-layout/content-layout', () => ({
  ContentLayout: ({ renderTopBar, renderSidebar, renderToolbar, children }: { renderTopBar?: ReactNode, renderSidebar?: ReactNode, renderToolbar?: ReactNode, children: ReactNode }) => (
    <>
      {renderTopBar}
      {renderSidebar}
      {children}
      {renderToolbar}
    </>
  )
}))
jest.mock('@Pimcore/components/content/content', () => ({
  Content: ({ loading, children }: { loading?: boolean, children?: ReactNode }) => loading === true
    ? <div data-testid="content-loading" />
    : <>{children}</>
}))
// The Studio layout components import antd-style (ESM), which Jest cannot load untransformed
jest.mock('@Pimcore/components/toolbar/toolbar', () => ({ Toolbar: () => null }))
jest.mock('@Pimcore/components/flex/flex', () => ({ Flex: ({ children }: { children: ReactNode }) => <>{children}</> }))
jest.mock('@Pimcore/components/text/text', () => ({ Text: ({ children }: { children: ReactNode }) => <>{children}</> }))
jest.mock('@Pimcore/modules/reports/components/refetch/refetch', () => ({ Refetch: () => null }))
jest.mock('@Pimcore/modules/reports/reports-view/components/report-toolbar/report-toolbar', () => ({
  ReportToolbar: () => <div data-testid="generic-report-toolbar" />
}))
jest.mock('@Pimcore/modules/reports/reports-view/components/report-top-bar/report-top-bar', () => ({
  ReportTopBar: () => <div data-testid="report-top-bar" />
}))
jest.mock('@Pimcore/modules/reports/reports-view/components/report-detail/report-detail', () => ({
  ReportDetail: () => <div data-testid="generic-report-detail" />
}))
jest.mock('@Pimcore/modules/reports/reports-view/components/report-sidebar/report-sidebar', () => ({
  ReportSidebar: () => <div data-testid="generic-report-sidebar" />
}))

class GenericAdapter extends DynamicTypeCustomReportDefinitionAbstract {
  id = 'generic'
  getLabel (): ReactElement { return <>Generic</> }
  getPagination (): boolean { return false }
  getCustomReportData (): ReactElement { return <></> }
}

const customViewProps = jest.fn()
const customViewMounts = jest.fn()

const CustomView = ({ reportName }: ICustomReportViewProps): React.JSX.Element => {
  useState(() => customViewMounts(reportName))

  return <div data-testid="custom-report-view">{reportName}</div>
}

class CustomViewAdapter extends GenericAdapter {
  id = 'custom'

  getCustomReportView (props: ICustomReportViewProps): ReactElement {
    customViewProps(props)

    return <CustomView { ...props } />
  }
}

class UndefinedViewAdapter extends GenericAdapter {
  id = 'undefined-view'

  getCustomReportView (): ReactElement {
    return undefined as unknown as ReactElement
  }
}

const mockReportData = (type: string, name: string = 'report', isFetching: boolean = false): Record<string, unknown> => {
  const reportData = {
    isLoading: false,
    isFetching,
    reportDetailData: { name, dataSourceConfig: { type } },
    chartDetailData: { items: [{ id: 1 }], totalItems: 1 },
    refetchAll: jest.fn(),
    page: 1,
    setPage: jest.fn(),
    pageSize: 50,
    setPageSize: jest.fn()
  }
  mockUseReportDataContext.mockReturnValue(reportData)

  return reportData
}

const viewContent = (currentReport: string | null): React.JSX.Element => (
  <ReportViewContent
    currentReport={ currentReport }
    reportsTreeOptions={ [] }
    setCurrentReport={ jest.fn() }
  />
)

const renderView = (currentReport: string | null = 'report'): ReturnType<typeof render> => render(viewContent(currentReport))

const expectGenericView = (): void => {
  expect(screen.getByTestId('generic-report-detail')).toBeInTheDocument()
  expect(screen.getByTestId('generic-report-sidebar')).toBeInTheDocument()
  expect(screen.getByTestId('generic-report-toolbar')).toBeInTheDocument()
  expect(screen.queryByTestId('custom-report-view')).not.toBeInTheDocument()
}

describe('ReportViewContent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the generic view when the adapter does not override the view', () => {
    mockReportData('generic')
    mockGetDynamicType.mockReturnValue(new GenericAdapter())

    renderView()

    expectGenericView()
  })

  it('renders the generic view for an adapter without the view method', () => {
    mockReportData('legacy')
    mockGetDynamicType.mockReturnValue({ id: 'legacy', getLabel: () => <>Legacy</>, getPagination: () => false })

    renderView()

    expectGenericView()
  })

  it('renders the adapter view instead of the generic grid, chart and sidebar', () => {
    const reportData = mockReportData('custom')
    mockGetDynamicType.mockReturnValue(new CustomViewAdapter())

    renderView()

    expect(screen.getByTestId('custom-report-view')).toBeInTheDocument()
    expect(screen.getByTestId('report-top-bar')).toBeInTheDocument()
    expect(screen.queryByTestId('generic-report-detail')).not.toBeInTheDocument()
    expect(screen.queryByTestId('generic-report-sidebar')).not.toBeInTheDocument()
    expect(screen.queryByTestId('generic-report-toolbar')).not.toBeInTheDocument()
    expect(customViewProps).toHaveBeenCalledWith({
      reportName: 'report',
      reportDetailData: reportData.reportDetailData,
      reportData
    })
  })

  it('renders the generic view when the adapter view returns undefined', () => {
    mockReportData('undefined-view')
    mockGetDynamicType.mockReturnValue(new UndefinedViewAdapter())

    renderView()

    expectGenericView()
  })

  it('shows a loading state instead of the generic view while the selected report replaces an adapter view', () => {
    mockReportData('custom', 'previous-report', true)
    mockGetDynamicType.mockReturnValue(new CustomViewAdapter())

    renderView('report')

    expect(screen.getByTestId('content-loading')).toBeInTheDocument()
    expect(screen.queryByTestId('custom-report-view')).not.toBeInTheDocument()
    expect(screen.queryByTestId('generic-report-detail')).not.toBeInTheDocument()
    expect(customViewProps).not.toHaveBeenCalled()
  })

  it('falls back to the generic view when the selected report failed to load after an adapter view', () => {
    mockReportData('custom', 'previous-report', false)
    mockGetDynamicType.mockReturnValue(new CustomViewAdapter())

    renderView('report')

    expect(screen.queryByTestId('content-loading')).not.toBeInTheDocument()
    expect(screen.getByTestId('generic-report-detail')).toBeInTheDocument()
    expect(customViewProps).not.toHaveBeenCalled()
  })

  it('keeps the generic view while switching between reports of an adapter without its own view', () => {
    mockReportData('generic', 'previous-report', true)
    mockGetDynamicType.mockReturnValue(new GenericAdapter())

    renderView('report')

    expect(screen.queryByTestId('content-loading')).not.toBeInTheDocument()
    expect(screen.getByTestId('generic-report-detail')).toBeInTheDocument()
  })

  it('remounts the adapter view when switching between reports of the same adapter', () => {
    mockReportData('custom', 'report-a')
    mockGetDynamicType.mockReturnValue(new CustomViewAdapter())
    const { rerender } = renderView('report-a')

    mockReportData('custom', 'report-b')
    rerender(viewContent('report-b'))

    expect(screen.getByTestId('custom-report-view')).toHaveTextContent('report-b')
    expect(customViewMounts.mock.calls).toEqual([['report-a'], ['report-b']])
  })
})
