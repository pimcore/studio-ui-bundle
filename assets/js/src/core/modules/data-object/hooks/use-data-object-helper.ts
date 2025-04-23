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

import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { store, useAppDispatch } from '@Pimcore/app/store'
import { setNodeLoadingInAllTree, setNodePublished } from '@Pimcore/components/element-tree/element-tree-slice'
import { type IconProps } from '@Pimcore/components/icon/icon'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { api } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { getElementIcon } from '@Pimcore/modules/element/element-helper'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { getWidgetId } from '@Pimcore/modules/widget-manager/utils/tools'
import { SaveTaskType } from '../actions/save/use-save'
import { useDataObjectUpdateByIdMutation } from '../data-object-api-slice.gen'
import { publishDraft, unpublishDraft } from '../data-object-draft-slice'
import { type EditorContainerProps } from '../editor/editor-container'
import { useDataObjectDraftFetcher } from './use-data-object-draft-fetcher'

interface OpenDataObjectWidgetProps {
  config: EditorContainerProps
}

interface UseDataObjectReturn {
  openDataObject: (props: OpenDataObjectWidgetProps) => Promise<void>
  executeDataObjectTask: (id: number, task: SaveTaskType, onFinish?: () => void) => Promise<void>
}

export const useDataObjectHelper = (): UseDataObjectReturn => {
  const { openMainWidget, isMainWidgetOpen } = useWidgetManager()
  const dispatch = useAppDispatch()
  const [update] = useDataObjectUpdateByIdMutation()
  const { updateDataObjectDraft } = useDataObjectDraftFetcher()

  async function openDataObject (props: OpenDataObjectWidgetProps): Promise<void> {
    const { config } = props
    const widgetId = getWidgetId('data-object', config.id)

    if (!isMainWidgetOpen(widgetId)) {
      dispatch(api.util.invalidateTags(invalidatingTags.DATA_OBJECT_DETAIL_ID(config.id)))
      void updateDataObjectDraft(config.id, true)
    }

    const { data } = await store.dispatch(api.endpoints.dataObjectGetById.initiate({ id: config.id }))

    if (
      data === undefined ||
      !checkElementPermission(data.permissions, 'view')) {
      return
    }

    const icon = getElementIcon(data, { value: 'widget', type: 'name' })
    const iconConfig: IconProps & ElementIcon = {
      type: icon.type,
      value: icon.value
    }

    openMainWidget({
      name: data?.key,
      id: widgetId,
      component: 'data-object-editor',
      config: {
        ...config,
        icon: iconConfig
      }
    })
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
