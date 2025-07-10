/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil } from 'lodash'
import React, { useMemo, useContext } from 'react'

export interface ICombinedFieldNameContext {
  combinedFieldNameParent: string[]
}

export const CombinedFieldNameContext = React.createContext<ICombinedFieldNameContext | undefined>(undefined)

export interface CombinedFieldNameProviderProps {
  combinedFieldNameParent: string[]
  children: React.ReactNode
}

export const CombinedFieldNameProvider = ({ combinedFieldNameParent, children }: CombinedFieldNameProviderProps): React.JSX.Element => {
  const parentContext = useContext(CombinedFieldNameContext)
  
  const mergedCombinedFieldNameParent = useMemo(() => {
    // If there's a parent context, merge its array with the current one
    if (!isNil(parentContext?.combinedFieldNameParent)) {
      return [...parentContext.combinedFieldNameParent, ...combinedFieldNameParent]
    }
    // Otherwise, just use the current array
    return combinedFieldNameParent
  }, [parentContext?.combinedFieldNameParent, combinedFieldNameParent])

  return useMemo(() => {
    return (
      <CombinedFieldNameContext.Provider value={ { combinedFieldNameParent: mergedCombinedFieldNameParent } }>
        { children }
      </CombinedFieldNameContext.Provider>
    )
  }, [mergedCombinedFieldNameParent, children])
}