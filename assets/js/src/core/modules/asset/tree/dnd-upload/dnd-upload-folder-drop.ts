/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { RefObject } from 'react'
import type { UploadRef } from 'antd/es/upload/Upload'
import { isNil } from 'lodash'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { collectDroppedTree, resolveFolderIdByRelativePath } from './dnd-upload-folder-utils'
import type { FolderDropConflictMaps } from '@Pimcore/components/modal-upload/hooks/use-folder-drop-conflict-handler'

const fileRelativePathMap = new WeakMap<File, string>()

/** Minimal shape of rc-upload's private AjaxUploader. */
interface RcAjaxUploader {
  uploadFiles: (files: File[]) => void
}

/** Typed wrapper to access rc-upload's private `uploader` field. */
interface RcUploadWithUploader {
  uploader: RcAjaxUploader | null
}

interface ProcessDirectoryDropParams {
  dataTransfer: DataTransfer
  rootFolderId: number
  rootPath: string
  folderIdByKey: Map<string, number>
  conflictMaps: FolderDropConflictMaps
  checkFile: (file: File, parentFolderId: number) => Promise<void>
}

export function buildFileKey (file: File): string {
  const relativePath = fileRelativePathMap.get(file) ?? ''
  return `${relativePath}/${file.name}-${file.size}`
}

export async function processDirectoryDrop ({
  dataTransfer,
  rootFolderId,
  rootPath,
  folderIdByKey,
  conflictMaps,
  checkFile
}: ProcessDirectoryDropParams): Promise<File[]> {
  if (rootPath === '') {
    throw new Error(`Missing nodePath for folder ${rootFolderId}`)
  }

  const droppedFiles = await collectDroppedTree(dataTransfer)
  if (droppedFiles.length === 0) {
    return []
  }

  const folderPathToId = new Map<string, number>()

  folderIdByKey.clear()
  for (const { file, parentRelativeFolderPath } of droppedFiles) {
    fileRelativePathMap.set(file, parentRelativeFolderPath)

    const parentFolderId = await resolveFolderIdByRelativePath(
      rootFolderId,
      rootPath,
      parentRelativeFolderPath,
      folderPathToId
    )

    folderIdByKey.set(buildFileKey(file), parentFolderId)
  }

  // Check each file against its actual parent folder, not the root drop target.
  for (const { file } of droppedFiles) {
    const key = buildFileKey(file)
    const parentFolderId = folderIdByKey.get(key)!
    await checkFile(file, parentFolderId)
  }

  return droppedFiles
    .map(({ file }) => file)
    .filter(file => !conflictMaps.skipKeys.has(buildFileKey(file)))
}

const getRcUploader = (uploadRef: RefObject<UploadRef | null>): RcAjaxUploader | null | undefined =>
  (uploadRef.current?.upload as unknown as RcUploadWithUploader | null | undefined)?.uploader

export async function triggerUploaderFiles (
  uploadRef: RefObject<UploadRef | null>,
  files: File[]
): Promise<void> {
  let uploader = getRcUploader(uploadRef)

  for (let attempt = 0; isNil(uploader) && attempt < 10; attempt++) {
    await new Promise<void>(resolve => { setTimeout(resolve, 100) })
    uploader = getRcUploader(uploadRef)
  }

  if (isNil(uploader)) {
    trackError(new GeneralError('Folder upload: upload component not ready after drop'))
    return
  }

  uploader.uploadFiles(files)
}
