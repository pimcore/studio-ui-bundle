/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type DocumentTranslationLinks } from '@Pimcore/modules/document/document-api-slice.gen'

export const getUntranslatedLanguages = (
  validLanguages: string[],
  translations: DocumentTranslationLinks | undefined,
  currentLanguage: string = ''
): string[] => {
  const unavailable = new Set<string>([
    currentLanguage,
    translations?.language ?? '',
    ...(translations?.translationLinks ?? []).map((link) => link.language)
  ])

  return validLanguages.filter((locale) => !unavailable.has(locale))
}
