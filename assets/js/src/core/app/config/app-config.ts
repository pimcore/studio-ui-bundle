/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type WysiwygAppConfigInterface } from '@Pimcore/modules/wysiwyg/interface/wysiwyg-app-config'
import { getParentDocument } from '@Pimcore/utils/iframe'

export interface AppConfig {
  baseUrl: string
  mercureUrl: string
  wysiwyg: WysiwygAppConfigInterface
  apiPrefix: string
  /** How many asset uploads a single tab sends at the same time. */
  maxParallelUploads: number
}

/** Kept in sync with pimcore_studio_ui.asset_upload.max_parallel_uploads. */
const DEFAULT_MAX_PARALLEL_UPLOADS = 5

const appElement = getParentDocument().querySelector('#app')
export const currentDomain = window.location.origin

if (appElement === null) {
  console.warn('App element not found')
}

const appConfigJSON = appElement?.getAttribute('data-app-config') ?? null
let appConfigData: AppConfig | null = null

if (appConfigJSON !== null) {
  appConfigData = JSON.parse(appConfigJSON)
}

export const appConfig: AppConfig = {
  baseUrl: appConfigData?.baseUrl ?? '/pimcore-studio/',
  mercureUrl: appConfigData?.mercureUrl ?? `${currentDomain}/.well-known/mercure`,
  wysiwyg: appConfigData?.wysiwyg ?? {
    defaultEditorConfig: {
      dataObject: {},
      document: {}
    }
  },
  apiPrefix: appConfigData?.apiPrefix ?? '/pimcore-studio/api',
  maxParallelUploads: appConfigData?.maxParallelUploads ?? DEFAULT_MAX_PARALLEL_UPLOADS,
  ...(appConfigData ?? {})
}
