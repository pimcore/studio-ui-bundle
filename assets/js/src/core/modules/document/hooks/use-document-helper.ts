/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { store } from '@Pimcore/app/store'
import { type EditorContainerProps } from '../editor/editor-container'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { setNodeLoadingInAllTree, setNodePublished } from '@Pimcore/components/element-tree/element-tree-slice'
import { publishDraft, unpublishDraft } from '../document-draft-slice'
import { SaveTaskType } from '../services'
import { useDocumentUpdateByIdMutation } from '../document-api-slice.gen'
import { getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'

interface OpenDocumentWidgetProps {
  config: EditorContainerProps
}

interface UseDocumentReturn {
  openDocument: (props: OpenDocumentWidgetProps) => Promise<void>
  executeDocumentTask: (id: number, task: SaveTaskType, onFinish?: () => void) => Promise<void>
}

export const useDocumentHelper = (): UseDocumentReturn => {
  const dispatch = store.dispatch
  const [update] = useDocumentUpdateByIdMutation()

  async function openDocument (props: OpenDocumentWidgetProps): Promise<void> {
    const { config } = props
    const { element } = getPimcoreStudioApi()
    await element.openDocument(config.id)
  }

  const executeDocumentTask = async (id: number, task: SaveTaskType, onFinish?: () => void): Promise<void> => {
    const updateTask = update({
      id,
      body: {
        data: {
          task
        }
      }
    })

    updateTask.catch((error: Error) => {
      trackError(new ApiError(error))
    })

    try {
      dispatch(setNodeLoadingInAllTree({ nodeId: String(id), elementType: 'data-object', loading: true }))
      const response = (await updateTask)

      if (response.error !== undefined) {
        dispatch(setNodeLoadingInAllTree({ nodeId: String(id), elementType: 'data-object', loading: false }))
        trackError(new ApiError(response.error))
        onFinish?.()
        return
      }

      if (task === SaveTaskType.Unpublish) {
        dispatch(unpublishDraft({ id }))
      }

      if (task === SaveTaskType.Publish) {
        dispatch(publishDraft({ id }))
      }

      if (task === SaveTaskType.Unpublish || task === SaveTaskType.Publish) {
        dispatch(setNodePublished({ nodeId: String(id), elementType: 'data-object', isPublished: task === 'publish' }))
      }

      dispatch(setNodeLoadingInAllTree({ nodeId: String(id), elementType: 'data-object', loading: false }))
      onFinish?.()
    } catch (e: any) {
      trackError(new GeneralError(e.message as string))
    }
  }

  return { openDocument, executeDocumentTask }
}
