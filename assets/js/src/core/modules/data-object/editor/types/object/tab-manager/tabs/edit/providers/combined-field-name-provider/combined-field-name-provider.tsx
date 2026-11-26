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
  /** Field names from the object down to here, addressing the field definition (no item indexes) */
  combinedFieldNameParent: string[]
  /** The same path with the index of each block or field collection item, addressing the value */
  fieldPathParent: Array<string | number>
}

export const CombinedFieldNameContext = React.createContext<ICombinedFieldNameContext | undefined>(undefined)

export interface CombinedFieldNameProviderProps {
  combinedFieldNameParent: string[]
  /** Path segment of the value, defaults to combinedFieldNameParent. A list item adds its index here. */
  fieldPathParent?: Array<string | number>
  children: React.ReactNode
}

export const CombinedFieldNameProvider = ({ combinedFieldNameParent, fieldPathParent, children }: CombinedFieldNameProviderProps): React.JSX.Element => {
  const parentContext = useContext(CombinedFieldNameContext)
  const ownFieldPathParent = fieldPathParent ?? combinedFieldNameParent
  const ownFieldPathKey = JSON.stringify(ownFieldPathParent)

  const mergedFieldPathParent = useMemo(
    () => [...(parentContext?.fieldPathParent ?? []), ...ownFieldPathParent],
    [parentContext?.fieldPathParent, ownFieldPathKey]
  )

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
      <CombinedFieldNameContext.Provider value={ { combinedFieldNameParent: mergedCombinedFieldNameParent, fieldPathParent: mergedFieldPathParent } }>
        { children }
      </CombinedFieldNameContext.Provider>
    )
  }, [mergedCombinedFieldNameParent, mergedFieldPathParent, children])
}
