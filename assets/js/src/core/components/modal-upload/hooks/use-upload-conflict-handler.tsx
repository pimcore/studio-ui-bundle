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

/**
 * File names checked per request. The backend resolves each name individually
 * and rejects more than 100 per call, so this stays well below that ceiling.
 */
const EXISTS_CHECK_BATCH_SIZE = 25

interface UseUploadConflictHandlerProps {
  targetFolderId?: number
}

/** Reports how many files of the batch have been checked for name conflicts so far. */
export type UploadCheckProgressCallback = (done: number, total: number) => void

interface UseUploadConflictHandlerResult {
  resolveConflicts: (files: RcFile[], onProgress?: UploadCheckProgressCallback) => Promise<void>
  shouldSkipFile: (file: RcFile) => boolean
  hasCheckError: (file: RcFile) => boolean
  getCheckError: (file: RcFile) => unknown
  getReplaceId: (file: RcFile | UploadFile) => number | undefined
  reset: () => void
  cleanupProcessedFiles: (files: UploadFile[]) => void
}

export const useUploadConflictHandler = ({ targetFolderId }: UseUploadConflictHandlerProps): UseUploadConflictHandlerResult => {
  const { checkFilesExist, askUserOverwrite, resetApplyToAll } = useUploadConflictModal()

  const replaceFilesRef = useRef<Map<string, number>>(new Map())
  const batchCheckPromiseRef = useRef<Promise<void> | null>(null)
  const skippedFilesRef = useRef<Set<string>>(new Set())
  const errorFilesRef = useRef<Map<string, unknown>>(new Map())

  const resolveConflicts = async (files: RcFile[], onProgress?: UploadCheckProgressCallback): Promise<void> => {
    if (isNil(targetFolderId)) {
      return
    }

    if (isNil(batchCheckPromiseRef.current)) {
      batchCheckPromiseRef.current = (async () => {
        const fileChunks = chunk(files, EXISTS_CHECK_BATCH_SIZE)
        const checkResults: Array<{ file: RcFile, exists: boolean, id?: number, error?: unknown }> = []

        onProgress?.(0, files.length)

        // One request per batch, issued one after another: the batches are the
        // back-pressure, so they must not also run in parallel.
        for (const fileChunk of fileChunks) {
          const chunkResults = await checkFilesExist(fileChunk.map((f) => f.name), targetFolderId)

          fileChunk.forEach((f, index) => {
            checkResults.push({ file: f, ...chunkResults[index] })
          })

          onProgress?.(checkResults.length, files.length)
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
