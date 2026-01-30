/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useMemo, useState } from 'react'
import { Pie } from '@ant-design/plots'
import { isEmpty, merge } from 'lodash'
import { generateColorMap } from '@Pimcore/modules/reports/reports-view/components/report-chart/utils/helpers'
import type { IChartProps, IChartDataItem } from '@Pimcore/modules/reports/reports-view/components/report-chart/types'
import { Flex } from '@Pimcore/components/flex/flex'
import { LegendItem } from '@Pimcore/modules/reports/reports-view/components/report-chart/components/legend-item/legend-item'
import { useShowMore } from '@Pimcore/modules/reports/reports-view/components/report-chart/hooks/use-show-more'
import { ShowMoreBtn } from '@Pimcore/modules/reports/reports-view/components/report-chart/components/show-more-btn/show-more-btn'

export interface IChartPieDataItem extends IChartDataItem {
  color: string
}

const CHART_FIELD_TYPE_KEY = 'type'
const CHART_FIELD_VALUE_KEY = 'value'
const CHART_FIELD_COLOR_KEY = 'color'

export const PieChart = ({ reportData, chartData, chartConfig, showLegend = true }: IChartProps): React.JSX.Element => {
  const pieLabelColumn = reportData?.pieLabelColumn ?? ''
  const pieColumn = reportData?.pieColumn ?? ''

  const [colorList] = useState<string[]>(generateColorMap(chartData.length))

  const reportChartData: IChartPieDataItem[] = useMemo(() => {
    return chartData.map((item, index) => ({
      [CHART_FIELD_TYPE_KEY]: item?.[pieLabelColumn],
      [CHART_FIELD_VALUE_KEY]: item?.[pieColumn],
      [CHART_FIELD_COLOR_KEY]: colorList[index]
    }))
  }, [chartData, pieLabelColumn, pieColumn, colorList])
  const { isExpanded, visibleItems, toggle, initialVisibleCount } = useShowMore(reportChartData)

  const [chartRef, setChartRef] = useState<any>(null)
  const [disabledItems, setDisabledItems] = useState<string[]>([])

  const visibleChartData = useMemo(() => {
    if (isEmpty(disabledItems)) {
      return reportChartData
    }

    return reportChartData.filter(
      item => !disabledItems.includes(item[CHART_FIELD_TYPE_KEY])
    )
  }, [reportChartData, disabledItems])

  const totalCount = useMemo(() => {
    return visibleChartData.reduce(
      (sum, item) => sum + item[CHART_FIELD_VALUE_KEY],
      0
    )
  }, [visibleChartData])

  useEffect(() => {
    if (chartRef === null) return

    chartRef.chart.changeData(visibleChartData)
  }, [visibleChartData, chartRef])

  const handleLegendItemClick = (itemKey: string): void => {
    setDisabledItems(prev =>
      prev.includes(itemKey)
        ? prev.filter(item => item !== itemKey)
        : [...prev, itemKey]
    )
  }

  const config = {
    data: reportChartData,
    colorField: CHART_FIELD_COLOR_KEY,
    angleField: CHART_FIELD_VALUE_KEY,
    autoFit: true,
    height: 230,
    scale: {
      color: {
        type: 'identity'
      }
    },
    innerRadius: 0.6,
    legend: false,
    onReady: (plot: any) => {
      setChartRef(plot)
    },
    tooltip: {
      items: [
        (datum) => ({
          name: `${datum.type}`,
          value: `${datum.value} (${Math.round((datum.value * 100) / totalCount)}%)`
        })
      ]
    },
    annotations: [
      {
        type: 'text',
        data: [],
        style: {
          text: totalCount.toString(),
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 40,
          fontStyle: 'bold'
        }
      }
    ]
  }

  const mergedConfig = chartConfig === undefined ? config : merge({}, config, chartConfig)

  return (
    <div>
      <Pie { ...mergedConfig } />

      {showLegend
        ? (
          <Flex
            gap="mini"
            justify="center"
            wrap="wrap"
          >
            {visibleItems?.map((item, index) => {
              const isDisabled = disabledItems.includes(item.type)

              return (
                <LegendItem
                  disabled={ isDisabled }
                  handleClick={ () => { handleLegendItemClick(item.type) } }
                  key={ `${index}-${item.type}` }
                  label={ item.type }
                  markerColor={ item.color }
                  value={ item.value }
                />
              )
            })}
          </Flex>
          )
        : null}

      {reportChartData?.length > initialVisibleCount && (
        <ShowMoreBtn
          isExpanded={ isExpanded }
          toggle={ toggle }
        />
      )}
    </div>
  )
}
