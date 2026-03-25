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

interface GetLanguageNameProps {
  locale: string
  lng?: string
}

export function getLanguageName ({ locale, lng }: GetLanguageNameProps): string {
  lng ??= i18n.language

  const normalizedLng = lng.replaceAll('_', '-')
  const normalizedLocale = locale.replaceAll('_', '-')

  const localizer = new Intl.DisplayNames([normalizedLng], { type: 'language' })

  return localizer.of(normalizedLocale) ?? locale
}
