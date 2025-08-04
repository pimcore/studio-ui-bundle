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
import { RedirectsProvider } from './hooks/redirects-provider'
import { RedirectsContainer } from './redirects-container'

export const RedirectsWrapper = (): React.JSX.Element => {
  return (
    <RedirectsProvider>
      <RedirectsContainer />
    </RedirectsProvider>
  )
}
