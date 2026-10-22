/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, type ReactNode } from 'react'

const FieldLabelTechnicalNameContext = createContext<string | undefined>(undefined)

export interface FieldLabelTechnicalNameProviderProps {
  technicalName?: string
  children: ReactNode
}

export const FieldLabelTechnicalNameProvider = ({ technicalName, children }: FieldLabelTechnicalNameProviderProps): React.JSX.Element => {
  return (
    <FieldLabelTechnicalNameContext.Provider value={ technicalName }>
      { children }
    </FieldLabelTechnicalNameContext.Provider>
  )
}

export const useFieldLabelTechnicalName = (): string | undefined => useContext(FieldLabelTechnicalNameContext)
