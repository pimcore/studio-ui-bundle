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

import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import type { ItemType } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import { ContextMenuActionName } from '@Pimcore/modules/element/actions'
import { useUploadModalContext } from '@Pimcore/components/upload-modal/provider/upload-modal-provider/use-upload-modal-context'
import { useRefreshTree } from '@Pimcore/modules/element/actions/refresh-tree/use-refresh-tree'
import { TreePermission } from '@Pimcore/modules/perspectives/enums/tree-permission'
import { useTreePermission } from '@Pimcore/modules/element/tree/provider/tree-permission-provider/use-tree-permission'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { defaultTopics, topics } from '@Pimcore/modules/execution-engine/topics'
import { createJob } from '@Pimcore/modules/execution-engine/jobs/zip-upload/factory'
import { isNumber, isUndefined } from 'lodash'
import { JobStatus } from '@Pimcore/modules/execution-engine/jobs/abstact-job'

export interface UseUploadHookReturn {
  upload: (id: string) => void
  zipUpload: (id: string) => void
  uploadContextMenuItem: (node: TreeNodeProps) => ItemType
  zipUploadContextMenuItem: (node: TreeNodeProps) => ItemType
}

export const useUpload = (): UseUploadHookReturn => {
  const { triggerUpload } = useUploadModalContext()
  const { t } = useTranslation()
  const { refreshTree } = useRefreshTree('asset')
  const { isTreeActionAllowed } = useTreePermission()
  const { addJob, updateJob } = useJobs()
  const jobId = useRef<number | undefined>(undefined)

  const upload = (id: string): void => {
    triggerUpload({
      targetFolderId: parseInt(id),
      onSuccess: async (): Promise<void> => {
        refreshTree(parseInt(id))
      }
    })
  }

  const zipUpload = (id: string): void => {
    let resolvePromise: (value: number) => void
    let rejectPromise: (reason?: any) => void

    const jobPromise = new Promise<number>((resolve, reject) => {
      resolvePromise = resolve
      rejectPromise = reject
    })

    triggerUpload({
      action: `/pimcore-studio/api/assets/add-zip/${id}`,
      accept: '.zip, .rar, .7zip',
      name: 'zipFile',
      multiple: false,
      beforeUpload: async () => {
        const job = createJob({
          title: t('jobs.zip-upload-job.title'),
          topics: [topics['zip-upload-finished'], topics['asset-upload-finished'], ...defaultTopics],
          action: async () => await jobPromise,
          parentFolder: id
        })
        jobId.current = job.id
        addJob(job)
      },
      onSuccess: async (response: any): Promise<void> => {
        const jobRunId = response[0].response.jobRunId ?? undefined
        if (!isUndefined(jobId.current)) {
          updateJob(jobId.current, {
            status: JobStatus.RUNNING
          })
        }
        if (!isNumber(jobRunId)) {
          rejectPromise(new Error('Job run ID is undefined'))
        } else {
          resolvePromise(Number(jobRunId))
        }
      }
    })
  }

  const isUploadHidden = (node: TreeNodeProps): boolean => {
    return !checkElementPermission(node.permissions, 'create') || node?.type !== 'folder'
  }

  const uploadContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.context-menu.add-assets.upload-files'),
      key: ContextMenuActionName.upload,
      icon: <Icon value={ 'upload-cloud' } />,
      hidden: isUploadHidden(node) || !isTreeActionAllowed(TreePermission.AddUpload),
      onClick: () => { upload(node.id) }
    }
  }

  const zipUploadContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.context-menu.add-assets.upload-zip'),
      key: ContextMenuActionName.uploadZip,
      icon: <Icon value={ 'upload-zip' } />,
      hidden: isUploadHidden(node) || !isTreeActionAllowed(TreePermission.AddUploadZip),
      onClick: () => { zipUpload(node.id) }
    }
  }

  return {
    upload,
    zipUpload,
    uploadContextMenuItem,
    zipUploadContextMenuItem
  }
}
