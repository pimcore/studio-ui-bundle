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

import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { type AssetExportZipAssetApiArg, type AssetExportZipAssetApiResponse, type AssetExportZipFolderApiArg, type AssetExportZipFolderApiResponse, useAssetExportZipAssetMutation, useAssetExportZipFolderMutation } from '../../asset-api-slice-enhanced'
import { createJob } from '@Pimcore/modules/execution-engine/jobs/download/factory'
import { useTranslation } from 'react-i18next'
import { defaultTopics, topics } from '@Pimcore/modules/execution-engine/topics'

export interface createZipDownloadProps {
  jobTitle: string
  requestData: unknown
}

export interface createZipFolderDownloadProps extends createZipDownloadProps {
  requestData: AssetExportZipFolderApiArg
}

export interface createZipFolderAssetListProps extends createZipDownloadProps {
  requestData: AssetExportZipAssetApiArg
}

export type createFolderZipDownload = (props: createZipFolderDownloadProps) => void
export type createAssetListZipDownload = (props: createZipFolderAssetListProps) => void

export interface UseZipDownloadHookProps {
  type: 'folder' | 'asset-list'
}

export interface UseZipDownloadHookReturn {
  createZipDownload: createFolderZipDownload | createAssetListZipDownload
}

export const useZipDownload = (props: UseZipDownloadHookProps): UseZipDownloadHookReturn => {
  const [fetchFolder] = useAssetExportZipFolderMutation()
  const [fetchAssets] = useAssetExportZipAssetMutation()
  const { addJob } = useJobs()
  const { t } = useTranslation()

  const createZipDownload = ({ jobTitle, requestData }: createZipFolderDownloadProps | createZipFolderAssetListProps): void => {
    addJob(createJob({
      // @todo add api domain
      title: t('jobs.zip-job.title', { title: jobTitle }),
      topics: [topics['zip-download-ready'], ...defaultTopics],
      downloadUrl: '/pimcore-studio/api/assets/download/zip/{jobRunId}',
      action: async () => {
        let promise: ReturnType<typeof fetchFolder> | ReturnType<typeof fetchAssets>

        if (props.type === 'folder') {
          promise = fetchFolder(requestData as AssetExportZipFolderApiArg)
        } else {
          promise = fetchAssets(requestData as AssetExportZipAssetApiArg)
        }

        promise.catch(() => {
          console.error('Failed to create zip')
        })

        const response = (await promise) as any
        const data = response.data as AssetExportZipAssetApiResponse | AssetExportZipFolderApiResponse
        return data.jobRunId
      }
    }))
  }

  if (props.type === 'folder') {
    return {
      createZipDownload: createZipDownload as createFolderZipDownload
    }
  }

  return {
    createZipDownload: createZipDownload as createAssetListZipDownload
  }
}
