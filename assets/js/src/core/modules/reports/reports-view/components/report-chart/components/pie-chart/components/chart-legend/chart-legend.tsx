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
import { Flex } from '@Pimcore/components/flex/flex'
import { type IChartDataItem } from '@Pimcore/modules/reports/reports-view/components/report-chart/types'

interface IChartLegendProps {
  data: IChartDataItem[]
  disabledItems: string[]
  handleLegendItemClick: (value: string) => void
  colorList: string[]
}

export const ChartLegend = ({ data, disabledItems, handleLegendItemClick, colorList }: IChartLegendProps): React.JSX.Element => {
  return (
    <Flex
      gap="mini"
      justify="center"
      wrap="wrap"
    >
      {data?.map((item, index) => {
        const isDisabled = disabledItems.includes(item.type)

        return (
          <Flex
            key={ index }
            onClick={ () => { handleLegendItemClick(item.type) } }
            style={ {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${colorList[index]}`,
              borderRadius: 4,
              padding: '0 4px',
              background: isDisabled ? '#f0f0ff' : '#fff',
              cursor: 'pointer',
              opacity: isDisabled ? 0.5 : 1
            } }
          >
            <div style={ {
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: colorList[index],
              marginRight: 8
            } }
            />
            <Flex gap="small">
              <div>{item.value}</div>
              <div style={ { marginLeft: 'auto' } }>{item.type}</div>
            </Flex>
          </Flex>
        )
      })}
    </Flex>
  )
}
