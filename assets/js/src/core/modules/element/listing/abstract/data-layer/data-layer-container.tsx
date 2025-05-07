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
import { useSettings } from '../settings/use-settings'
import { DataRequestContainer } from './data-request-container'

export const DataLayerContainer = (): React.JSX.Element => {
  const { ViewComponent, useDataQueryHelper } = useSettings()
  const { hasRequiredArgs } = useDataQueryHelper()

  if (!hasRequiredArgs()) {
    return <ViewComponent />
  }

  return <DataRequestContainer />
}
