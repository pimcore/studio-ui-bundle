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
