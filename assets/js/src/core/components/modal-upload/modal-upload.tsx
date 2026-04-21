/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { Upload as AntUpload, type UploadProps as AntUploadProps } from 'antd'
import { api as assetApi, type Asset } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import type { RcFile, UploadFile } from 'antd/es/upload/interface'
import { useAppDispatch } from '@sdk/app'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { isString, isNil } from 'lodash'
import { type UploadChangeParam } from 'antd/lib/upload'
import { type UploadRef } from 'antd/es/upload/Upload'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { useTranslation } from 'react-i18next'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { useUploadModalContext } from './provider/upload-modal-provider/use-upload-modal-context'
import { useTargetFolderId } from '@Pimcore/components/hooks/use-target-folder-id'
import { useUploadConflictHandler } from './hooks/use-upload-conflict-handler'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { type ApiErrorData } from '@sdk/modules/app'

export interface ModalUploadPropsBase {
  accept?: AntUploadProps['accept']
  multiple?: AntUploadProps['multiple']
  name?: AntUploadProps['name']
  beforeUpload?: AntUploadProps['beforeUpload']
  onChange?: <T = any>(info: UploadChangeParam<UploadFile<T>>) => void
  targetFolderPath?: string
  targetFolderId?: number
  maxItems?: number
  children?: React.ReactNode
  uploadRef?: React.Ref<UploadRef>
  uploadComponent?: React.ComponentType<AntUploadProps>
  uploadComponentClassName?: string
  openFileDialogOnClick?: AntUploadProps['openFileDialogOnClick']
  /** Override Ant Design's default XHR transport. When provided, the `action` prop is ignored. */
  customRequest?: AntUploadProps['customRequest']
  /**
   * When provided, overrides `targetFolderId` on a per-file basis for the
   * upload `action` URL. Useful for folder drag-and-drop uploads where each
   * file should be uploaded into a different subfolder.
   * The callback receives the file and returns the folder ID to upload into,
   * or undefined to fall back to `targetFolderId`.
   */
  getTargetFolderIdForFile?: (file: RcFile) => number | undefined
  /**
   * When provided, supplements the built-in conflict handler's `getReplaceId`
   * with an external lookup. Useful when conflict resolution was handled
   * outside of `beforeUpload` (e.g. during folder drag-and-drop tree traversal)
   * and the replace-ID map is owned by the caller.
   * Returns the asset ID to replace, or undefined if no replacement applies.
   */
  getExternalReplaceId?: (file: RcFile) => number | undefined
  /**
   * When true, skips the duplicate-file conflict check in `beforeUpload`.
   * Use this when conflict resolution has already been handled externally
   * (e.g. during folder drag-and-drop tree traversal).
   *
   * Can also be a React ref so that the value is read at `beforeUpload` call
   * time rather than at render time.
   */
  skipConflictCheck?: boolean | React.RefObject<boolean>
}

interface ModalUploadPropsWithAction extends ModalUploadPropsBase {
  action: string
  onSuccess?: (result: any) => Promise<void>
}

interface ModalUploadPropsWithoutAssetCheck extends ModalUploadPropsBase {
  action?: undefined
  skipAssetFetch: true
  onSuccess?: (result: any) => Promise<void>
}

interface ModalUploadPropsWithAssetCheck extends ModalUploadPropsBase {
  action?: undefined
  skipAssetFetch?: undefined
  onSuccess?: (assets: Asset[]) => Promise<void>
}

export type ModalUploadProps = ModalUploadPropsWithAction | ModalUploadPropsWithoutAssetCheck | ModalUploadPropsWithAssetCheck

