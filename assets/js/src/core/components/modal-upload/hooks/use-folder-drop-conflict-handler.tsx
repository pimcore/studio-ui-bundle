/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useRef } from 'react'
import { isNil } from 'lodash'
import { buildFileKey } from '@Pimcore/modules/asset/tree/dnd-upload/dnd-upload-folder-drop'
import { UploadConflictAction } from './use-upload-conflict-handler'
import { useUploadConflictModal } from './use-upload-conflict-modal'

export interface FolderDropConflictMaps {
  replaceIdByKey: Map<string, number>
  skipKeys: Set<string>
}

interface UseFolderDropConflictHandlerResult {
  checkFile: (file: File, parentFolderId: number) => Promise<void>
  maps: FolderDropConflictMaps
  resetMaps: () => void
}

export const useFolderDropConflictHandler = (): UseFolderDropConflictHandlerResult => {
  const { checkFileExists, askUserOverwrite, resetApplyToAll } = useUploadConflictModal()

  const replaceIdByKey = useRef<Map<string, number>>(new Map())
  const skipKeys = useRef<Set<string>>(new Set())

  const maps: FolderDropConflictMaps = {
    replaceIdByKey: replaceIdByKey.current,
    skipKeys: skipKeys.current
  }

  const resetMaps = (): void => {
    replaceIdByKey.current.clear()
    skipKeys.current.clear()
    resetApplyToAll()
  }

  const checkFile = async (file: File, parentFolderId: number): Promise<void> => {
    const { exists, id } = await checkFileExists(file.name, parentFolderId)

    if (!exists || isNil(id)) {
      return
    }

    const action = await askUserOverwrite(file.name)
    const key = buildFileKey(file)

    if (action === UploadConflictAction.SKIP) {
      skipKeys.current.add(key)
    } else if (action === UploadConflictAction.OVERWRITE) {
      replaceIdByKey.current.set(key, id)
    }
    // KEEP: upload normally, creates a copy
  }

  return { checkFile, maps, resetMaps }
}
