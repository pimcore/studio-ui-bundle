/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useOptionalElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import React, { createContext } from 'react'
import { ProviderWithElementContext } from './type/provider-with-element-context'
import { ProviderWithoutContext } from './type/provider-without-context'

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
  const element = useOptionalElementContext();

  if (element !== null) {
    return <ProviderWithElementContext>{ children }</ProviderWithElementContext>
  }

  return <ProviderWithoutContext>{ children }</ProviderWithoutContext>
}