export const ModalUpload = (props: ModalUploadProps): React.JSX.Element => {
  const { setIsModalOpen, setShowProcessing, setShowUploadError, setFileList, fileList } = useUploadModalContext()
  const dispatch = useAppDispatch()
  const settings = useSettings()
  const { t } = useTranslation()
  const { success } = useMessage()

  const { targetFolderId: resolvedTargetFolderId } = useTargetFolderId({
    targetFolderId: props.targetFolderId,
    targetFolderPath: props.targetFolderPath
  })
  const targetFolderId = resolvedTargetFolderId ?? 1

  const {
    resolveConflicts,
    shouldSkipFile,
    hasCheckError,
    getReplaceId,
    reset,
    cleanupProcessedFiles,
    getCheckError
  } = useUploadConflictHandler({ targetFolderId })

  const uploadProps: AntUploadProps = {
    ...(!isNil(props.customRequest)
      ? { customRequest: props.customRequest }
      : {
          action: (file): string => {
            if (isString(props.action)) {
              return props.action
            }

            // External replace ID (e.g. from folder-drop conflict resolution) takes
            // priority, then fall back to the built-in conflict handler's result.
            const replaceId = props.getExternalReplaceId?.(file) ?? getReplaceId(file)

            if (!isNil(replaceId)) {
              return `${getPrefix()}/assets/${replaceId}/replace`
            }

            const perFileFolderId = props.getTargetFolderIdForFile?.(file)
            const effectiveFolderId = perFileFolderId ?? targetFolderId

            return `${getPrefix()}/assets/add/${effectiveFolderId}`
          }
        }),
    name: props.name ?? 'file',
    multiple: props.multiple ?? true,
    accept: props.accept,
    showUploadList: false,
    maxCount: props.maxItems,
    openFileDialogOnClick: props.openFileDialogOnClick,
    fileList,
    beforeUpload: async (file: RcFile, fileList) => {
      const isFileSizeValid = file.size < (settings.upload_max_filesize ?? 1024 * 1024 * 10)
      if (!isFileSizeValid) {
        const uploadFile = file as RcFile & UploadFile
        uploadFile.status = 'error'
        uploadFile.error = { status: 413 }
        return false
      }

      await props.beforeUpload?.(file, fileList)

      const shouldSkipCheck = typeof props.skipConflictCheck === 'object' && !isNil(props.skipConflictCheck)
        ? props.skipConflictCheck.current === true
        : props.skipConflictCheck === true

      if (shouldSkipCheck) {
        return true
      }

      if (file.uid === fileList[0].uid) {
        reset()
      }

      await resolveConflicts(fileList)

      if (hasCheckError(file)) {
        return false
      }

      if (shouldSkipFile(file)) {
        return AntUpload.LIST_IGNORE
      }

      return true
    },
    onChange: async (info) => {
      const formatErrorMessage = (errorData: unknown): string => {
        const apiError = new ApiError({ data: errorData } as unknown as ApiErrorData)
        const content = apiError.getContent()

        if (isNil(content)) {
          return t('error.error_something_generic_went_wrong')
        }

        if (isString(content)) {
          return content
        }

        return t(`error.${content.errorKey}`)
      }

      const updatedFileList = info.fileList.map(file => {
        if (hasCheckError(file as RcFile)) {
          const checkError = getCheckError(file as RcFile)
          const errorFile: UploadFile = {
            ...file,
            status: 'error' as const,
            response: formatErrorMessage(checkError),
            error: checkError
          }
          return errorFile
        }

        if (file.status === 'error') {
          const responseData = file.response ?? file.error

          if (!isNil(responseData) && typeof responseData === 'object') {
            const errorFile: UploadFile = {
              ...file,
              status: 'error' as const,
              response: formatErrorMessage(responseData),
              error: responseData
            }
            return errorFile
          }
        }

        return file
      })

      setFileList(updatedFileList)
      setIsModalOpen(true)
      props.onChange?.({ ...info, fileList: updatedFileList })
      const allFilesDone = updatedFileList.every(file => file.status === 'done')
      const uploadFinished = updatedFileList.every(file => file.status === 'done' || file.status === 'error')
      const uploadDone = updatedFileList.every(file => file.status === 'done' || file.status === 'error' || file.percent === 100)

      if (uploadDone) {
        setShowProcessing(true)
      }
      if (uploadFinished) {
        const doneFiles = updatedFileList.filter(file => file.status === 'done')

        // Resolve IDs before cleanup to handle replaced assets correctly
        const assetIds = doneFiles.map(file => {
          const replaceId = getReplaceId(file)
          return replaceId ?? (file.response?.id as number)
        })

        cleanupProcessedFiles(doneFiles)

        if (props.action === undefined && !('skipAssetFetch' in props && props.skipAssetFetch === true)) {
          const assetFetchPromises = assetIds
            .map(async id => {
              if (isNil(id)) return undefined
              return await dispatch(assetApi.endpoints.assetGetById.initiate({ id }))
                .then(({ data }) => data as Asset | undefined)
            })
          const assets = (await Promise.all(assetFetchPromises)).filter(asset => asset !== undefined)
          if (assets.length > 0) {
            await props.onSuccess?.(assets)
          }
        } else if (doneFiles.length > 0) {
          await props.onSuccess?.(updatedFileList)
        }

        setShowProcessing(false)
        if (allFilesDone) {
          void success(t('asset.upload.files.successfully-uploaded'))
          closeModal()
        } else {
          const errorFile = updatedFileList.find(file => file.status === 'error')
          if (props.maxItems === 1 && !isNil(errorFile)) {
            trackError(new ApiError({ data: errorFile.error ?? errorFile.response }))
            closeModal()
          } else {
            setShowUploadError(true)
          }
        }
      }
    }
  }

  const closeModal = (): void => {
    setIsModalOpen(false)
    setFileList([])
    setShowUploadError(false)
    setShowProcessing(false)
    reset()
  }

  const UploadComponent = props.uploadComponent ?? AntUpload

  return (
    <UploadComponent
      { ...uploadProps }
      className={ props.uploadComponentClassName }
      ref={ props.uploadRef }
    >
      {props.children}
    </UploadComponent>
  )
}
