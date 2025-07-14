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
import cn from 'classnames'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import {
  type IChartPieDataItem
} from '@Pimcore/modules/reports/reports-view/components/report-chart/components/pie-chart/pie-chart'
import { useStyles } from './chart-legend.styles'

interface IChartLegendProps {
  data: IChartPieDataItem[]
  disabledItems: string[]
  handleLegendItemClick: (value: string) => void
}

export const ChartLegend = ({ data, disabledItems, handleLegendItemClick }: IChartLegendProps): React.JSX.Element => {
  const { styles } = useStyles()

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
            align="center"
            className={ cn(styles.legendItem, { [styles.legendItemDisabled]: isDisabled }) }
            key={ `${index}-${item.type}` }
            onClick={ () => {
              handleLegendItemClick(item.type)
            } }
          >
            <div
              className={ styles.circle }
              style={ { background: item.color } }
            />
            <Flex gap="small">
              <Text type="secondary">{item.type}</Text>
              <Text>{item.value}</Text>
            </Flex>
          </Flex>
        )
      })}
    </Flex>
  )
}
