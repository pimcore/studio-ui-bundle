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

export const selectionMode = {
  SINGLE: 'single',
  MULTIPLE: 'multiple'
}

export interface ILanguageSelectionContext {
  currentLanguage: string
  mode: string
  setMode: (mode: string) => void
  setCurrentLanguage: (language: string) => void
}

export const LanguageSelectionContext = createContext<ILanguageSelectionContext>({
  currentLanguage: 'en',
  setCurrentLanguage: () => {},
  mode: selectionMode.SINGLE,
  setMode: () => {}
})

export interface LanguageSelectionProviderProps {
  children: React.ReactNode
}

export const LanguageSelectionProvider = ({ children }: LanguageSelectionProviderProps): React.JSX.Element => {
  // @todo check for default language
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [mode, setMode] = useState(selectionMode.SINGLE)

  return useMemo(() => (
    <LanguageSelectionContext.Provider value={ { currentLanguage, mode, setMode, setCurrentLanguage } }>
      {children}
    </LanguageSelectionContext.Provider>
  ), [currentLanguage, children])
}
