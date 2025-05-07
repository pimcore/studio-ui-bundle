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

export type Sizings = 'none' | 'mini' | 'extra-small' | 'small' | 'normal' | 'medium' | 'large' | 'extra-large' | 'maxi'

export type SizeDefinition = string | { x?: Sizings, y?: Sizings, top?: Sizings, bottom?: Sizings, left?: Sizings, right?: Sizings }

export const getSizingClasses = (prefix: string, sizing: SizeDefinition | undefined): string[] => {
  const classes: string[] = []

  if (typeof sizing === 'string') {
    classes.push(`${prefix}-${sizing}`)
    return classes
  }

  if (typeof sizing === 'object') {
    if ('x' in sizing) {
      classes.push(`${prefix}-x-${sizing.x}`)
    }

    if ('y' in sizing) {
      classes.push(`${prefix}-y-${sizing.y}`)
    }

    if ('top' in sizing) {
      classes.push(`${prefix}-t-${sizing.top}`)
    }

    if ('bottom' in sizing) {
      classes.push(`${prefix}-b-${sizing.bottom}`)
    }

    if ('left' in sizing) {
      classes.push(`${prefix}-l-${sizing.left}`)
    }

    if ('right' in sizing) {
      classes.push(`${prefix}-r-${sizing.right}`)
    }

    return classes
  }

  return classes
}

export interface BoxProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  children?: React.ReactNode
  component?: keyof JSX.IntrinsicElements
  padding?: SizeDefinition
  margin?: SizeDefinition
  inline?: boolean
}

export const Box = ({ children, padding, margin, className, component = 'div', inline, ...props }: BoxProps): React.JSX.Element => {
  const { styles } = useStyles()
  const classes: string[] = [
    'box',
    styles.box,
    inline === true ? 'box--inline' : '',
    className ?? ''
  ]
  const paddingClasses: string[] = getSizingClasses('p', padding)
  const marginClasses: string[] = getSizingClasses('m', margin)
  const ComponentType = component

  return useMemo(() => (
    <ComponentType
      className={ `${classes.join(' ')} ${paddingClasses.join(' ')} ${marginClasses.join(' ')}` }
      { ...props }
    >
      {children}
    </ComponentType>
  ), [children, padding, margin, className, component, inline])
}
