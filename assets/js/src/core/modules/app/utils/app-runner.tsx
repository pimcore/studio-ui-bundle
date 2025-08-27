/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { createRoot } from 'react-dom/client'
import { AppView } from '../app-view'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { store } from '@Pimcore/app/store'
import { settingsApi } from '@Pimcore/app/public-api/settings/settings-api'

export function runApp (): void {
  // Initialize the settings API with the Redux store for iframe communication
  settingsApi.initialize(store)

  const domElement = document.getElementById('app')

  if (domElement === null) {
    trackError(new GeneralError('Root element not found'))

    return undefined
  }

  const root = createRoot(domElement)
  root.render(<AppView />)
}
