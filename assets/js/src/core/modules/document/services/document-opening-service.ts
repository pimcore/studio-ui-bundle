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
import { api } from '../document-api-slice-enhanced'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { getElementIcon, type Element } from '@Pimcore/modules/element/element-helper'
import { getWidgetId } from '@Pimcore/modules/widget-manager/utils/tools'
import { openMainWidget, setActiveWidgetById } from '@Pimcore/modules/widget-manager/widget-manager-slice'
import { Model } from 'flexlayout-react'

// Import draft fetcher functions directly
import { documentReceived } from '../document-draft-slice'
import { initialTabsStateValue } from '@Pimcore/modules/element/draft/hooks/use-tabs'

interface DocumentConfig {
  id: number
}

/**
 * Document opening service that handles opening documents in the widget manager
 */
export class DocumentOpeningService {
  private isWidgetOpen (widgetId: string): boolean {
    const state = store.getState()
    const innerModel = (state as any)['widget-manager']?.innerModel
    if (!innerModel) return false

    const model = Model.fromJson(innerModel)
    return model.getNodeById(widgetId) !== undefined
  }

  private switchToWidget (widgetId: string): void {
    store.dispatch(setActiveWidgetById(widgetId))
  }

  private async fetchAndStoreDocumentDraft (id: number): Promise<void> {
    const { data } = await store.dispatch(api.endpoints.documentGetById.initiate({ id }))

    if (data) {
      const mergedDocumentData = {
        ...data,
        id,
        modified: false,
        properties: [],
        schedules: [],
        changes: {},
        modifiedCells: {},
        ...initialTabsStateValue
      }
      store.dispatch(documentReceived(mergedDocumentData))
    }
  }

  async openDocument (config: DocumentConfig): Promise<void> {
    const { id } = config
    const widgetId = getWidgetId('document', id)

    if (this.isWidgetOpen(widgetId)) {
      this.switchToWidget(widgetId)
      return
    }

    store.dispatch(api.util.invalidateTags(invalidatingTags.DOCUMENT_DETAIL_ID(id)))
    const { data } = await store.dispatch(api.endpoints.documentGetById.initiate({ id }))

    if (data === undefined || !checkElementPermission(data.permissions, 'view')) {
      return
    }

    // Store draft data for the element editor
    await this.fetchAndStoreDocumentDraft(id)

    const icon = getElementIcon(data as Element, { value: 'widget', type: 'name' })

    store.dispatch(openMainWidget({
      name: data?.key,
      id: widgetId,
      component: 'document-editor',
      config: {
        id,
        icon: {
          type: icon.type,
          value: icon.value
        }
      }
    }))
  }
}

// Create singleton instance
export const documentOpeningService = new DocumentOpeningService()
