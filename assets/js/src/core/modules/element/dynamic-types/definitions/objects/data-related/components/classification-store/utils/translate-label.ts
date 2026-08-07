/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type TFunction } from 'i18next'
import { isEmpty, isNil } from 'lodash'

/**
 * Collection/group/key `name` and `description` values may be translation keys in the
 * `studio` domain rather than display-ready text (the same convention used for grid-value
 * translation, see the `Translate` grid transformer). Resolves them via i18next, falling
 * back to the raw value for empty/blank strings so `t()` is never called with an empty key.
 * `nsSeparator: false` disables i18next's default `:` namespace parsing for this dynamic
 * lookup — otherwise a plain-text value containing a colon (e.g. "Color: Blue") would be
 * split into a namespace/key pair and silently fall back to the part after the colon.
 */
export const translateLabel = (t: TFunction, value: unknown): string => {
  const stringValue = isNil(value) ? '' : String(value)

  return isEmpty(stringValue) ? stringValue : t(stringValue, { nsSeparator: false })
}
