/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext, useState } from 'react'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { type SerializedError } from '@reduxjs/toolkit'
import { DocumentContext } from '../../document-provider'
import { useDocumentDraft } from '../../hooks/use-document-draft'
import { SaveTaskType } from '@sdk/modules/data-object'
import { documentSaveService } from '../../services'

export interface UseSaveHookReturn {
  save: (task?: SaveTaskType, onFinish?: () => void) => Promise<void>
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  error: FetchBaseQueryError | SerializedError | undefined
}

export { SaveTaskType }

export const useSave = (): UseSaveHookReturn => {
  const { id } = useContext(DocumentContext)
  const { document } = useDocumentDraft(id)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<FetchBaseQueryError | SerializedError | undefined>()

  const save = async (task?: SaveTaskType, onFinish?: () => void): Promise<void> => {
    if (document?.changes === undefined) return

    try {
      setIsLoading(true)
      setIsError(false)
      setError(undefined)
      setIsSuccess(false)

      // Simply call the document save service
      await documentSaveService.saveDocument(id, task)

      setIsSuccess(true)
      onFinish?.()
    } catch (error) {
      console.error('Save failed:', error)
      setIsError(true)
      setError(error as FetchBaseQueryError | SerializedError)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    save,
    isLoading,
    isSuccess,
    isError,
    error
  }
}
