/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { presetPalettes } from '@ant-design/colors'
import { isUndefined } from 'lodash'

export const generateColorMap = (): string[] => {
  const result: string[] = []

  const palettes = Object.values(presetPalettes)

  const maxIndex = Math.max(...palettes.map(p => p.length))

  for (let i = 4; i < maxIndex; i++) {
    for (const palette of palettes) {
      if (!isUndefined(palette[i])) {
        result.push(palette[i])
      }
    }
  }

  for (let i = 0; i <= 3; i++) {
    for (const palette of palettes) {
      if (!isUndefined(palette[i])) {
        result.push(palette[i])
      }
    }
  }

  return result
}
