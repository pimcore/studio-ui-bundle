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

import { type BaseQuery } from '@Pimcore/app/api/pimcore'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { type ClassDefinitionCollectionApiArg, type ClassDefinitionCollectionApiResponse, useClassDefinitionCollectionQuery } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { type TypedUseQueryHookResult } from '@reduxjs/toolkit/dist/query/react'
import React, { createContext, useMemo } from 'react'

export type ClassDefinitionsData = TypedUseQueryHookResult<ClassDefinitionCollectionApiResponse, ClassDefinitionCollectionApiArg, BaseQuery>

export type ClassDefinitionsContextProps = ClassDefinitionsData | undefined

export const ClassDefinitionContext = createContext<ClassDefinitionsContextProps>(undefined)

export interface ClassDefinitionsProviderProps {
  children: React.ReactNode
}

export const ClassDefinitionsProvider = ({ children }: ClassDefinitionsProviderProps): React.JSX.Element => {
  const queryResultReturn = useClassDefinitionCollectionQuery()

  if (queryResultReturn.error !== undefined) {
    trackError(new ApiError(queryResultReturn.error))
  }

  return useMemo(() => (
    <ClassDefinitionContext.Provider value={ queryResultReturn }>
      {children}
    </ClassDefinitionContext.Provider>
  ), [queryResultReturn])
}
