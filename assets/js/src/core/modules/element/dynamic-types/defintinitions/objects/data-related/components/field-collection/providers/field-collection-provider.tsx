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

import React, { createContext } from 'react'
import { useClassFieldCollectionObjectLayoutQuery } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'

export type IFieldCollectionContext = ReturnType<typeof useClassFieldCollectionObjectLayoutQuery> | null

export const FieldCollectionContext = createContext<IFieldCollectionContext>(null)

export interface IFieldCollectionProviderProps {
  children: React.ReactNode
}

export const FieldCollectionProvider = ({ children }: IFieldCollectionProviderProps): React.JSX.Element => {
  const { id } = useElementContext()
  const fieldCollectionResult = useClassFieldCollectionObjectLayoutQuery({ objectId: id })

  return (
    <FieldCollectionContext.Provider value={ fieldCollectionResult }>
      { children }
    </FieldCollectionContext.Provider>
  )
}
