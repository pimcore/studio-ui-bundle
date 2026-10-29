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
import { PieChart } from './pie-chart'
import type { IChartProps } from '@Pimcore/modules/reports/reports-view/components/report-chart/types'

interface IMockPieProps {
  annotations: Array<{ style: { text: string } }>
  tooltip: { items: Array<(datum: { type: string, value: number }) => { value: string }> }
  data: Array<{ type: string, value: number }>
}

jest.mock('@ant-design/plots', () => ({
  Pie: (props: IMockPieProps) => (
    <div data-testid="pie">
      <span data-testid="pie-total">{props.annotations[0].style.text}</span>
      <span data-testid="pie-tooltip">{props.tooltip.items[0](props.data[0]).value}</span>
      <span data-testid="pie-values">{JSON.stringify(props.data.map(item => item.value))}</span>
    </div>
  )
}))

jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>
}))

jest.mock('@Pimcore/modules/reports/reports-view/components/report-chart/components/legend-item/legend-item', () => ({
  LegendItem: ({ label, value }: { label: string, value: number }) => <span data-testid="legend">{label}:{typeof value}</span>
}))

jest.mock('@Pimcore/modules/reports/reports-view/components/report-chart/components/show-more-btn/show-more-btn', () => ({
  ShowMoreBtn: () => null
}))

const renderPie = (chartData: object[]): void => {
  const reportData: Partial<IChartProps['reportData']> = { pieColumn: 'cnt', pieLabelColumn: 'type' }

  render(
    <PieChart
      chartData={ chartData }
      chartLabelMap={ {} }
      reportData={ reportData as IChartProps['reportData'] }
    />
  )
}

describe('pie chart', () => {
  it('sums string values returned for SUM()/AVG() columns instead of concatenating them', () => {
    renderPie([
      { type: 'document', cnt: '6' },
      { type: 'text', cnt: '2' },
      { type: 'video', cnt: '1' }
    ])

    expect(screen.getByTestId('pie-total')).toHaveTextContent(/^9$/)
    expect(screen.getByTestId('pie-values')).toHaveTextContent('[6,2,1]')
  })

  it('does not show float addition noise for decimal values', () => {
    renderPie([
      { type: 'a', cnt: '10.10' },
      { type: 'b', cnt: '20.20' }
    ])

    expect(screen.getByTestId('pie-total')).toHaveTextContent(/^30\.3$/)
  })

  it('keeps the total for numeric values', () => {
    renderPie([
      { type: 'document', cnt: 6 },
      { type: 'text', cnt: 2 }
    ])

    expect(screen.getByTestId('pie-total')).toHaveTextContent(/^8$/)
  })

  it('computes the tooltip percentage from the numeric total', () => {
    renderPie([
      { type: 'a', cnt: '3' },
      { type: 'b', cnt: '1' }
    ])

    expect(screen.getByTestId('pie-tooltip')).toHaveTextContent('3 (75%)')
  })

  it('passes numeric values to the legend', () => {
    renderPie([{ type: 'a', cnt: '3' }])

    expect(screen.getByTestId('legend')).toHaveTextContent('a:number')
  })
})
