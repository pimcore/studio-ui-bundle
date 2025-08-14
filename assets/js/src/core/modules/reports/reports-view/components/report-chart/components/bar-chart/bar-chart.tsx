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
import { Column } from '@ant-design/plots'
import { toNumber } from 'lodash'
import type { IChartProps } from '@Pimcore/modules/reports/reports-view/components/report-chart/types'
import { Flex } from '@Pimcore/components/flex/flex'
import { generateColorMap } from '@Pimcore/modules/reports/reports-view/components/report-chart/utils/helpers'
import { LegendItem } from '@Pimcore/modules/reports/reports-view/components/report-chart/components/legend-item/legend-item'
import { useShowMore } from '@Pimcore/modules/reports/reports-view/components/report-chart/hooks/use-show-more'
import { ShowMoreBtn } from '@Pimcore/modules/reports/reports-view/components/report-chart/components/show-more-btn/show-more-btn'
import { useStyles } from './bar-chart.styles'

const CHART_FIELD_NAME_KEY = 'name'
const CHART_FIELD_VALUE_KEY = 'value'

export const BarChart = ({ chartData, reportData, chartLabelMap }: IChartProps): React.JSX.Element => {
  const { styles } = useStyles()

  const [colorList] = useState<string[]>(generateColorMap(chartData.length))

  const xAxis = reportData?.xAxis ?? ''
  const formattedChartData = chartData.flatMap((item: object) => {
    return Object.entries(item)
      .filter(([key]) => key !== xAxis)
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

  const config = {
    data: filteredData,
    xField: xAxis,
    yField: CHART_FIELD_VALUE_KEY,
    seriesField: CHART_FIELD_NAME_KEY,
    colorField: CHART_FIELD_NAME_KEY,
    scale: {
      color: {
        range: colorList
      }
    },
    height: 250,
    point: {
      shapeField: 'circle',
      sizeField: 4
    },
    legend: false,
    interaction: {
      tooltip: {
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
                    align={ 'center' }
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
  }

  return (
    <div className="m-t-mini">
      <Column { ...config } />

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
              handleClick={ () => {
                handleLegendItemClick(key)
              } }
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
