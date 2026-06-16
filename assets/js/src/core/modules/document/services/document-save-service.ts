/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { DocumentSaveTaskManager, SaveTaskType } from './document-save-task-manager'
import { awaitEditLockPersistAllowed } from '@Pimcore/modules/element/services/edit-lock-gate'

export interface DocumentSaveService {
  saveDocument: (documentId: number, task?: SaveTaskType) => Promise<void>
}

class DocumentSaveServiceImpl implements DocumentSaveService {
  async saveDocument (documentId: number, task: SaveTaskType = SaveTaskType.AutoSave): Promise<void> {
    // Hold autosaves until the edit-lock check resolves in the user's favour.
    if (task === SaveTaskType.AutoSave && !(await awaitEditLockPersistAllowed('document', documentId))) {
      return
    }

    const taskManager = DocumentSaveTaskManager.getInstance(documentId)
    await taskManager.executeSave(task)
  }
}

export const documentSaveService = new DocumentSaveServiceImpl()

// Re-export types for convenience
export { SaveTaskType, DocumentSaveTaskManager } from './document-save-task-manager'
export type { DocumentSaveData, DocumentSaveResult } from './document-save-task-manager'
