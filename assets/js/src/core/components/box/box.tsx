/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { useStyles } from './box.styles'
import {
  type SizeDefinition,
  getPaddingStyles,
  getMarginStyles
} from '../../utils/sizing'
import { theme } from 'antd'

export type { SizeDefinition, Sizings } from '../../utils/sizing'

export interface BoxProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  children?: React.ReactNode
  component?: keyof JSX.IntrinsicElements
  padding?: SizeDefinition
  margin?: SizeDefinition
  inline?: boolean
}

export const Box = ({
  children,
  padding,
  margin,
  className,
  component = 'div',
  inline,
  style,
  ...props
}: BoxProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { useToken } = theme
  const { token } = useToken()

  const ComponentType = component

  const combinedStyles = useMemo(() => {
    const paddingStyles = getPaddingStyles(token, padding)
    const marginStyles = getMarginStyles(token, margin)

    return { ...paddingStyles, ...marginStyles, ...style }
  }, [padding, margin, style, theme])

  return useMemo(
    () => (
      <ComponentType
        className={ `box ${styles.box} ${inline === true ? 'box--inline' : ''} ${
          className ?? ''
        }` }
        style={ combinedStyles }
        { ...props }
      >
        { children }
      </ComponentType>
    ),
    [children, className, component, inline, combinedStyles]
  )
}
