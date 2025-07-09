/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext, useEffect, useState } from 'react'
import { DocumentContext } from '../document-provider'
import { DocumentSaveTaskManager, SaveTaskType } from '../services'

export interface UseDocumentSaveTaskReturn {
  runningTask?: SaveTaskType
  isAutoSaveLoading: boolean
  isLoading: boolean
}

/**
 * Hook to get the current save task state for a document
 */
export const useDocumentSaveTask = (): UseDocumentSaveTaskReturn => {
  const { id } = useContext(DocumentContext)
  const [runningTask, setRunningTask] = useState<SaveTaskType | undefined>()

  useEffect(() => {
    const taskManager = DocumentSaveTaskManager.getInstance(id)

    // Subscribe to running task changes
    const unsubscribe = taskManager.onRunningTaskChange(setRunningTask)

    // Initialize current state
    setRunningTask(taskManager.getRunningTask())

    return () => {
      unsubscribe()
    }
  }, [id])

  return {
    runningTask,
    isAutoSaveLoading: runningTask === SaveTaskType.AutoSave,
    isLoading: runningTask !== undefined && runningTask !== SaveTaskType.AutoSave
  }
}
