/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { TranslationDomainProvider } from './hooks/translation-domain-provider'
import { TranslationsContainer } from './translations-container'

export interface TranslationsWrapperProps {
  initialDomain?: string
  initialSearchTerm?: string
}

export const TranslationsWrapper = ({ initialDomain, initialSearchTerm }: TranslationsWrapperProps): React.JSX.Element => {
  return (
    <TranslationDomainProvider initialDomain={ initialDomain }>
      <TranslationsContainer initialSearchTerm={ initialSearchTerm } />
    </TranslationDomainProvider>
  )
}
