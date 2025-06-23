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

const MOCK_DATA = [
  {
    carClass: 'Personal luxury car',
    attributesAvailable: '',
    'count(*)': 2
  },
  {
    carClass: 'sports car',
    attributesAvailable: 'A',
    'count(*)': 169
  },
  {
    carClass: 'Full-Size',
    attributesAvailable: 'D',
    'count(*)': 4
  }
]

export const ReportsChart = (): React.JSX.Element => {
  const data = MOCK_DATA.map(item => ({
    type: item?.attributesAvailable ?? '',
    value: item['count(*)']
  }))
  const totalCount = MOCK_DATA.reduce((sum, item) => sum + item['count(*)'], 0)

  const config = {
    data,
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
