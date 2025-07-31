/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState, useEffect } from 'react'
import { Upload as AntUpload, type UploadProps as AntUploadProps } from 'antd'
import { api as assetApi, type Asset } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import type { RcFile, UploadFile } from 'antd/es/upload/interface'
import { useAppDispatch } from '@sdk/app'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { isString } from 'lodash'
import { type UploadChangeParam } from 'antd/lib/upload'
import { type UploadRef } from 'antd/es/upload/Upload'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { useUploadModalContext } from './provider/upload-modal-provider/use-upload-modal-context'
import { useTargetFolderId } from '@Pimcore/components/hooks/use-target-folder-id'

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

  // Use shared hook to resolve targetFolderId
  const { targetFolderId } = useTargetFolderId({
    targetFolderId: props.targetFolderId,
    targetFolderPath: props.targetFolderPath
  })

  const uploadProps: AntUploadProps = {
    action: (): string => {
      if (isString(props.action)) {
        return props.action
      }
      const baseUrl = `${getPrefix()}/assets/add/`
      return baseUrl + (targetFolderId ?? 1)
    },
    name: props.name ?? 'file',
    multiple: props.multiple ?? true,
    accept: props.accept,
    showUploadList: false,
    maxCount: props.maxItems,
    openFileDialogOnClick: props.openFileDialogOnClick,
    fileList,
    beforeUpload: async (file: RcFile & UploadFile, fileList) => {
      const isFileSizeValid = file.size < (settings.upload_max_filesize ?? 1024 * 1024 * 10)
      if (!isFileSizeValid) {
        file.status = 'error'
        file.error = { status: 413 }
        return false
      }
      await props.beforeUpload?.(file, fileList)
    },
    onChange: async (info) => {
      setFileList(info.fileList)
      setIsModalOpen(true)
      props.onChange?.(info)
      const allFilesDone = info.fileList.every(file => file.status === 'done')
      const uploadFinished = info.fileList.every(file => file.status === 'done' || file.status === 'error')
      const uploadDone = info.fileList.every(file => file.status === 'done' || file.status === 'error' || file.percent === 100)

      if (uploadDone) {
        setShowProcessing(true)
      }
      if (uploadFinished) {
        const doneFiles = info.fileList.filter(file => file.status === 'done')
        if (props.action === undefined && props.skipAssetFetch !== true) {
          const assetFetchPromises = doneFiles
            .map(async file =>
              await dispatch(assetApi.endpoints.assetGetById.initiate({ id: file.response.id as number }))
                .then(({ data }) => data as Asset | undefined)
            )
          const assets = (await Promise.all(assetFetchPromises)).filter(asset => asset !== undefined)
          if (assets.length > 0) {
            await props.onSuccess?.(assets)
          }
        } else if (doneFiles.length > 0) {
          await props.onSuccess?.(info.fileList)
        }

        setShowProcessing(false)
        if (allFilesDone) {
          closeModal()
        } else {
          setShowUploadError(true)
        }
      }
    }
  }

  const closeModal = (): void => {
    setIsModalOpen(false)
    setFileList([])
    setShowUploadError(false)
    setShowProcessing(false)
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
