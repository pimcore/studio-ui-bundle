/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ModalUploadDragger } from '@Pimcore/components/modal-upload/components/modal-upload-dragger/modal-upload-dragger'
import { useRefreshTree } from '@Pimcore/modules/element/actions/refresh-tree/use-refresh-tree'
import React, { useCallback, useRef, useState } from 'react'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { isNil } from 'lodash'
import type { RcFile } from 'antd/es/upload/interface'
import type { UploadRef } from 'antd/es/upload/Upload'
import { droppedItemsContainDirectory } from './dnd-upload-folder-utils'
import { processDirectoryDrop, buildFileKey, triggerUploaderFiles } from './dnd-upload-folder-drop'
import { useFolderDropConflictHandler } from '@Pimcore/components/modal-upload/hooks/use-folder-drop-conflict-handler'
import { FolderCreationModal } from './folder-creation-modal'

interface DndUploadProps {
  children: React.ReactNode
  nodeId: string
  nodePath: string
}

export const DndUpload = ({ nodeId, nodePath, children }: DndUploadProps): React.JSX.Element => {
  const { refreshTree } = useRefreshTree('asset')
  const targetFolderId = parseInt(nodeId)

  const [isCreatingFolders, setIsCreatingFolders] = useState(false)

  // True during a folder-drop batch — tells ModalUpload to skip its own conflict check.
  const isFolderDropRef = useRef(false)

  const { checkFile, maps: conflictMaps, resetMaps } = useFolderDropConflictHandler()

  // Maps name+size → target subfolder ID; keyed by name+size because rc-upload assigns uid after beforeUpload.
  const folderIdByKey = useRef<Map<string, number>>(new Map())

  const uploadRef = useRef<UploadRef | null>(null)

  const uploadRefCallback = useCallback((node: UploadRef | null): void => {
    uploadRef.current = node
  }, [])

  const getTargetFolderIdForFile = useCallback((file: RcFile): number | undefined => {
    if (!isFolderDropRef.current) return undefined
    return folderIdByKey.current.get(buildFileKey(file))
  }, [])

  const getExternalReplaceId = useCallback((file: RcFile): number | undefined => {
    if (!isFolderDropRef.current) return undefined
    return conflictMaps.replaceIdByKey.get(buildFileKey(file))
  }, [conflictMaps.replaceIdByKey])

  // Intercepts directory drops before Ant's onDrop; plain file drops pass through.
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>): void => {
    if (isNil(e.dataTransfer)) return
    if (!droppedItemsContainDirectory(e.dataTransfer)) return

    e.preventDefault()
    e.stopPropagation()

    const dataTransfer = e.dataTransfer
    const rootPath = nodePath

    void (async () => {
      let files: File[]

      resetMaps()
      isFolderDropRef.current = false
      setIsCreatingFolders(true)

      try {
        files = await processDirectoryDrop({
          dataTransfer,
          rootFolderId: targetFolderId,
          rootPath,
          folderIdByKey: folderIdByKey.current,
          conflictMaps,
          checkFile
        })
      } catch (err) {
        trackError(new GeneralError(`Folder upload (tree traversal): ${err instanceof Error ? err.message : String(err)}`))
        setIsCreatingFolders(false)
        return
      }

      setIsCreatingFolders(false)

      if (files.length === 0) return

      isFolderDropRef.current = true
      await triggerUploaderFiles(uploadRef, files)
    })()
  }, [nodePath, targetFolderId, conflictMaps, checkFile, resetMaps])

  return (
    <>
      <FolderCreationModal open={ isCreatingFolders } />
      <div onDropCapture={ handleDrop }>
        <ModalUploadDragger
          getExternalReplaceId={ getExternalReplaceId }
          getTargetFolderIdForFile={ getTargetFolderIdForFile }
          onSuccess={ async () => {
            isFolderDropRef.current = false
            refreshTree(targetFolderId)
          } }
          skipAssetFetch
          skipConflictCheck={ isFolderDropRef }
          targetFolderId={ targetFolderId }
          uploadRef={ uploadRefCallback }
        >
          {children}
        </ModalUploadDragger>
      </div>
    </>
  )
}
