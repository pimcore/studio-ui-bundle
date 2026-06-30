/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

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
