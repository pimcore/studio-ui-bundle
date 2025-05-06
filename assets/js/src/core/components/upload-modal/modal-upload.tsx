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

import React, { useState, useEffect } from 'react'
import { Upload as AntUpload, type UploadProps as AntUploadProps } from 'antd'
import { api as assetApi, type Asset } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { UploadModal } from '@Pimcore/components/upload-modal/components/upload-modal/upload-modal'
import type { RcFile, UploadFile } from 'antd/es/upload/interface'
import { useAppDispatch } from '@Pimcore/app/store'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { api as elementApi } from '@Pimcore/modules/element/element-api-slice.gen'
import { isEmpty, isString, isUndefined } from 'lodash'
import { type UploadChangeParam } from 'antd/lib/upload'

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
  uploadRef?: React.Ref<any> // Pass ref as a prop
}

interface ModalUploadPropsWithAction extends ModalUploadPropsBase {
  action: string
  onSuccess?: (assets: any) => Promise<void>
}

interface ModalUploadPropsWithoutAction extends ModalUploadPropsBase {
  action?: undefined
  onSuccess?: (assets: Asset[]) => Promise<void>
}

export type ModalUploadProps = ModalUploadPropsWithAction | ModalUploadPropsWithoutAction

export const ModalUpload = (props: ModalUploadProps): React.JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showUploadError, setShowUploadError] = useState(false)
  const [showProcessing, setShowProcessing] = useState(false)
  const [targetFolderId, setTargetFolderId] = useState<number | undefined>(props.targetFolderId)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (targetFolderId !== props.targetFolderId) {
      setTargetFolderId(props.targetFolderId)
    }
  }, [props.targetFolderId])

  const uploadProps: AntUploadProps = {
    action: async (): Promise<string> => {
      if (isString(props.action)) {
        return props.action
      }
      const baseUrl = `${getPrefix()}/assets/add/`
      if (isUndefined(targetFolderId)) {
        if (isUndefined(props.targetFolderPath) || isEmpty(props.targetFolderPath) || props.targetFolderPath === '/') {
          setTargetFolderId(1)
          return baseUrl + 1
        }
        const { data } = await dispatch(elementApi.endpoints.elementGetIdByPath.initiate({
          elementType: 'asset',
          elementPath: props.targetFolderPath
        }))
        if (data !== undefined) {
          setTargetFolderId(data.id)
          return baseUrl + data.id
        }
      }
      return baseUrl + targetFolderId
    },
    name: props.name ?? 'file',
    multiple: props.multiple ?? true,
    accept: props.accept,
    showUploadList: false,
    maxCount: props.maxItems,
    fileList,
    beforeUpload: (file: RcFile & UploadFile, fileList) => {
      const isFileSizeValid = file.size / 1024 / 1024 < 500
      if (!isFileSizeValid) {
        file.status = 'error'
        file.error = { status: 413 }
        return false
      }
      void props.beforeUpload?.(file, fileList)
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
        if (props.action === undefined) {
          const assets: Asset[] = []
          for (const file of info.fileList) {
            if (file.status === 'done') {
              const { data } = await dispatch(assetApi.endpoints.assetGetById.initiate({ id: file.response.id as number }))
              if (data !== undefined) {
                assets.push(data as Asset)
              }
            }
          }
          if (assets.length > 0) {
            await props.onSuccess?.(assets)
          }
        } else {
          await props.onSuccess?.(info.fileList)
        }

        setShowProcessing(false)
        if (allFilesDone) {
          setFileList([])
          setIsModalOpen(false)
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

  return (
    <>
      <UploadModal
        closeModal={ closeModal }
        fileList={ fileList }
        open={ isModalOpen }
        showProcessing={ showProcessing }
        showUploadError={ showUploadError }
      />
      <AntUpload
        { ...uploadProps }
        ref={ props.uploadRef }
      >
        {props.children}
      </AntUpload>
    </>
  )
}
