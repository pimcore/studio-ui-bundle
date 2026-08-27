/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import i18n from 'i18next'
import { isString } from 'lodash'
import { isNonEmptyString, toDisplayString } from './type-utils'

const TRANSLATE_OPTIONS = { nsSeparator: false } as const

export const translateLabel = (value: unknown): string => {
  if (!isNonEmptyString(value)) {
    return isString(value) ? '' : toDisplayString(value)
  }

  return i18n.exists(value, TRANSLATE_OPTIONS) ? i18n.t(value, TRANSLATE_OPTIONS) : value
}
