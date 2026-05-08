/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AssetExportZipAssetApiArg, type AssetExportZipAssetApiResponse, type AssetExportZipFolderApiArg, type AssetExportZipFolderApiResponse, useAssetExportZipAssetMutation, useAssetExportZipFolderMutation } from '../../asset-api-slice-enhanced'
import { ZipDownloadJob } from '@Pimcore/modules/execution-engine/jobs/download/zip-download-job'
import { useTranslation } from 'react-i18next'
import type { TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import type { ItemType } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import React, { useEffect } from 'react'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { type Element } from '@Pimcore/modules/element/element-helper'
import { useTreePermission } from '@Pimcore/components/element-tree/provider/tree-permission-provider/use-tree-permission'
import { TreePermission } from '@Pimcore/modules/perspectives/enums/tree-permission'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { ContextMenuActionName } from '@Pimcore/modules/element/actions'
import { isUndefined } from 'lodash'
import { type ApiErrorData } from '@Pimcore/modules/app/error-handler/types'
import { useExecutionEngine } from '@Pimcore/modules/execution-engine/hooks/use-execution-engine'

export interface ICreateZipDownloadProps {
  requestData: unknown
}

export interface ICreateZipFolderDownloadProps extends ICreateZipDownloadProps {
  requestData: AssetExportZipFolderApiArg
}

export interface ICreateZipFolderAssetListProps extends ICreateZipDownloadProps {
  requestData: AssetExportZipAssetApiArg
}

export type CreateFolderZipDownload = (props: ICreateZipFolderDownloadProps) => void
export type CreateAssetListZipDownload = (props: ICreateZipFolderAssetListProps) => void

export interface UseZipDownloadHookProps {
  type: 'folder' | 'asset-list'
}

export interface UseZipDownloadHookReturn {
  createZipDownload: CreateFolderZipDownload | CreateAssetListZipDownload
  createZipDownloadContextMenuItem: (node: Element, onFinish?: () => void) => ItemType
  createZipDownloadTreeContextMenuItem: (node: TreeNodeProps) => ItemType
}

export const useZipDownload = (props: UseZipDownloadHookProps): UseZipDownloadHookReturn => {
  const [fetchFolder] = useAssetExportZipFolderMutation()
  const [fetchAssets, { isError, error }] = useAssetExportZipAssetMutation()
  const executionEngine = useExecutionEngine()
  const { t } = useTranslation()
  const { isTreeActionAllowed } = useTreePermission()

  useEffect(() => {
    if (isError) {
      trackError(new ApiError(error))
    }
  }, [isError])

  const createZipDownload = ({ requestData }: ICreateZipFolderDownloadProps | ICreateZipFolderAssetListProps): void => {
    const job = new ZipDownloadJob({
      action: async () => {
        let promise: ReturnType<typeof fetchFolder> | ReturnType<typeof fetchAssets>

        if (props.type === 'folder') {
          promise = fetchFolder(requestData as AssetExportZipFolderApiArg)
        } else {
          promise = fetchAssets(requestData as AssetExportZipAssetApiArg)
        }

        const response = (await promise) as any

        if (!isUndefined(response.error)) {
          trackError(new ApiError(response.error as ApiErrorData))
          throw new ApiError(response.error as ApiErrorData)
        }

        const data = response.data as AssetExportZipAssetApiResponse | AssetExportZipFolderApiResponse
        return data.jobRunId
      }
    })
    void executionEngine.runJob(job)
  }

  const createZipDownloadContextMenuItem = (node: Element, onFinish?: () => void): ItemType => {
    return {
      label: t('asset.tree.context-menu.download-as-zip'),
      key: ContextMenuActionName.downloadAsZip,
      icon: <Icon value={ 'download-zip' } />,
      hidden: node.type !== 'folder' || !checkElementPermission(node.permissions, 'view'),
      onClick: () => {
        createZipDownload({
          requestData: { body: { folders: [node.id] } }
        })
      }
    }
  }

  const createZipDownloadTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('asset.tree.context-menu.download-as-zip'),
      key: ContextMenuActionName.downloadAsZip,
      icon: <Icon value={ 'download-zip' } />,
      hidden: !isTreeActionAllowed(TreePermission.DownloadZip) || node.type !== 'folder' || !checkElementPermission(node.permissions, 'view'),
      onClick: () => {
        createZipDownload({
          requestData: { body: { folders: [parseInt(node.id)] } }
        })
      }
    }
  }

  if (props.type === 'folder') {
    return {
      createZipDownload: createZipDownload as CreateFolderZipDownload,
      createZipDownloadTreeContextMenuItem,
      createZipDownloadContextMenuItem
    }
  }

  return {
    createZipDownload: createZipDownload as CreateAssetListZipDownload,
    createZipDownloadTreeContextMenuItem,
    createZipDownloadContextMenuItem
  }
}
