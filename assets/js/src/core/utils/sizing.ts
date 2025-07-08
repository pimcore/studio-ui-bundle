/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type React from 'react'
import type { GlobalToken } from 'antd'
import { isUndefined } from 'lodash'
import { type FullToken } from 'antd-style'

export type Sizings =
  | 'none'
  | 'mini'
  | 'extra-small'
  | 'small'
  | 'normal'
  | 'medium'
  | 'large'
  | 'extra-large'
  | 'maxi'

export type SizeDefinition = Sizings | {
  x?: Sizings
  y?: Sizings
  top?: Sizings
  bottom?: Sizings
  left?: Sizings
  right?: Sizings
}

export const SIZING_VALUES: readonly Sizings[] = [
  'none',
  'mini',
  'extra-small',
  'small',
  'normal',
  'medium',
  'large',
  'extra-large',
  'maxi'
] as const

const getTokenValue = (
  token: GlobalToken | FullToken,
  size: Sizings,
  type: 'margin' | 'padding'
): number => {
  const mapping = {
    margin: {
      none: 0,
      mini: token.marginXXS,
      'extra-small': token.marginXS,
      small: token.marginSM,
      normal: token.margin,
      medium: token.marginMD,
      large: token.marginLG,
      'extra-large': token.marginXL,
      maxi: token.marginXXL
    },
    padding: {
      none: 0,
      mini: token.paddingXXS,
      'extra-small': token.paddingXS,
      small: token.paddingSM,
      normal: token.padding,
      medium: token.paddingMD,
      large: token.paddingLG,
      'extra-large': token.paddingXL,
      maxi: token.sizeXXL
    }
  }

  return mapping[type][size] ?? mapping[type].normal
}

const generateStyles = (
  token: GlobalToken | FullToken,
  definition: SizeDefinition | undefined,
  type: 'margin' | 'padding'
): React.CSSProperties => {
  if (isUndefined(definition)) {
    return {}
  }

  if (typeof definition === 'string') {
    const value = getTokenValue(token, definition, type)
    return { [type]: `${value}px` }
  }

  const styles: React.CSSProperties = {}
  const propMapping = {
    x: ['Left', 'Right'],
    y: ['Top', 'Bottom'],
    top: ['Top'],
    bottom: ['Bottom'],
    left: ['Left'],
    right: ['Right']
  }

  for (const [key, props] of Object.entries(propMapping)) {
    if (Object.prototype.hasOwnProperty.call(definition, key) === true) {
      const size = definition[key as keyof typeof definition]
      if (!isUndefined(size)) {
        const value = getTokenValue(token, size, type)
        for (const prop of props) {
          styles[`${type}${prop}`] = `${value}px`
        }
      }
    }
  }

  return styles
}

export const getMarginStyles = (
  token: GlobalToken | FullToken,
  margin: SizeDefinition | undefined
): React.CSSProperties => generateStyles(token, margin, 'margin')

export const getPaddingStyles = (
  token: GlobalToken | FullToken,
  padding: SizeDefinition | undefined
): React.CSSProperties => generateStyles(token, padding, 'padding')

const generateSpacingCSS = (
  prefixCls: string,
  modifier: string,
  size: Sizings,
  locations: Array<'x' | 'y' | 'top' | 'bottom' | 'left' | 'right'>,
  spacingType: 'margin' | 'padding',
  token: GlobalToken | FullToken
): string => {
  const value = getTokenValue(token, size, spacingType)
  const rules: string[] = []

  for (const location of locations) {
    const props = {
      x: ['left', 'right'],
      y: ['top', 'bottom'],
      top: ['top'],
      bottom: ['bottom'],
      left: ['left'],
      right: ['right']
    }[location]

    if (!isUndefined(props)) {
      const style = props
        .map((prop) => `${spacingType}-${prop}: ${value}px;`)
        .join(' ')
      rules.push(`
        &.${prefixCls}--${modifier}-${size} {
          ${style}
        }
      `)
    }
  }

  return rules.join('\n')
}

const generateAllSizingCSS = (
  prefixCls: string,
  modifier: string,
  token: GlobalToken | FullToken,
  locations: Array<'x' | 'y' | 'top' | 'bottom' | 'left' | 'right'>,
  type: 'margin' | 'padding'
): string =>
  SIZING_VALUES.map((size) =>
    generateSpacingCSS(prefixCls, modifier, size, locations, type, token)
  ).join('\n')

export const generateAllMarginSizingCSS = (
  prefixCls: string,
  modifier: string,
  token: GlobalToken | FullToken,
  locations: Array<'x' | 'y' | 'top' | 'bottom' | 'left' | 'right'>
): string => generateAllSizingCSS(prefixCls, modifier, token, locations, 'margin')

export const generateAllPaddingSizingCSS = (
  prefixCls: string,
  modifier: string,
  token: GlobalToken | FullToken,
  locations: Array<'x' | 'y' | 'top' | 'bottom' | 'left' | 'right'>
): string => generateAllSizingCSS(prefixCls, modifier, token, locations, 'padding')
