/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'
import React, { useMemo, useState } from 'react'
import { LanguageSelectionContext, type LanguageSelectionProviderProps } from '../language-selection-provider'

export const ProviderWithElementContext = ({ children }: LanguageSelectionProviderProps): React.JSX.Element => {
  const user = useUser()
  let initialLanguage = user.contentLanguages?.[0] ?? 'en'
  const element = useElementContext()
  const elementDraft = useElementDraft(element.id, element.elementType)

  if ('permissions' in elementDraft) {
    const permissions: Record<string, any> = elementDraft.permissions as Record<string, any>
    const viewableLanguages: string[] = permissions?.localizedView?.split(',') ?? []

    if ((viewableLanguages.length === 1 && viewableLanguages[0] === 'default') || (viewableLanguages.length === 0)) {
      initialLanguage = user.contentLanguages?.[0] ?? 'en'
    } else {
      initialLanguage = ((user.contentLanguages as string[])?.filter(lang => viewableLanguages.includes(lang)) ?? [])[0] ?? 'en'
    }
  }

  const [currentLanguage, setCurrentLanguage] = useState(initialLanguage)
  const [hasLocalizedFields, setHasLocalizedFields] = useState(false)

  return useMemo(() => (
    <LanguageSelectionContext.Provider value={ { currentLanguage, setCurrentLanguage, setHasLocalizedFields, hasLocalizedFields } }>
      {children}
    </LanguageSelectionContext.Provider>
  ), [currentLanguage, hasLocalizedFields, children])
}
