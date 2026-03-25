/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useRef } from 'react'
import { isNil, chunk } from 'lodash'
import type { RcFile, UploadFile } from 'antd/es/upload/interface'
import { useUploadConflictModal } from './use-upload-conflict-modal'

export enum UploadConflictAction {
  OVERWRITE = 'overwrite',
  KEEP = 'keep',
  SKIP = 'skip'
}

interface UseUploadConflictHandlerProps {
  targetFolderId?: number
}

interface UseUploadConflictHandlerResult {
  resolveConflicts: (files: RcFile[]) => Promise<void>
  shouldSkipFile: (file: RcFile) => boolean
  hasCheckError: (file: RcFile) => boolean
  getCheckError: (file: RcFile) => unknown
  getReplaceId: (file: RcFile | UploadFile) => number | undefined
  reset: () => void
  cleanupProcessedFiles: (files: UploadFile[]) => void
}

export const useUploadConflictHandler = ({ targetFolderId }: UseUploadConflictHandlerProps): UseUploadConflictHandlerResult => {
  const { checkFileExists, askUserOverwrite, resetApplyToAll } = useUploadConflictModal()

  const replaceFilesRef = useRef<Map<string, number>>(new Map())
  const batchCheckPromiseRef = useRef<Promise<void> | null>(null)
  const skippedFilesRef = useRef<Set<string>>(new Set())
  const errorFilesRef = useRef<Map<string, unknown>>(new Map())

  const resolveConflicts = async (files: RcFile[]): Promise<void> => {
    if (isNil(targetFolderId)) {
      return
    }

    if (isNil(batchCheckPromiseRef.current)) {
      batchCheckPromiseRef.current = (async () => {
        const CONCURRENCY_LIMIT = 5
        const fileChunks = chunk(files, CONCURRENCY_LIMIT)
        const checkResults: Array<{ file: RcFile, exists: boolean, id?: number, error?: unknown }> = []

        for (const fileChunk of fileChunks) {
          const chunkResults = await Promise.all(
            fileChunk.map(async (f) => ({ file: f, ...await checkFileExists(f.name, targetFolderId) }))
          )
          checkResults.push(...chunkResults)
        }

        checkResults.forEach(result => {
          if (!isNil(result.error)) {
            errorFilesRef.current.set(result.file.uid, result.error)
          }
        })

        for (const { file: f, id } of checkResults.filter(r => r.exists && !isNil(r.id))) {
          const action = await askUserOverwrite(f.name)

          if (action === UploadConflictAction.SKIP) {
            skippedFilesRef.current.add(f.uid)
          } else if (action === UploadConflictAction.OVERWRITE) {
            replaceFilesRef.current.set(`${f.name}-${f.size}`, id!)
          }
        }
      })()
    }

    await batchCheckPromiseRef.current
  }

  const shouldSkipFile = (file: RcFile): boolean => skippedFilesRef.current.has(file.uid)

  const hasCheckError = (file: RcFile): boolean => errorFilesRef.current.has(file.uid)

  const getCheckError = (file: RcFile): unknown => errorFilesRef.current.get(file.uid)

  const getReplaceId = (file: RcFile | UploadFile): number | undefined =>
    replaceFilesRef.current.get(`${file.name}-${file.size}`)

  const reset = (): void => {
    replaceFilesRef.current.clear()
    resetApplyToAll()
    batchCheckPromiseRef.current = null
    skippedFilesRef.current.clear()
    errorFilesRef.current.clear()
  }

  const cleanupProcessedFiles = (files: UploadFile[]): void => {
    files.forEach(file => { replaceFilesRef.current.delete(`${file.name}-${file.size}`) })
  }

  return {
    resolveConflicts,
    shouldSkipFile,
    hasCheckError,
    getCheckError,
    getReplaceId,
    reset,
    cleanupProcessedFiles
  }
}
