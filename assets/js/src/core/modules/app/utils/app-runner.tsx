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

import React from 'react'
import { createRoot } from 'react-dom/client'
import { AppView } from '../app-view'

export function runApp (): void {
  const domElement = document.getElementById('app')

  if (domElement === null) {
    throw new Error('Root element not found')
  }

  const root = createRoot(domElement)
  root.render(<AppView />)
}
