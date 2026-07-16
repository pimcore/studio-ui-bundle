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
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { type PermissionBasedLanguageSelectionControlProps } from '../permission-based-language-selection-control'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'

export const WithElementContext = (props: PermissionBasedLanguageSelectionControlProps): React.JSX.Element => {
  const user = useUser()
  const elementContext = useElementContext()
  const elementDraft = useElementDraft(elementContext.id, elementContext.elementType)
  const availableLanguages: string[] = []

  if ('permissions' in elementDraft) {
    const permissions: Record<string, any> = elementDraft.permissions as Record<string, any>
    const viewableLanguages: string[] = permissions?.localizedView?.split(',') ?? []
    let currentAvailableLanguages = (user.contentLanguages as string[])?.filter(lang => viewableLanguages.includes(lang)) ?? []

    if ((viewableLanguages.length === 1 && viewableLanguages[0] === 'default') || (viewableLanguages.length === 0)) {
      currentAvailableLanguages = Array.isArray(user.contentLanguages) ? user.contentLanguages as string[] : []
    }

    availableLanguages.push(...currentAvailableLanguages)
  } else {
    availableLanguages.push(...(Array.isArray(user.contentLanguages) ? user.contentLanguages as string[] : []))
  }

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
