/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type BaseQuery } from '@Pimcore/app/api/pimcore'
import { type ClassDefinitionCollectionApiArg, type ClassDefinitionCollectionApiResponse, api } from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import { type TypedUseQueryHookResult } from '@reduxjs/toolkit/dist/query/react'
import React, { createContext, useEffect, useMemo, useState } from 'react'
import { type ClassDefinitionFolderCollectionApiResponse, useClassDefinitionCollectionQuery } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { useAppDispatch } from '@sdk/app'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { type ApiErrorData } from '@Pimcore/modules/app/error-handler/types'
import { Content } from '@Pimcore/components/content/content'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'

export type ClassDefinitionsData = TypedUseQueryHookResult<ClassDefinitionCollectionApiResponse, ClassDefinitionCollectionApiArg, BaseQuery>

export type ClassDefinitionsContextProps = ClassDefinitionsData | undefined

export const ClassDefinitionContext = createContext<ClassDefinitionsContextProps>(undefined)

export interface ClassDefinitionsProviderProps {
  children: React.ReactNode
  elementId?: number
  showLoadingIndicator?: boolean
}

export interface FolderQueryState {
  isLoading: boolean
  data: ClassDefinitionFolderCollectionApiResponse | undefined
}

export const ClassDefinitionsProvider = ({ children, elementId, showLoadingIndicator = true }: ClassDefinitionsProviderProps): React.JSX.Element => {
  const hasObjectsPermission = isAllowed(UserPermission.Objects)
  const queryResultReturn = useClassDefinitionCollectionQuery(undefined, {
    skip: !hasObjectsPermission
  })
  const dispatch = useAppDispatch()
  const [folderQueryState, setFolderQueryState] = useState<FolderQueryState>({
    isLoading: elementId !== undefined,
    data: undefined
  })

  useEffect(() => {
    if (elementId === undefined || !hasObjectsPermission) {
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
  }, [elementId, hasObjectsPermission])

  if (queryResultReturn?.error !== undefined) {
    trackError(new ApiError(queryResultReturn.error))
  }

  const transformedQueryResult = { ...queryResultReturn }

  // If user doesn't have objects permission, provide empty data
  if (!hasObjectsPermission) {
    transformedQueryResult.data = {
      items: [],
      totalItems: 0
    }
    transformedQueryResult.isLoading = false
    transformedQueryResult.isFetching = false
  } else {
    transformedQueryResult.isLoading = queryResultReturn.isLoading || folderQueryState.isLoading
    transformedQueryResult.isFetching = queryResultReturn.isFetching || folderQueryState.isLoading
  }

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
    if (transformedQueryResult.isLoading && showLoadingIndicator) {
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
