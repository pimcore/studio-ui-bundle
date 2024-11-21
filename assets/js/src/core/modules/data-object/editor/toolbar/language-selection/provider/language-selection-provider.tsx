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

import React, { createContext, useMemo, useState } from 'react'

export interface ILanguageSelectionContext {
  currentLanguage: string
  setCurrentLanguage: (language: string) => void
}

export const LanguageSelectionContext = createContext<ILanguageSelectionContext>({
  currentLanguage: 'en',
  setCurrentLanguage: () => {}
})

export interface LanguageSelectionProviderProps {
  children: React.ReactNode
}

export const LanguageSelectionProvider = ({ children }: LanguageSelectionProviderProps): React.JSX.Element => {
  // @todo check for default language
  const [currentLanguage, setCurrentLanguage] = useState('en')

  return useMemo(() => (
    <LanguageSelectionContext.Provider value={ { currentLanguage, setCurrentLanguage } }>
      {children}
    </LanguageSelectionContext.Provider>
  ), [currentLanguage, children])
}
