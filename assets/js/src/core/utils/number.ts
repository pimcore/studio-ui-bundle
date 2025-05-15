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
import { isNil } from 'lodash'

interface IFormatNumberProps {
  value?: number
  lng?: string
  options?: Intl.NumberFormatOptions
}

export function formatNumber ({ value, lng, options = { useGrouping: false } }: IFormatNumberProps): string {
  if (isNil(value)) {
    return ''
  }

  if (lng === undefined) {
    lng = i18n.language
  }

  return i18n.format(
    value,
    'number',
    lng,
    options
  )
}
