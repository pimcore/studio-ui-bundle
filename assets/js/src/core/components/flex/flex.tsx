/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React from 'react'
import { Flex as AntFlex, type FlexProps as AntFlexProps, theme } from 'antd'
import cn from 'classnames'
import { mapGapToTokenValue } from '@Pimcore/components/flex/utils/mapGapToTokenValue'
import { isString, isNumber, isObject } from '@Pimcore/utils/type-utils'
import { useStyles } from '@Pimcore/components/flex/flex.styles'
import { type GapRowColGroupType, type GapType } from '@Pimcore/types/components/types'

export interface FlexProps extends Omit<AntFlexProps, 'gap'> {
  gap?: GapType
}

const { useToken } = theme

export const Flex = ({ gap = 0, children, ...props }: FlexProps): React.JSX.Element => {
  const { token } = useToken()

  const { rowGap, colGap } = calculateGap(gap)

  const { styles } = useStyles({
    itemRowGap: rowGap,
    itemColGap: colGap
  })

  const flexClassNames = cn(styles.rowColGap)

  /**
   * Calculates the row and column gaps based on the provided gap value.
   *  * The function handles three possible cases for the gap:
   *  * - A string value (predefined gap sizes like 'small', 'normal', etc.).
   *  * - A numeric value (representing a direct gap size).
   *  * - An object containing specific row and column gap sizes.
   */
  function calculateGap (gap: GapType): { rowGap: number, colGap: number } {
    const getGapValue = (gap: GapType): number => mapGapToTokenValue({ token, gap })

    if (isString(gap)) return { rowGap: getGapValue(gap), colGap: getGapValue(gap) }

    if (isNumber(gap)) return { rowGap: gap as number, colGap: gap as number }

    if (isObject(gap)) {
      return {
        rowGap: getGapValue((gap as GapRowColGroupType).rowGap),
        colGap: getGapValue((gap as GapRowColGroupType).colGap)
      }
    }

    return { rowGap: 0, colGap: 0 }
  }

  return (
    <AntFlex
      className={ flexClassNames }
      { ...props }
    >
      {children}
    </AntFlex>
  )
}
