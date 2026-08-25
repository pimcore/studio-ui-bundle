/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/** Parse the colour formats theme tokens are written in: `#rgb`, `#rrggbb`, `rgb()` and `rgba()`. */
const parseColor = (value: string): [number, number, number] | null => {
  const trimmed = value.trim()

  const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/iu.exec(trimmed)
  if (hex !== null) {
    const digits = hex[1].length === 3
      ? hex[1].replaceAll(/./gu, (char) => char + char)
      : hex[1]

    return [
      Number.parseInt(digits.slice(0, 2), 16),
      Number.parseInt(digits.slice(2, 4), 16),
      Number.parseInt(digits.slice(4, 6), 16)
    ]
  }

  const rgb = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/iu.exec(trimmed)
  if (rgb !== null) {
    return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])]
  }

  return null
}

const channelLuminance = (value: number): number => {
  const channel = value / 255

  return channel <= 0.03928
    ? channel / 12.92
    : ((channel + 0.055) / 1.055) ** 2.4
}

/**
 * Whether a surface colour is dark enough to need light-on-dark content.
 *
 * Derived from the colour itself rather than from a theme id or an appearance flag,
 * so a theme registered by a bundle is judged as correctly as a shipped one. An
 * unparseable colour is treated as light, which matches the antd default a theme
 * that overrides nothing falls back to.
 */
export const isDarkSurface = (color: string): boolean => {
  const rgb = parseColor(color)
  if (rgb === null) {
    return false
  }

  const [red, green, blue] = rgb
  const luminance =
    0.2126 * channelLuminance(red) +
    0.7152 * channelLuminance(green) +
    0.0722 * channelLuminance(blue)

  return luminance < 0.5
}
