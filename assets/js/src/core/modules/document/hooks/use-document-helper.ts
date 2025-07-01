/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { store, useAppDispatch } from '@Pimcore/app/store'
import { type IconProps } from '@Pimcore/components/icon/icon'
import { api, useDocumentUpdateByIdMutation, type ElementIcon } from '@Pimcore/modules/document/document-api-slice-enhanced'
import { type Element, getElementIcon } from '@Pimcore/modules/element/element-helper'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { getWidgetId } from '@Pimcore/modules/widget-manager/utils/tools'
import { type EditorContainerProps } from '../editor/editor-container'
import { useDocumentDraftFetcher } from './use-document-draft-fetcher'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { setNodeLoadingInAllTree, setNodePublished } from '@Pimcore/components/element-tree/element-tree-slice'
import { publishDraft, unpublishDraft } from '../document-draft-slice'
import { SaveTaskType } from '../services'

interface OpenDocumentWidgetProps {
  config: EditorContainerProps
}

interface UseDocumentReturn {
  openDocument: (props: OpenDocumentWidgetProps) => Promise<void>
  executeDocumentTask: (id: number, task: SaveTaskType, onFinish?: () => void) => Promise<void>
}

export const useDocumentHelper = (): UseDocumentReturn => {
  const { openMainWidget, isMainWidgetOpen } = useWidgetManager()
  const dispatch = useAppDispatch()
  const { updateDocumentDraft } = useDocumentDraftFetcher()
  const [update] = useDocumentUpdateByIdMutation()

  async function openDocument (props: OpenDocumentWidgetProps): Promise<void> {
    const { config } = props
    const widgetId = getWidgetId('document', config.id)

    if (!isMainWidgetOpen(widgetId)) {
      dispatch(api.util.invalidateTags(invalidatingTags.DOCUMENT_DETAIL_ID(config.id)))
      void updateDocumentDraft(config.id, true)
    }

    const { data } = await store.dispatch(api.endpoints.documentGetById.initiate({ id: config.id }))

    if (
      data === undefined ||
      !checkElementPermission(data.permissions, 'view')) {
      return
    }

    const icon = getElementIcon(data as Element, { value: 'widget', type: 'name' })
    const iconConfig: IconProps & ElementIcon = {
      type: icon.type,
      value: icon.value
    }

    openMainWidget({
      name: data?.key,
      id: widgetId,
      component: 'document-editor',
      config: {
        ...config,
        icon: iconConfig
      }
    })
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
