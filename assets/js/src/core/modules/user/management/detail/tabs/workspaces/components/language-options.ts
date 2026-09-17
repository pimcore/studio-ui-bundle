/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { LANGUAGE_INDEPENDENT_KEY } from '@Pimcore/components/language-selection/helpers'

export interface LanguagePermissionOption {
  value: string
  label: string
}

/**
 * Builds the option list for the workspace language permissions. The language independent
 * ("default") value is always the first option, so an administrator can grant access to the
 * language independent column of a localized field - it is not part of the valid languages.
 */
export const buildLanguagePermissionOptions = (
  validLanguages: string[],
  getDisplayName: (language: string) => string | undefined,
  languageIndependentLabel: string
): LanguagePermissionOption[] => {
  const languageOptions = validLanguages
    .filter((language) => language !== LANGUAGE_INDEPENDENT_KEY)
    .map((language) => ({
      value: language,
      label: getDisplayName(language) ?? language
    }))
    .sort((a, b) => a.label.localeCompare(b.label))

  return [
    { value: LANGUAGE_INDEPENDENT_KEY, label: languageIndependentLabel },
    ...languageOptions
  ]
}
