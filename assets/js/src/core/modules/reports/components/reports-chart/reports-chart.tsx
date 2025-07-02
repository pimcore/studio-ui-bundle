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
import { Pie } from '@ant-design/plots'
import { type CustomReportChartData } from '@Pimcore/modules/reports/custom-reports-api-slice.gen'

interface IReportsChartProps {
  data?: CustomReportChartData[]
}

export const ReportsChart = ({ data }: IReportsChartProps): React.JSX.Element => {
  const totalCount = data?.reduce((sum, item) => sum + item['count(*)'], 0)
  const reportChartData = data?.map(item => ({
    type: 'attributesAvailable' in item ? item?.attributesAvailable : '',
    value: item['count(*)']
  }))

  const config = {
    data: reportChartData,
    colorField: 'type',
    angleField: 'value',
    innerRadius: 0.6,
    legend: {
      color: {
        position: 'right',
        layout: {
          justifyContent: 'center'
        },
        rowPadding: 10,
        itemLabelFontSize: 14
      }
    },
    tooltip: {
      items: [
        (datum) => ({
          name: `${datum.type}:`,
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

  return (
    <Pie { ...config } />
  )
}
