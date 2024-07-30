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
import { FilterContainerInner } from './filter-container-inner'
import { FilterProvider } from './filter-provider'
import { GridConfigProvider } from '../grid-config/grid-config-provider'

export const FilterContainer = (): React.JSX.Element => {
  return (
    <FilterProvider>
      <GridConfigProvider>
        <FilterContainerInner />
      </GridConfigProvider>
    </FilterProvider>
  )
}
