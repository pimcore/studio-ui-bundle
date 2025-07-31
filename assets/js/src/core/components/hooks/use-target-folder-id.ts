/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useState, useEffect } from 'react'
import { useAppDispatch } from '@sdk/app'
import { api as elementApi } from '@Pimcore/modules/element/element-api-slice.gen'
import { isEmpty, isNil } from 'lodash'

export interface UseTargetFolderIdProps {
  targetFolderId?: number
  targetFolderPath?: string
}

export interface UseTargetFolderIdReturn {
  targetFolderId: number | undefined
  isResolving: boolean
  error: string | null
}

/**
 * Hook to resolve target folder ID from either a direct ID or a folder path
 */
export const useTargetFolderId = ({
  targetFolderId: propTargetFolderId,
  targetFolderPath
}: UseTargetFolderIdProps): UseTargetFolderIdReturn => {
  const [targetFolderId, setTargetFolderId] = useState<number | undefined>(propTargetFolderId)
  const [isResolving, setIsResolving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setError(null)

    if (!isNil(propTargetFolderId)) {
      setTargetFolderId(propTargetFolderId)
      setIsResolving(false)
      return
    }

    if (!isNil(targetFolderPath) && !isEmpty(targetFolderPath) && targetFolderPath !== '/') {
      setIsResolving(true)
      
      dispatch(elementApi.endpoints.elementGetIdByPath.initiate({
        elementType: 'asset',
        elementPath: targetFolderPath
      }))
        .unwrap()
        .then((data) => {
          if (!isNil(data?.id)) {
            setTargetFolderId(data.id)
          } else {
            const errorMsg = `Could not resolve upload path: ${targetFolderPath}`
            console.warn(errorMsg)
            setError(errorMsg)
            setTargetFolderId(1)
          }
        })
        .catch((error) => {
          const errorMsg = `Error resolving upload path "${targetFolderPath}": ${error.message ?? 'Unknown error'}`
          console.error(errorMsg, error)
          setError(errorMsg)
          setTargetFolderId(1)
        })
        .finally(() => {
          setIsResolving(false)
        })
    } else {
      setTargetFolderId(1)
      setIsResolving(false)
    }
  }, [propTargetFolderId, targetFolderPath, dispatch])

  return {
    targetFolderId,
    isResolving,
    error
  }
}