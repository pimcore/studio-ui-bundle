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
import { api, type ElementIcon } from '@Pimcore/modules/document/document-api-slice-enhanced'
import { getElementIcon } from '@Pimcore/modules/element/element-helper'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { getWidgetId } from '@Pimcore/modules/widget-manager/utils/tools'
import { type EditorContainerProps } from '../editor/editor-container'
import { useDocumentDraftFetcher } from './use-document-draft-fetcher'

interface OpenDocumentWidgetProps {
  config: EditorContainerProps
}

interface UseDocumentReturn {
  openDocument: (props: OpenDocumentWidgetProps) => Promise<void>
}

export const useDocumentHelper = (): UseDocumentReturn => {
  const { openMainWidget, isMainWidgetOpen } = useWidgetManager()
  const dispatch = useAppDispatch()
  const { updateDocumentDraft } = useDocumentDraftFetcher()

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

    const icon = getElementIcon(data, { value: 'widget', type: 'name' })
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

  return { openDocument }
}
