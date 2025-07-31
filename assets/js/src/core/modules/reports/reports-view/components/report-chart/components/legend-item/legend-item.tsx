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
import { isUndefined } from 'lodash'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { useStyles } from './legend-item.styles'

interface ILegendItemProps {
  key: string
  handleClick: (data: any) => void
  disabled: boolean
  markerColor: string
  label: string
  value?: number | string
}

export const LegendItem = ({ key, label, value, disabled, markerColor, handleClick }: ILegendItemProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <Flex
      align="center"
      className={ cn(styles.legendItem, { [styles.legendItemDisabled]: disabled }) }
      key={ key }
      onClick={ handleClick }
    >
      <div
        className={ styles.circle }
        style={ { background: markerColor } }
      />
      <Flex gap="small">
        <Text type="secondary">{label}</Text>
        {!isUndefined(value) && <Text>{value}</Text>}
      </Flex>
    </Flex>
  )
}
