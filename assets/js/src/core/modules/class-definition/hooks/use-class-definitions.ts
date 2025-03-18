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

import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { type ClassDefinitionListItem } from '../class-definition-slice.gen'
import { getClassDefinitions as sliceGetClassDefinitions, setClassDefinitions } from '../class-defintion.slice'
import { useAppDispatch } from '@Pimcore/app/store'
import { api } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'

interface UseClassDefinitionsHookReturn {
  loadClassDefinitions: () => Promise<void>
  getClassDefinitions: () => ClassDefinitionListItem[]
}

export const useClassDefinitions = (): UseClassDefinitionsHookReturn => {
  const dispatch = useAppDispatch()

  const loadClassDefinitions = async (): Promise<void> => {
    const classDefinitionFetcher = dispatch(api.endpoints.classDefinitionCollection.initiate())

    classDefinitionFetcher
      .then(({ data, isSuccess, isError, error }) => {
        isError && trackError(new ApiError(error))

        if (isSuccess && data !== undefined) {
          dispatch(setClassDefinitions(data))
        }
      })
      .catch(() => { })
  }

  const getClassDefinitions = (): ClassDefinitionListItem[] => {
    const classDefinitions = useSelector(sliceGetClassDefinitions)

    return useMemo(() => (classDefinitions), [classDefinitions])
  }

  return {
    loadClassDefinitions,
    getClassDefinitions
  }
}
