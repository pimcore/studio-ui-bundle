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

import { useTranslation } from 'react-i18next'

interface IFormatNumberProps {
  value: number
  lng?: string
  options?: Intl.NumberFormatOptions
}

export function formatNumber ({ value, lng = 'en', options }: IFormatNumberProps): string {
  const { i18n } = useTranslation()

  return i18n.format(
    value,
    'number',
    lng,
    options
  )
}
