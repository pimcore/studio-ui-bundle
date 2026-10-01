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
import defaultRequest from 'rc-upload/es/request'
import { api as assetApi, type Asset } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import type { RcFile, UploadFile } from 'antd/es/upload/interface'
import { useAppDispatch } from '@sdk/app'
import { isNil } from 'lodash'
import { type UploadChangeParam } from 'antd/lib/upload'
import { type UploadRef } from 'antd/es/upload/Upload'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { useTranslation } from 'react-i18next'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { useUploadModalContext } from './provider/upload-modal-provider/use-upload-modal-context'
import { useTargetFolderId } from '@Pimcore/components/hooks/use-target-folder-id'
import { useUploadConflictHandler } from './hooks/use-upload-conflict-handler'
import { resolveUploadAction } from './utils/resolve-upload-action'
import { type UploadRequest } from './utils/create-upload-queue'
import { uploadQueue } from './utils/upload-queue'
import { mapUploadFileErrors } from './utils/map-upload-file-errors'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'

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
  /**
   * Override Ant Design's default XHR transport. When provided, the `action` prop
   * is ignored.
   *
   * The transport is wrapped by the tab-wide upload queue rather than replacing it,
   * so it may be called later than the file was accepted, and it must report every
   * file through `onSuccess` or `onError` — one that reports neither holds its slot
   * for the life of the tab.
   */
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
  /** Set `current` to `false` inside `onSuccess` to suppress the upload success toast. */
  showSuccessMessage?: React.MutableRefObject<boolean>
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
  const { setIsModalOpen, setShowProcessing, setShowUploadError, setFileList, setCheckProgress, cancelCheckRef, fileList } = useUploadModalContext()
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
    cancelCheck,
    shouldSkipFile,
    hasCheckError,
    getReplaceId,
    reset,
    cleanupProcessedFiles,
    getCheckError
  } = useUploadConflictHandler({ targetFolderId })

  const uploadProps: AntUploadProps = {
    // Queued rather than sent straight away. The transport is read on every call
    // instead of captured, because the global provider mounts this long before a
    // caller supplies `customRequest` through `triggerUpload`.
    customRequest: (options) => uploadQueue.enqueue(
      options,
      (props.customRequest as UploadRequest | undefined) ?? defaultRequest
    ),
    ...(isNil(props.customRequest)
      ? {
          action: (file): string => resolveUploadAction(file, {
            action: props.action,
            targetFolderId,
            getExternalReplaceId: props.getExternalReplaceId,
            getReplaceId,
            getTargetFolderIdForFile: props.getTargetFolderIdForFile
          })
        }
      : {}),
    name: props.name ?? 'file',
    multiple: props.multiple ?? true,
    accept: props.accept,
    showUploadList: false,
    maxCount: props.maxItems,
    openFileDialogOnClick: props.openFileDialogOnClick,
    fileList,
    beforeUpload: async (file: RcFile, fileList) => {
      const isBatchStart = file.uid === fileList[0].uid

      const shouldSkipCheck = typeof props.skipConflictCheck === 'object' && !isNil(props.skipConflictCheck)
        ? props.skipConflictCheck.current === true
        : props.skipConflictCheck === true

      // Ant fires `onChange` only once the first POST starts, so the modal is
      // opened here to cover the check. Callers that skip it have nothing to show
      // yet and keep waiting for `onChange`.
      if (isBatchStart && !shouldSkipCheck) {
        reset()
        cancelCheckRef.current = cancelCheck
        setIsModalOpen(true)
        setCheckProgress({ done: 0, total: fileList.length })
      }

      const isFileSizeValid = file.size < (settings.upload_max_filesize ?? 1024 * 1024 * 10)
      if (!isFileSizeValid) {
        const uploadFile = file as RcFile & UploadFile
        uploadFile.status = 'error'
        uploadFile.error = { status: 413 }
        return false
      }

      await props.beforeUpload?.(file, fileList)

      if (shouldSkipCheck) {
        return true
      }

      const wasCancelled = await resolveConflicts(fileList, (done, total) => { setCheckProgress({ done, total }) })

      // Cancelled — the provider already closed the modal, LIST_IGNORE stops the upload.
      if (wasCancelled) {
        return AntUpload.LIST_IGNORE
      }

      // Ant's `onBatchStart` returns early when every file is `LIST_IGNORE`, so no
      // `onChange` follows to take the modal down. Close it here instead of leaving
      // it stuck on the checking state.
      if (isBatchStart && fileList.every(listedFile => shouldSkipFile(listedFile))) {
        setCheckProgress(null)
        setIsModalOpen(false)
      }

      if (hasCheckError(file)) {
        return false
      }

      if (shouldSkipFile(file)) {
        return AntUpload.LIST_IGNORE
      }

      return true
    },
    onChange: async (info) => {
      setCheckProgress(null)

      const updatedFileList = mapUploadFileErrors(info.fileList, { t, hasCheckError, getCheckError })

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
          if (props.showSuccessMessage?.current !== false) {
            void success(t('asset.upload.files.successfully-uploaded'))
          }
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
    setCheckProgress(null)
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
