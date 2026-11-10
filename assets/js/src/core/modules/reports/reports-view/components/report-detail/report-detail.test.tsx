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
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReportDetail } from './report-detail'
import { ReportActionType } from '@Pimcore/modules/reports/reports-view/helpers'

const mockSetColumns = jest.fn()

jest.mock('@Pimcore/app/config/app-config', () => ({
  currentDomain: 'https://example.com',
  appConfig: { baseUrl: '/my-studio/', apiPrefix: '/my-studio/api' }
}))

jest.mock('@Pimcore/modules/element/hooks/use-element-helper', () => ({
  useElementHelper: () => ({ openElement: jest.fn() })
}))

jest.mock('@Pimcore/components/grid/contexts/columns-context', () => ({
  useColumnsContext: () => ({ columns: [], setColumns: mockSetColumns, setInitialColumns: jest.fn() })
}))

jest.mock('@Pimcore/modules/reports/reports-view/context/report-data-context', () => ({
  useReportDataContext: () => ({ sorting: undefined, setSorting: jest.fn() })
}))

jest.mock('@Pimcore/modules/reports/reports-view/hooks/useFullChartData', () => ({
  useFullChartData: () => ({ data: undefined })
}))

jest.mock('@Pimcore/modules/reports/reports-view/reports-view.styles', () => ({
  useStyles: () => ({ styles: {} })
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>
}))

jest.mock('@Pimcore/modules/reports/reports-view/components/report-chart/report-chart', () => ({ ReportChart: () => null }))
jest.mock('@Pimcore/modules/reports/reports-view/components/report-detail/components/drill-down-select/drill-down-select', () => ({ DrillDownSelect: () => null }))
jest.mock('@Pimcore/components/grid/grid', () => ({ Grid: () => null }))
jest.mock('@Pimcore/components/content/content', () => ({ Content: () => null }))
jest.mock('@Pimcore/components/icon-button/icon-button', () => ({
  IconButton: ({ onClick }: { onClick: () => void }) => <button onClick={ onClick }>open</button>
}))

describe('report detail', () => {
  it('opens url reports below the configured ui path', async () => {
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null)
    const chartDetailData = { items: [] }
    const reportDetailData = {
      name: 'report',
      columnConfigurations: [{ name: 'id', display: true, action: ReportActionType.OPEN_URL }]
    }

    render(
      <ReportDetail
        chartDetailData={ chartDetailData as never }
        currentReport="report"
        isLoading={ false }
        reportDetailData={ reportDetailData as never }
      />
    )

    const columns = mockSetColumns.mock.calls.at(-1)?.[0] as Array<{ id: string, cell?: (ctx: unknown) => React.ReactNode }>
    const actionColumn = columns.find((column) => column.id === 'id-action')

    render(<>{actionColumn?.cell?.({ row: { original: { id: 5 } } })}</>)
    await userEvent.click(screen.getByRole('button', { name: 'open' }))

    expect(openSpy).toHaveBeenCalledWith('https://example.com/my-studio/5', '_blank')
  })
})
