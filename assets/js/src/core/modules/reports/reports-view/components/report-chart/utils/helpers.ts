/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export const generateRandomColors = (count: number): string[] => {
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
