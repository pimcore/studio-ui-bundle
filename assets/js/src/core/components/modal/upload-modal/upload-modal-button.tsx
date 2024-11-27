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

import React, { useState } from 'react'
import { UploadProvider } from '@Pimcore/modules/element/upload/upload-provider'
import { Tooltip, Upload, type UploadProps } from 'antd'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useTranslation } from 'react-i18next'
import { UploadModal } from '@Pimcore/components/modal/upload-modal/components/upload-modal/upload-modal'
import { type UploadFile } from 'antd/es/upload/interface'
import { useAppDispatch } from '@Pimcore/app/store'
import { api as assetApi, type Asset } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { api as elementApi } from '@Pimcore/modules/element/element-api-slice.gen'
import { useAlertModal } from '@Pimcore/components/modal/alert-modal/hooks/use-alert-modal'

export interface UploadModalButtonProps {
  onSuccess: (assets: Asset[]) => Promise<void>
  targetFolderPath?: string
  maxItems?: number
  showMaxItemsError?: boolean
}

export const UploadModalButton = (props: UploadModalButtonProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [isButtonLoading, setIsButtonLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showUploadError, setShowUploadError] = useState(false)
  const [showProcessing, setShowProcessing] = useState(false)
  const [targetFolderId, setTargetFolderId] = useState<number | undefined>(undefined)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const dispatch = useAppDispatch()
  const alertModal = useAlertModal()

  const uploadProps: UploadProps = {
    action: async (): Promise<string> => {
      const baseUrl = `${getPrefix()}/assets/add/`

      if (targetFolderId === undefined) {
        if (props.targetFolderPath === undefined || props.targetFolderPath === '' || props.targetFolderPath === '/') {
          setTargetFolderId(1)
          return baseUrl + 1
        }
        setIsButtonLoading(true)
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
    name: 'file',
    multiple: true,
    showUploadList: false,
    maxCount: props.maxItems,
    fileList,
    onChange: async (info) => {
      setFileList(info.fileList)
      setIsModalOpen(true)
      setIsButtonLoading(false)
      const allFilesDone = info.fileList.every(file => file.status === 'done')
      const uploadFinished = info.fileList.every(file => file.status === 'done' || file.status === 'error')

      if (uploadFinished) {
        setShowProcessing(true)
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
          await props.onSuccess(assets)
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

  if (props.showMaxItemsError === true) {
    return (
      <Tooltip title={ t('upload') }>
        <IconButton
          icon={ { value: 'upload-cloud' } }
          loading={ isButtonLoading }
          onClick={ () => alertModal.warn({
            content: t('items-limit-reached', { maxItems: props.maxItems ?? 0 })
          }) }
          type="default"
        />
      </Tooltip>
    )
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
      <UploadProvider>
        <Upload { ...uploadProps }>
          <Tooltip title={ t('upload') }>
            <IconButton
              icon={ { value: 'upload-cloud' } }
              loading={ isButtonLoading }
              type="default"
            />
          </Tooltip>
        </Upload>
      </UploadProvider>
    </>
  )
}
