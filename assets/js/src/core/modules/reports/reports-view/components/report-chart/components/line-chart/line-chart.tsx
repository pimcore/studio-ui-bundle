/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useRef, useState } from 'react'
import { Line } from '@ant-design/plots'
import { toNumber } from 'lodash'
import { Flex } from '@Pimcore/components/flex/flex'
import type { IChartProps } from '@Pimcore/modules/reports/reports-view/components/report-chart/types'
import { LegendItem } from '@Pimcore/modules/reports/reports-view/components/report-chart/components/legend-item/legend-item'
import { generateColorMap } from '@Pimcore/modules/reports/reports-view/components/report-chart/utils/helpers'
import { useShowMore } from '@Pimcore/modules/reports/reports-view/components/report-chart/hooks/use-show-more'
import { ShowMoreBtn } from '@Pimcore/modules/reports/reports-view/components/report-chart/components/show-more-btn/show-more-btn'
import useElementResize from '@Pimcore/utils/hooks/use-element-resize'
import { useStyles } from './line-chart.styles'

const CHART_FIELD_NAME_KEY = 'name'
const CHART_FIELD_VALUE_KEY = 'value'
const CHART_HEIGHT = 250

export const LineChart = ({ chartData, reportData, chartLabelMap }: IChartProps): React.JSX.Element => {
  const { styles } = useStyles()

  const chartRef = useRef<HTMLDivElement>(null)
  const { width: chartWidth } = useElementResize(chartRef)

  const [colorList] = useState<string[]>(generateColorMap(chartData.length))

  const xAxis = reportData?.xAxis ?? ''
  const yAxis = reportData?.yAxis

  const formattedChartData = chartData.flatMap((item: object, index) => {
    return Object.entries(item)
      .filter(([key]) => key !== xAxis && yAxis?.includes(key))
      .map(([key, value]) => ({
        [xAxis]: item?.[xAxis],
        [CHART_FIELD_NAME_KEY]: key,
        [CHART_FIELD_VALUE_KEY]: toNumber(value)
      }))
  })

  const seriesKeys = [...new Set(formattedChartData.map(item => item.name))]
  const { isExpanded, visibleItems, toggle, initialVisibleCount } = useShowMore(seriesKeys)

  const [activeSeries, setActiveSeries] = useState<string[]>(seriesKeys)

  const handleLegendItemClick = (key: string): void => {
    setActiveSeries(prev =>
      prev.includes(key)
        ? prev.filter(k => k !== key)
        : [...prev, key]
    )
  }

  const colorMap: Record<string, string> = {
    ...Object.fromEntries(
      seriesKeys.map((key, index) => [key, colorList[index]])
    )
  }

  const filteredData = useMemo(() => {
    return formattedChartData.filter((item) =>
      activeSeries.includes(item.name)
    )
  }, [formattedChartData, activeSeries])

  const config = useMemo(() => ({
    data: filteredData,
    xField: xAxis,
    yField: CHART_FIELD_VALUE_KEY,
    colorField: CHART_FIELD_NAME_KEY,
    scale: {
      color: {
        range: colorList
      }
    },
    height: CHART_HEIGHT,
    point: {
      shapeField: 'circle',
      sizeField: 4
    },
    legend: false,
    interaction: {
      tooltip: {
        bounding: {
          x: 20,
          y: 20,
          height: CHART_HEIGHT,
          width: chartWidth
        },
        render: (event, { title, items }) => (
          <Flex
            gap="mini"
            vertical
          >
            <div className={ styles.tooltipTitle }>{title}</div>
            <Flex vertical>
              {items.map((item: any) => (
                <Flex
                  gap="small"
                  justify="space-between"
                  key={ item.name }
                >
                  <Flex
                    align="center"
                    gap="mini"
                  >
                    <div
                      className={ styles.circle }
                      style={ { backgroundColor: item.color } }
                    />
                    <div>{chartLabelMap[item.name] ?? item.name}</div>
                  </Flex>
                  <div className={ styles.tooltipItemValue }>{item.value}</div>
                </Flex>
              ))}
            </Flex>
          </Flex>
        )
      }
    }
  }), [chartWidth])

  return (
    <div className="m-t-mini">
      <div
        ref={ chartRef }
        style={ { overflowX: 'hidden' } }
      >
        <Line { ...config } />
      </div>

      <Flex
        gap="mini"
        justify="center"
        wrap="wrap"
      >
        {visibleItems.map((key, index) => {
          const isActive = activeSeries.includes(key)

          return (
            <LegendItem
              disabled={ !isActive }
              handleClick={ () => { handleLegendItemClick(key) } }
              key={ `${index}-${key}` }
              label={ chartLabelMap[key] ?? key }
              markerColor={ colorMap[key] }
            />
          )
        })}
      </Flex>

      {seriesKeys?.length > initialVisibleCount && (
        <ShowMoreBtn
          isExpanded={ isExpanded }
          toggle={ toggle }
        />
      )}
    </div>
  )
}
