/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useMemo, useRef, useState } from 'react'
import { SaveTaskType } from '@Pimcore/modules/data-object/actions/save/use-save'

export interface QueuedDask {
  task: SaveTaskType | undefined
  editableData: Record<string, any>
}

export interface ISaveContext {
  runningTask?: SaveTaskType
  setRunningTask: (loadingTask?: SaveTaskType) => void
  isAutoSaveLoading: boolean
  runningTaskRef: React.MutableRefObject<SaveTaskType | undefined>
  queuedTask?: QueuedDask
  setQueuedTask: (task?: QueuedDask) => void
}

export const SaveContext = createContext<ISaveContext | undefined>(undefined)

export const SaveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [runningTask, setRunningTaskState] = useState<SaveTaskType | undefined>(undefined)
  const runningTaskRef = useRef<SaveTaskType | undefined>(undefined)
  const [queuedTask, setQueuedTaskState] = useState<QueuedDask | undefined>(undefined)
  const queuedTaskRef = useRef<QueuedDask | undefined>(undefined)

  const setRunningTask = (runningTask?: SaveTaskType): void => {
    setRunningTaskState(runningTask)
    runningTaskRef.current = runningTask
  }

  const setQueuedTask = (queuedDask?: QueuedDask): void => {
    setQueuedTaskState(queuedDask)
    queuedTaskRef.current = queuedDask
  }

  const value = useMemo(() => ({
    runningTask,
    setRunningTask,
    isAutoSaveLoading: runningTask === SaveTaskType.AutoSave,
    runningTaskRef,
    queuedTask,
    setQueuedTask
  }), [runningTask, queuedTask])

  return (
    <SaveContext.Provider value={ value }>
      {children}
    </SaveContext.Provider>
  )
}
