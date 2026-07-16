/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { LanguageSelection as BaseLanguageSelection } from '@Pimcore/components/language-selection/language-selection'
import React from 'react'
import { type PermissionBasedLanguageSelectionControlProps } from '../permission-based-language-selection-control'
import { usePermittedContentLanguages } from '../use-permitted-content-languages'

export const WithElementContext = (props: PermissionBasedLanguageSelectionControlProps): React.JSX.Element => {
  const availableLanguages: string[] = [...usePermittedContentLanguages()]

  if (props.customKeys !== undefined && props.customKeys.length > 0) {
    availableLanguages.unshift(...props.customKeys)
  }

  if (props.excludeLocales !== undefined && props.excludeLocales.length > 0) {
    const excluded = new Set(props.excludeLocales)

    availableLanguages.splice(0, availableLanguages.length, ...availableLanguages.filter(lang => !excluded.has(lang)))
  }

  if (props.isNullable === true) {
    availableLanguages.unshift('-')
  }

  const onChangeLanguage = (language: string | null): void => {
    if (language === '-') {
      props.onChange(null); return
    }

    props.onChange(language)
  }

  return (
    <BaseLanguageSelection
      customKeys={ props.customKeys }
      languages={ availableLanguages }
      onSelectLanguage={ onChangeLanguage }
      selectedLanguage={ props.value ?? '-' }
    />
  )
}
