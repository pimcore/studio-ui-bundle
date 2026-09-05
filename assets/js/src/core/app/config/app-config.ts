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
  pageSizeOptions: number[]
  defaultPageSize: number
}

/** Kept in sync with pimcore_studio_ui.asset_upload.max_parallel_uploads. */
const DEFAULT_MAX_PARALLEL_UPLOADS = 5

/** Kept in sync with pimcore_studio_ui.pagination.page_size_options. */
const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

/** Kept in sync with pimcore_studio_ui.pagination.default_page_size. */
const DEFAULT_PAGE_SIZE = 20

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
  pageSizeOptions: appConfigData?.pageSizeOptions ?? DEFAULT_PAGE_SIZE_OPTIONS,
  defaultPageSize: appConfigData?.defaultPageSize ?? DEFAULT_PAGE_SIZE,
  ...(appConfigData ?? {})
}
