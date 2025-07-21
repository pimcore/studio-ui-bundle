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
import { ApplicationLoggerContainerInner } from './application-logger-container-inner'
import { FilterProvider } from './components/sidebar/tabs/filter/provider/filter-provider/filter-provider'

export const ApplicationLoggerContainer = (): React.JSX.Element => {
  return (
    <FilterProvider>
      <ApplicationLoggerContainerInner />
    </FilterProvider>
  )
}
