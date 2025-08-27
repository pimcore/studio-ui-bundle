/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { orange, purple, blue, red, lime, cyan, magenta, geekblue, green, yellow, volcano, gold } from '@ant-design/colors'
import { isUndefined } from 'lodash'

const PALETTES = [
  purple, magenta, geekblue, cyan, blue,
  green, yellow, lime, gold, volcano,
  orange, red
]
const TONES_ORDER = [4, 6, 8, 2, 5, 3, 7, 1, 9, 0]

const generateRandomColors = (count: number): string[] => {
  const colors: string[] = []

  for (let i = 0; i < count; i++) {
    const r = 50 + Math.floor(Math.random() * 150)
    const g = 50 + Math.floor(Math.random() * 150)
    const b = 50 + Math.floor(Math.random() * 150)

    const color = '#' + [r, g, b]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('')

    colors.push(color)
  }

  return colors
}

export const generateColorMap = (colorCount: number): string[] => {
  const result: string[] = []

  const palettes = Object.values(PALETTES)

  for (const i of TONES_ORDER) {
    for (const palette of palettes) {
      if (!isUndefined(palette[i])) {
        result.push(palette[i])
      }
    }
  }

  // Fallback: generate extra colors if needed
  const neededExtras = colorCount - result.length

  if (neededExtras > 0) {
    const fallbackColors = generateRandomColors(neededExtras)
    result.push(...fallbackColors)
  }

  return result
}
