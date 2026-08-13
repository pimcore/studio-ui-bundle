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
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { Box, Flex } from '@sdk/components'
import { Icon } from '@Pimcore/components/icon/icon'
import { UploadConflictAction } from './use-upload-conflict-handler'

export interface UploadConflictCheckResult {
  exists: boolean
  id?: number
  error?: unknown
}

export interface UploadConflictModalResult {
  checkFileExists: (fileName: string, folderId: number) => Promise<UploadConflictCheckResult>
  checkFilesExist: (fileNames: string[], folderId: number) => Promise<UploadConflictCheckResult[]>
  askUserOverwrite: (fileName: string) => Promise<UploadConflictAction>
  resetApplyToAll: () => void
}

export const useUploadConflictModal = (): UploadConflictModalResult => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { modal } = App.useApp()

  const applyToAllRef = useRef<{ action: UploadConflictAction | null }>({ action: null })

  /**
   * Resolves one batch of file names against a single target folder. The result
   * order mirrors `fileNames`, so callers can map results back positionally.
   * A failed batch reports the error for every file it contained.
   */
  const checkFilesExist = async (
    fileNames: string[],
    folderId: number
  ): Promise<UploadConflictCheckResult[]> => {
    const { data, error } = await dispatch(
      assetApi.endpoints.assetUploadBatchInfo.initiate(
        { parentId: folderId, body: { fileNames } },
        { forceRefetch: true, subscribe: false }
      )
    )

    if (!isNil(error)) {
      return fileNames.map(() => ({ exists: false, error }))
    }

    // A differently sized batch cannot be matched to these files at all.
    if (data?.items?.length !== fileNames.length) {
      return fileNames.map(() => ({ exists: false, error: { errorKey: 'error_validation_failed' } }))
    }

    return data.items.map((item) => {
      // The name is taken by an asset the user may not see, so it can neither be
      // overwritten nor uploaded over — surface it as that file's own error.
      if (item.accessDenied) {
        return {
          exists: false,
          error: { errorKey: 'error_permission_denied' }
        }
      }

      if (item.exists && !isNil(item.assetId)) {
        return { exists: true, id: item.assetId }
      }

      return { exists: false }
    })
  }

  const checkFileExists = async (
    fileName: string,
    folderId: number
  ): Promise<UploadConflictCheckResult> => {
    const { data: uploadInfo, error } = await dispatch(
      assetApi.endpoints.assetUploadInfo.initiate(
        { parentId: folderId, fileName },
        { forceRefetch: true, subscribe: false }
      )
    )

    if (!isNil(error)) {
      return { exists: false, error }
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
        icon: (
          <Icon
            options={ { width: 24, height: 24 } }
            value="warning-circle"
          />
        ),
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
          <Flex justify="flex-end">
            <Button onClick={ () => { handleAction(UploadConflictAction.SKIP) } }>
              {t('asset.upload.skip')}
            </Button>
            <Button onClick={ () => { handleAction(UploadConflictAction.KEEP) } }>
              {t('asset.upload.keep-both')}
            </Button>
            <Button onClick={ () => { handleAction(UploadConflictAction.OVERWRITE) } }>
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

  const resetApplyToAll = (): void => {
    applyToAllRef.current.action = null
  }

  return { checkFileExists, checkFilesExist, askUserOverwrite, resetApplyToAll }
}
