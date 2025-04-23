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
import { type ClassDefinitionCollectionApiArg, type ClassDefinitionCollectionApiResponse, api } from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import { type TypedUseQueryHookResult } from '@reduxjs/toolkit/dist/query/react'
import React, { createContext, useEffect, useMemo, useState } from 'react'
import { type ClassDefinitionFolderCollectionApiResponse, useClassDefinitionCollectionQuery } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { useAppDispatch } from '@Pimcore/app/store'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { type ApiErrorData } from '@Pimcore/modules/app/error-handler/classes/api-error'
import { Content } from '@Pimcore/components/content/content'

export type ClassDefinitionsData = TypedUseQueryHookResult<ClassDefinitionCollectionApiResponse, ClassDefinitionCollectionApiArg, BaseQuery>

export type ClassDefinitionsContextProps = ClassDefinitionsData | undefined

export const ClassDefinitionContext = createContext<ClassDefinitionsContextProps>(undefined)

export interface ClassDefinitionsProviderProps {
  children: React.ReactNode
  elementId?: number
}

export interface FolderQueryState {
  isLoading: boolean
  data: ClassDefinitionFolderCollectionApiResponse | undefined
}

export const ClassDefinitionsProvider = ({ children, elementId }: ClassDefinitionsProviderProps): React.JSX.Element => {
  const queryResultReturn = useClassDefinitionCollectionQuery()
  const dispatch = useAppDispatch()
  const [folderQueryState, setFolderQueryState] = useState<FolderQueryState>({
    isLoading: elementId !== undefined,
    data: undefined
  })

  useEffect(() => {
    if (elementId === undefined) {
      return
    }

    const response = dispatch(api.endpoints.classDefinitionFolderCollection.initiate({ folderId: elementId }))
    response.unwrap().then((data) => {
      setFolderQueryState({
        isLoading: false,
        data
      })
    }).catch((error) => {
      trackError(new ApiError(error as unknown as ApiErrorData))
    })
  }, [elementId])

  if (queryResultReturn?.error !== undefined) {
    trackError(new ApiError(queryResultReturn.error))
  }

  const transformedQueryResult = { ...queryResultReturn }
  transformedQueryResult.isLoading = queryResultReturn.isLoading || folderQueryState.isLoading
  transformedQueryResult.isFetching = queryResultReturn.isFetching || folderQueryState.isLoading

  if (elementId !== undefined && folderQueryState.data !== undefined && queryResultReturn.data !== undefined) {
    transformedQueryResult.data = {
      ...queryResultReturn.data,
      items: folderQueryState.data.items.map((folderItem) => {
        const classDefinition = queryResultReturn.data?.items.find((item) => item.id === folderItem.id)
        if (classDefinition !== undefined) {
          return {
            ...classDefinition
          }
        }

        throw new Error('Class definition not found')
      }),
      totalItems: folderQueryState.data.totalItems
    }
  }

  return useMemo(() => {
    if (transformedQueryResult.isLoading) {
      return (
        <Content loading />
      )
    }

    return (
      <ClassDefinitionContext.Provider value={ transformedQueryResult }>
        {children}
      </ClassDefinitionContext.Provider>
    )
  }, [transformedQueryResult])
}
