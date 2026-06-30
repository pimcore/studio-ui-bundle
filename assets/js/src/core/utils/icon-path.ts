/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'

const ICON_PATH_SCHEME_PATTERN = /^[a-z][\w+.-]*:/i
const ICON_PATH_EXTENSION_PATTERN = /\.(svg|png|jpe?g|gif|webp|avif|ico|bmp)$/i

/**
 * Heuristic that decides whether an unregistered icon string should be rendered
 * as an image (`type: 'path'`) rather than discarded. Real icon paths contain a
 * slash (absolute/relative paths, URLs), a URL scheme (`data:`, `blob:`, `https:`)
 * or an image file extension. Bare tokens such as legacy `pimcore_icon_*` CSS
 * classes match none of these and must not be turned into an `<img src>`, because
 * that resolves to a wrong relative URL and triggers a 404.
 */
export const looksLikeIconPath = (value: string): boolean =>
  value.includes('/') ||
  ICON_PATH_SCHEME_PATTERN.test(value) ||
  ICON_PATH_EXTENSION_PATTERN.test(value)

/**
 * Resolves a raw icon string into an `ElementIcon`. `isKnownIcon` reports whether the
 * string is a registered icon name (the registry differs per caller). A registered
 * name becomes `type: 'name'`; a path-like value becomes `type: 'path'`; anything else
 * (e.g. a legacy `pimcore_icon_*` class) is skipped with a warning so it never becomes
 * an `<img src>` that 404s. `source` only labels the warning for easier tracing.
 */
export const resolveIconString = (
  value: string,
  isKnownIcon: (name: string) => boolean,
  source: string
): ElementIcon | null => {
  if (isKnownIcon(value)) {
    return { type: 'name', value }
  }

  if (looksLikeIconPath(value)) {
    return { type: 'path', value }
  }

  console.warn(
    `[${source}] Icon "${value}" is not a registered icon and is not a valid image path; skipping it to avoid a broken request.`
  )
  return null
}
