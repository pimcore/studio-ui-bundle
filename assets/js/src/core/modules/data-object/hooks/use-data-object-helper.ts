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
import { setNodeLoadingInAllTree, setNodePublished } from '@Pimcore/components/element-tree/element-tree-slice'
import { SaveTaskType } from '../actions/save/use-save'
import { useDataObjectUpdateByIdMutation } from '../data-object-api-slice.gen'
import { publishDraft, unpublishDraft } from '../data-object-draft-slice'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'

interface OpenDataObjectWidgetProps {
  config: EditorContainerProps
}

interface UseDataObjectReturn {
  openDataObject: (props: OpenDataObjectWidgetProps) => Promise<void>
  executeDataObjectTask: (id: number, task: SaveTaskType, onFinish?: () => void) => Promise<void>
}

export const useDataObjectHelper = (): UseDataObjectReturn => {
  const dispatch = store.dispatch
  const [update] = useDataObjectUpdateByIdMutation()

  async function openDataObject (props: OpenDataObjectWidgetProps): Promise<void> {
    const { config } = props
    const { element } = getPimcoreStudioApi()
    await element.openDataObject(config.id)
  }

  const executeDataObjectTask = async (id: number, task: SaveTaskType, onFinish?: () => void): Promise<void> => {
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

  return { openDataObject, executeDataObjectTask }
}
