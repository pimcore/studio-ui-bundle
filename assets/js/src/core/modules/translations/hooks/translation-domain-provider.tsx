/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState, createContext, useMemo, useContext } from 'react'

export interface DomainContext {
  domain: string
  setDomain: React.Dispatch<React.SetStateAction<string>>
}

export const TranslationDomainContext = createContext<DomainContext>({
  domain: 'message',
  setDomain: () => {}
})

export interface TranslationDomainProviderProps {
  children: React.ReactNode
}

export const TranslationDomainProvider = ({ children }: TranslationDomainProviderProps): React.JSX.Element => {
  const [domain, setDomain] = useState<string>('messages')

  return useMemo(() => (
    <TranslationDomainContext.Provider value={ { domain, setDomain } }>
      {children}
    </TranslationDomainContext.Provider>
  ), [domain, children])
}

export const useTranslationDomain = (): DomainContext => {
  const context = useContext(TranslationDomainContext)
  if (context === undefined) {
    throw new Error('useTranslationDomain must be used within a TranslationDomainProvider')
  }
  return context
}
