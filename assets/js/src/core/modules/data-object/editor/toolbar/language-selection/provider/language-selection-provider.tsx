/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useMemo, useState } from 'react'

export interface ILanguageSelectionContext {
  currentLanguage: string
  setCurrentLanguage: (language: string) => void
  hasLocalizedFields: boolean
  setHasLocalizedFields: (hasLocalizedFields: boolean) => void
}

export const LanguageSelectionContext = createContext<ILanguageSelectionContext>({
  currentLanguage: 'en',
  setCurrentLanguage: () => {},
  hasLocalizedFields: false,
  setHasLocalizedFields: () => {}
})

export interface LanguageSelectionProviderProps {
  children: React.ReactNode
}

export const LanguageSelectionProvider = ({ children }: LanguageSelectionProviderProps): React.JSX.Element => {
  // @todo check for default language
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [hasLocalizedFields, setHasLocalizedFields] = useState(false)

  return useMemo(() => (
    <LanguageSelectionContext.Provider value={ { currentLanguage, setCurrentLanguage, setHasLocalizedFields, hasLocalizedFields } }>
      {children}
    </LanguageSelectionContext.Provider>
  ), [currentLanguage, hasLocalizedFields, children])
}
