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
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { FilterContainerInner } from './filter-container-inner'
import { DynamicTypeRegistryProvider } from '@Pimcore/modules/element/dynamic-types/registry/provider/dynamic-type-registry-provider'
import { FilterProvider } from './provider/filter-provider/filter-provider'

interface IFilterContainerProps {
  errorData?: FetchBaseQueryError
}

export const FilterContainer = ({ errorData }: IFilterContainerProps): React.JSX.Element => {
  return (
    <FilterProvider>
      <DynamicTypeRegistryProvider serviceIds={ ['DynamicTypes/ListingRegistry'] }>
        <DynamicTypeRegistryProvider serviceIds={ ['DynamicTypes/FieldFilterRegistry'] }>
          <FilterContainerInner />
        </DynamicTypeRegistryProvider>
      </DynamicTypeRegistryProvider>
    </FilterProvider>
  )
}
