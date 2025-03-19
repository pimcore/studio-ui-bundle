/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import i18n from 'i18next'
import { isNil } from 'lodash'

interface IFormatNumberProps {
  value?: number
  lng?: string
  options?: Intl.NumberFormatOptions
}

export function formatNumber ({ value, lng, options }: IFormatNumberProps): string {
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
