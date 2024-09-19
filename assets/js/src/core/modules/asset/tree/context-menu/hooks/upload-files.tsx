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

import type React from 'react'
import { api as assetApi } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { useAppDispatch } from '@Pimcore/app/store'
import { type UploadFile } from 'antd/es/upload/interface'

interface useFileUploaderReturn {
  uploadFile: (props: UploadFileProps) => Promise<void>
  uploadFiles: (props: UploadFilesProps) => Promise<void>
  uploadArchive: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>
}

interface UploadFileProps {
  file: UploadFile
  onError: (file: UploadFile) => void
  onSuccess: (file: UploadFile) => void
}

interface UploadFilesProps extends Omit<UploadFileProps, 'file'> {
  files: UploadFile[]
}

export const useFileUploader = ({ parentId }: { parentId?: string }): useFileUploaderReturn => {
  const dispatch = useAppDispatch()
  const assetUpload = assetApi.endpoints.assetAdd
  const archiveUpload = assetApi.endpoints.assetUploadZip

  const uploadFile = async ({ file, onSuccess, onError }: UploadFileProps): Promise<void> => {
    try {
      const formData = new FormData()
      // @ts-expect-error fuck shitty linter
      formData.append('file', file)

      if (formData.has('file')) {
        // @ts-expect-error - marvin will know why
        await dispatch(assetUpload.initiate({ body: formData, parentId })).unwrap()

        onSuccess(file)
      }
    } catch (error) {
      console.error(error)
      onError(file)
    }
  }

  const uploadFiles = async ({ files, onSuccess, onError }: UploadFilesProps): Promise<void> => {
    if (files.length > 0 && parentId !== undefined) {
      for (let i = 0; i < files.length; i++) {
        await uploadFile({
          file: files[i],
          onError,
          onSuccess
        })
      }
    }
  }

  const uploadArchive = async (event): Promise<void> => {
    const files = event.target.files as File[]

    if (files.length > 0 && parentId !== undefined) {
      for (let i = 0; i < files.length; i++) {
        try {
          const formData = new FormData()
          const archive = files[i]
          formData.append('zipFile', archive)

          if (formData.has('zipFile')) {
            // @ts-expect-error - marvin will know why
            await dispatch(archiveUpload.initiate({ body: formData, parentId })).unwrap()
          }

          console.log('Archive uploaded successfully')
        } catch (error) {
          console.error(error)
        }
      }
    }
  }

  return {
    uploadFile,
    uploadFiles,
    uploadArchive
  }
}
