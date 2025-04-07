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

import { type WysiwygAppConfigInterface } from '@Pimcore/modules/wysiwyg/interface/wysiwyg-app-config'

interface AppConfig {
  baseUrl: string
  mercureUrl: string
  maxPageSize: number
  wysiwyg: WysiwygAppConfigInterface
}

const appElement = document.querySelector('#app')
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
  maxPageSize: appConfigData?.maxPageSize ?? 9999999,
  wysiwyg: appConfigData?.wysiwyg ?? {
    defaultEditorConfig: {
      dataObject: {},
      document: {}
    }
  }
}
