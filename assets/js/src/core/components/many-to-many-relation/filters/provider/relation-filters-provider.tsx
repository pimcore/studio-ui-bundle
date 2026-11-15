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
import { DynamicTypeRegistryProvider } from '@Pimcore/modules/element/dynamic-types/registry/provider/dynamic-type-registry-provider'
import { RelationFiltersStoreProvider, relationFilterDescriptors } from '../filters'
import { RelationFilterColumnsProvider, type RelationFilterColumnsProviderProps } from './relation-filter-columns-context'

export interface RelationFiltersProviderProps extends RelationFilterColumnsProviderProps {}

/**
 * Provides the column header filters of a relation grid: the filterable
 * columns, the store holding the applied filters and the field filter registry
 * the filter editors are resolved from.
 */
export const RelationFiltersProvider = ({ children, ...columnsProps }: RelationFiltersProviderProps): React.JSX.Element => {
  return (
    <DynamicTypeRegistryProvider serviceIds={ ['DynamicTypes/FieldFilterRegistry', 'DynamicTypes/ObjectDataRegistry'] }>
      <RelationFilterColumnsProvider { ...columnsProps }>
        <RelationFiltersStoreProvider descriptors={ relationFilterDescriptors }>
          {children}
        </RelationFiltersStoreProvider>
      </RelationFilterColumnsProvider>
    </DynamicTypeRegistryProvider>
  )
}
