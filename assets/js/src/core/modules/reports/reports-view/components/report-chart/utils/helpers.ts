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
  magenta, purple, geekblue, cyan, blue,
  green, yellow, lime, gold, volcano,
  orange, red
]
const TONES_ORDER = [4, 6, 8, 2, 5, 3, 7, 1, 9, 0]

export const generateColorMap = (): string[] => {
  const result: string[] = []

  const palettes = Object.values(PALETTES)

  for (const i of TONES_ORDER) {
    for (const palette of palettes) {
      if (!isUndefined(palette[i])) {
        result.push(palette[i])
      }
    }
  }

  return result
}
