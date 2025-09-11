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
import React, { useMemo, useState } from 'react'
import { LanguageSelectionContext, type LanguageSelectionProviderProps } from '../language-selection-provider'

export const ProviderWithoutContext = ({ children }: LanguageSelectionProviderProps): React.JSX.Element => {
  const user = useUser()
  const initialLanguage = user.contentLanguages?.[0] ?? 'en'

  const [currentLanguage, setCurrentLanguage] = useState(initialLanguage)
  const [hasLocalizedFields, setHasLocalizedFields] = useState(false)

  return useMemo(() => (
    <LanguageSelectionContext.Provider value={ { currentLanguage, setCurrentLanguage, setHasLocalizedFields, hasLocalizedFields } }>
      {children}
    </LanguageSelectionContext.Provider>
  ), [currentLanguage, hasLocalizedFields, children])
}
