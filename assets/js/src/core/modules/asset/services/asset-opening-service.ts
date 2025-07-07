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
import { api } from '../asset-api-slice-enhanced'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { getElementIcon } from '@Pimcore/modules/element/element-helper'
import { getWidgetId } from '@Pimcore/modules/widget-manager/utils/tools'
import { openMainWidget, setActiveWidgetById } from '@Pimcore/modules/widget-manager/widget-manager-slice'
import { Model } from 'flexlayout-react'
import { assetReceived } from '../asset-draft-slice'
import { initialTabsStateValue } from '@Pimcore/modules/element/draft/hooks/use-tabs'
import { isNil } from 'lodash'

interface AssetConfig {
  id: number
}

/**
 * Asset opening service that handles opening assets in the widget manager
 */
export class AssetOpeningService {
  private isWidgetOpen (widgetId: string): boolean {
    const state = store.getState()
    const innerModel = (state as any)['widget-manager']?.innerModel
    if (isNil(innerModel)) return false

    // Type assertion for the Model.fromJson parameter
    const model = Model.fromJson(innerModel as Parameters<typeof Model.fromJson>[0])
    return model.getNodeById(widgetId) !== undefined
  }

  private switchToWidget (widgetId: string): void {
    store.dispatch(setActiveWidgetById(widgetId))
  }

  private async fetchAndStoreAssetDraft (id: number): Promise<void> {
    const { data } = await store.dispatch(api.endpoints.assetGetById.initiate({ id }))

    if (!isNil(data)) {
      const mergedAssetData = {
        ...data,
        id,
        modified: false,
        properties: [],
        customMetadata: [],
        customSettings: [],
        schedules: [],
        textData: '',
        imageSettings: {},
        changes: {},
        modifiedCells: {},
        ...initialTabsStateValue
      }
      store.dispatch(assetReceived(mergedAssetData))
    }
  }

  async openAsset (config: AssetConfig): Promise<void> {
    const { id } = config
    const widgetId = getWidgetId('asset', id)

    // If widget is already open, just switch to it
    if (this.isWidgetOpen(widgetId)) {
      this.switchToWidget(widgetId)
      return
    }

    // Invalidate cache and fetch fresh data
    store.dispatch(api.util.invalidateTags(invalidatingTags.ASSET_DETAIL_ID(id)))
    const { data } = await store.dispatch(api.endpoints.assetGetById.initiate({ id }))

    if (isNil(data) || !checkElementPermission(data.permissions, 'view')) {
      return
    }

    // Store draft data for the element editor
    await this.fetchAndStoreAssetDraft(id)

    // Open the widget
    store.dispatch(openMainWidget({
      name: data?.filename,
      id: widgetId,
      component: 'asset-editor',
      config: {
        id,
        icon: getElementIcon(data, { value: 'widget', type: 'name' })
      }
    }))
  }
}

// Create singleton instance
export const assetOpeningService = new AssetOpeningService()
