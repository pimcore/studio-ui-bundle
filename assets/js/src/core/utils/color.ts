/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * Parse the colour formats theme tokens are written in: `#rgb`, `#rrggbb`, `rgb()` and
 * `rgba()`.
 *
 * A colour that is not fully opaque is rejected rather than parsed. Its rendered
 * appearance depends on whatever it is composited over, which is not knowable from the
 * value alone -- `rgba(255, 255, 255, 0.09)` is a light tint over an unknown ground, and
 * reading it as near-white would be wrong exactly as often as it is right.
 */
const parseOpaqueColor = (value: string): [number, number, number] | null => {
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

  const rgb = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)\s*(?:[,/]\s*([\d.]+%?)\s*)?\)$/iu.exec(trimmed)
  if (rgb === null) {
    return null
  }

  const alpha = rgb[4]
  if (alpha !== undefined && parseAlpha(alpha) < 1) {
    return null
  }

  return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])]
}

const parseAlpha = (value: string): number =>
  value.endsWith('%')
    ? Number(value.slice(0, -1)) / 100
    : Number(value)

/**
 * The luminance at which contrast against white equals contrast against black:
 * `(1 + 0.05) / (L + 0.05) === (L + 0.05) / 0.05`. Above it, dark content reads better;
 * below it, light content does. A naive 0.5 sits far into the light greys -- `#b0b0b0`
 * would be called dark.
 */
const CONTRAST_CROSSOVER_LUMINANCE = 0.179

const channelLuminance = (value: number): number => {
  const channel = value / 255

  return channel <= 0.03928
    ? channel / 12.92
    : ((channel + 0.055) / 1.055) ** 2.4
}

/**
 * Whether a surface colour is dark enough to need light-on-dark content.
 *
 * Derived from the colour itself rather than from a theme id or an appearance flag, so a
 * theme registered by a bundle is judged as correctly as a shipped one.
 *
 * A colour that cannot be read as fully opaque returns `false`, which keeps the caller on
 * the light-surface path -- the same one it took before any of this existed. A theme whose
 * surfaces are translucent can still opt in explicitly wherever the caller allows it.
 */
export const isDarkSurface = (color: string): boolean => {
  const rgb = parseOpaqueColor(color)
  if (rgb === null) {
    return false
  }

  const [red, green, blue] = rgb
  const luminance =
    0.2126 * channelLuminance(red) +
    0.7152 * channelLuminance(green) +
    0.0722 * channelLuminance(blue)

  return luminance < CONTRAST_CROSSOVER_LUMINANCE
}
