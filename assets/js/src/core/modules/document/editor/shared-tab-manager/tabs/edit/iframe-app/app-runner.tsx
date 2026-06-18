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
import { createRoot, type Root } from 'react-dom/client'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { DocumentEditorIframeAppView } from './iframe-app-view'
import { isDev, REACT_SCAN_ENABLED } from '@Pimcore/utils/environment'

if (isDev() && REACT_SCAN_ENABLED) {
  void import('react-scan').then(({ scan }) => {
    scan({ enabled: true, log: true })
  })
}

export function runApp (): Root | undefined {
  const domElement = document.getElementById('pimcore-studio-app')

  if (domElement === null) {
    trackError(new GeneralError('Root element not found'))

    return undefined
  }

  const root = createRoot(domElement)
  root.render(<DocumentEditorIframeAppView />)

  return root
}
