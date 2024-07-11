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

interface IFormatRelativeTimeProps {
  value: number
  unit: Intl.RelativeTimeFormatUnit
  lng?: string
  options?: Intl.RelativeTimeFormatOptions
}

export function formatRelativeTime ({ value, unit, lng, options }: IFormatRelativeTimeProps): string {
  if (lng === undefined) {
    lng = i18n.language
  }

  const formatter = new Intl.RelativeTimeFormat(lng, options)

  return formatter.format(value, unit)
}
