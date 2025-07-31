/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState, useCallback } from 'react'
import { Upload, Progress, message } from 'antd'
import { type UploadProps, type RcFile } from 'antd/es/upload/interface'
import { useAppDispatch } from '@sdk/app'
import { api as assetApi, type Asset } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { isNil } from 'lodash'
import { useStyles } from './inline-upload.styles'
import { useTargetFolderId } from '@Pimcore/components/hooks/use-target-folder-id'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'

export interface InlineUploadProps {
  accept?: string
  targetFolderPath?: string
  targetFolderId?: number
  onSuccess?: (asset: Asset) => Promise<void>
  onError?: (error: Error) => void
  children: React.ReactNode
  disabled?: boolean
  fullWidth?: boolean
}

export const InlineUpload = (props: InlineUploadProps): React.JSX.Element => {
  const { styles } = useStyles()
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const dispatch = useAppDispatch()
  const settings = useSettings()
  const { t } = useTranslation()

  const { targetFolderId } = useTargetFolderId({
    targetFolderId: props.targetFolderId,
    targetFolderPath: props.targetFolderPath
  })

  const beforeUpload = useCallback((file: RcFile): boolean => {
    if (file.size > (settings.upload_max_filesize ?? 0)) {
      void message.error(t('upload.error.file-too-large'))
      return false
    }

    return true
  }, [settings.upload_max_filesize, t])

  const uploadProps: UploadProps = {
    name: 'file',
    action: `${getPrefix()}/assets/add/${targetFolderId ?? 1}`,
    beforeUpload,
    accept: props.accept,
    multiple: false,
    showUploadList: false,
    disabled: (props.disabled ?? false) || uploading,
    openFileDialogOnClick: false,
    onChange: async (info) => {
      if (info.file.status === 'uploading') {
        setUploading(true)
        setProgress(info.file.percent ?? 0)
      } else if (info.file.status === 'done') {
        setProgress(100)

        try {
          const result = info.file.response
          const { data: asset } = await dispatch(assetApi.endpoints.assetGetById.initiate({ id: result.id }))

          if (!isNil(asset)) {
            await props.onSuccess?.(asset)
          }

          setUploading(false)
          setProgress(0)
        } catch (error) {
          console.error('Failed to fetch uploaded asset:', error)
          setUploading(false)
          setProgress(0)
          props.onError?.(error as Error)
          void message.error(t('upload.error.failed-to-fetch-asset-details'))
        }
      } else if (info.file.status === 'error') {
        setUploading(false)
        setProgress(0)
        void message.error(t('upload.error.upload-failed'))
        props.onError?.(new Error('Upload failed'))
      }
    }
  }

  return (
    <div className={ cn(styles.container, { [styles.containerFullWidth]: props.fullWidth }) }>
      <Upload { ...uploadProps }>
        <div className={ styles.uploadArea }>
          {props.children}
          {uploading && (
            <div className={ styles.progressOverlay }>
              <Progress
                percent={ progress }
                size={ 60 }
                type="circle"
              />
            </div>
          )}
        </div>
      </Upload>
    </div>
  )
}
