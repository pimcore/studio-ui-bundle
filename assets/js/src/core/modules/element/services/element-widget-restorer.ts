/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type WidgetRestorer } from '@Pimcore/modules/widget-manager/services/widget-restorer-registry'
import { updateWidget, type WidgetManagerTabConfig } from '@Pimcore/modules/widget-manager/widget-manager-slice'
import { type AppDispatch } from '@sdk/app'
import { assetOpeningService } from '@Pimcore/modules/asset/services/asset-opening-service'
import { documentOpeningService } from '@Pimcore/modules/document/services/document-opening-service'
import { dataObjectOpeningService } from '@Pimcore/modules/data-object/services/data-object-opening-service'
import { isNil } from 'lodash'

export class ElementWidgetRestorer implements WidgetRestorer {
  supports (config: WidgetManagerTabConfig): boolean {
    return ['asset-editor', 'document-editor', 'data-object-editor'].includes(config.component!)
  }

  cleanConfig (config: WidgetManagerTabConfig): WidgetManagerTabConfig {
    return {
      ...config,
      config: {
        id: config.config.id,
        elementType: config.config.elementType
      }
    }
  }

  async restore (config: WidgetManagerTabConfig, dispatch: AppDispatch): Promise<boolean> {
    const { id } = config.config

    if (!isNil(id)) {
      const fullConfig = await this.getWidgetConfig(config.component, Number(id))

      if (!isNil(fullConfig)) {
        void dispatch(updateWidget(fullConfig))
        return true
      }
    }

    return false
  }

  private async getWidgetConfig (component: string | undefined, id: number): Promise<WidgetManagerTabConfig | undefined> {
    if (component === 'asset-editor') {
      return await assetOpeningService.getWidgetConfig(id, true)
    } else if (component === 'document-editor') {
      return await documentOpeningService.getWidgetConfig(id, true)
    } else if (component === 'data-object-editor') {
      return await dataObjectOpeningService.getWidgetConfig(id, true)
    }
    return undefined
  }
}

export const elementWidgetRestorer = new ElementWidgetRestorer()
