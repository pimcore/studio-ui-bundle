/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useRef } from 'react'
import { App, Button, Switch } from 'antd'
import { api as assetApi } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { useAppDispatch } from '@sdk/app'
import { trackError, ApiError } from '@sdk/modules/app'
import { isNil, chunk } from 'lodash'
import { useTranslation } from 'react-i18next'
import { Box, Flex } from '@sdk/components'
import { Icon } from '@Pimcore/components/icon/icon'
import type { RcFile, UploadFile } from 'antd/es/upload/interface'

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
  getReplaceId: (file: RcFile | UploadFile) => number | undefined
  reset: () => void
  cleanupProcessedFiles: (files: UploadFile[]) => void
}

export const useUploadConflictHandler = ({ targetFolderId }: UseUploadConflictHandlerProps): UseUploadConflictHandlerResult => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { modal } = App.useApp()

  const replaceFilesRef = useRef<Map<string, number>>(new Map())
  const applyToAllRef = useRef<{ action: UploadConflictAction | null }>({ action: null })
  const batchCheckPromiseRef = useRef<Promise<void> | null>(null)
  const skippedFilesRef = useRef<Set<string>>(new Set())
  const errorFilesRef = useRef<Set<string>>(new Set())

  const checkFileExists = async (fileName: string): Promise<{ exists: boolean, id?: number, error?: boolean }> => {
    if (isNil(targetFolderId)) {
      return { exists: false }
    }

    const { data: uploadInfo, error } = await dispatch(
      assetApi.endpoints.assetUploadInfo.initiate({
        parentId: targetFolderId,
        fileName
      }, { forceRefetch: true })
    )

    if (!isNil(error)) {
      console.error('Error checking file existence:', error)
      trackError(new ApiError(error))
      return { exists: false, error: true }
    }

    if (uploadInfo?.exists === true && !isNil(uploadInfo.assetId)) {
      return { exists: true, id: uploadInfo.assetId }
    }

    return { exists: false }
  }

  const askUserOverwrite = async (fileName: string): Promise<UploadConflictAction> => {
    if (!isNil(applyToAllRef.current.action)) {
      return applyToAllRef.current.action
    }

    return await new Promise((resolve) => {
      let applyToAll = false

      const handleAction = (action: UploadConflictAction): void => {
        if (applyToAll) {
          applyToAllRef.current.action = action
        }

        modalInstance.destroy()
        resolve(action)
      }

      const modalInstance = modal.confirm({
        title: t('asset.upload.file-exists.title'),
        icon: <Icon
          options={ { width: 24, height: 24 } }
          value="warning-circle"
              />,
        content: (
          <>
            <Box margin={ { bottom: 'small' } }>
              {t('asset.upload.file-exists.message', { fileName })}
            </Box>
            <Box margin={ { bottom: 'small' } }>
              <Flex
                align="center"
                gap="small"
              >
                <Switch
                  onChange={ (checked) => {
                    applyToAll = checked
                  } }
                  size="small"
                />
                <span>{t('asset.upload.apply-to-all')}</span>
              </Flex>
            </Box>
          </>
        ),
        footer: () => (
          <Flex
            justify="flex-end"
          >
            <Button onClick={ () => { handleAction(UploadConflictAction.SKIP) } }>
              {t('asset.upload.skip')}
            </Button>
            <Button onClick={ () => { handleAction(UploadConflictAction.KEEP) } }>
              {t('asset.upload.keep-both')}
            </Button>
            <Button
              onClick={ () => { handleAction(UploadConflictAction.OVERWRITE) } }
            >
              {t('asset.upload.overwrite')}
            </Button>
          </Flex>
        ),
        closable: false,
        maskClosable: false,
        keyboard: false
      })
    })
  }

  const resolveConflicts = async (files: RcFile[]): Promise<void> => {
    if (isNil(targetFolderId)) {
      return
    }

    if (isNil(batchCheckPromiseRef.current)) {
      batchCheckPromiseRef.current = (async () => {
        const CONCURRENCY_LIMIT = 5
        const fileChunks = chunk(files, CONCURRENCY_LIMIT)
        const checkResults: Array<{ file: RcFile, exists: boolean, id?: number, error?: boolean }> = []

        for (const fileChunk of fileChunks) {
          const chunkPromises = fileChunk.map(async (f) => {
            const result = await checkFileExists(f.name)
            return { file: f, ...result }
          })

          const chunkResults = await Promise.all(chunkPromises)
          checkResults.push(...chunkResults)
        }

        checkResults.forEach(result => {
          if (result.error === true) {
            errorFilesRef.current.add(result.file.uid)
          }
        })

        const conflicts = checkResults.filter(result => result.exists && !isNil(result.id))

        for (const { file: f, id } of conflicts) {
          const action = await askUserOverwrite(f.name)

          if (action === UploadConflictAction.SKIP) {
            skippedFilesRef.current.add(f.uid)
          } else if (action === UploadConflictAction.OVERWRITE) {
            const fileKey = `${f.name}-${f.size}`
            replaceFilesRef.current.set(fileKey, id!)
          }
        }
      })()
    }

    await batchCheckPromiseRef.current
  }

  const shouldSkipFile = (file: RcFile): boolean => {
    return skippedFilesRef.current.has(file.uid)
  }

  const hasCheckError = (file: RcFile): boolean => {
    return errorFilesRef.current.has(file.uid)
  }

  const getReplaceId = (file: RcFile | UploadFile): number | undefined => {
    const fileKey = `${file.name}-${file.size}`
    return replaceFilesRef.current.get(fileKey)
  }

  const reset = (): void => {
    replaceFilesRef.current.clear()
    applyToAllRef.current.action = null
    batchCheckPromiseRef.current = null
    skippedFilesRef.current.clear()
    errorFilesRef.current.clear()
  }

  const cleanupProcessedFiles = (files: UploadFile[]): void => {
    files.forEach(file => {
      const fileKey = `${file.name}-${file.size}`
      replaceFilesRef.current.delete(fileKey)
    })
  }

  return {
    resolveConflicts,
    shouldSkipFile,
    hasCheckError,
    getReplaceId,
    reset,
    cleanupProcessedFiles
  }
}
