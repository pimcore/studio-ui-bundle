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
