/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext } from 'react'
import { useClassFieldCollectionObjectLayoutQuery } from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { Content } from '@Pimcore/components/content/content'

export type IFieldCollectionContext = ReturnType<typeof useClassFieldCollectionObjectLayoutQuery> | null

export const FieldCollectionContext = createContext<IFieldCollectionContext>(null)

export interface IFieldCollectionProviderProps {
  id?: number
  children: React.ReactNode
}

export const FieldCollectionProvider = ({ children, id }: IFieldCollectionProviderProps): React.JSX.Element => {
  const { id: elementId } = useElementContext()
  const fieldCollectionResult = useClassFieldCollectionObjectLayoutQuery({ objectId: id ?? elementId })

  const { isLoading } = fieldCollectionResult

  if (isLoading) {
    return <Content loading />
  }

  return (
    <FieldCollectionContext.Provider value={ fieldCollectionResult }>
      { children }
    </FieldCollectionContext.Provider>
  )
}
