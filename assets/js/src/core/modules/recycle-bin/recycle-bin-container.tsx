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
import { RecycleBinAppliedFiltersProvider, recycleBinFilterDescriptors } from '@Pimcore/modules/recycle-bin/filters/filters'
import { SelectedRowsProvider } from './context/selected-items-context'
import { RecycleBinContainerInner } from './recycle-bin-container-inner'

export const RecycleBinContainer = (): React.JSX.Element => {
  return (
    <DynamicTypeRegistryProvider serviceIds={ ['DynamicTypes/FieldFilterRegistry'] }>
      <RecycleBinAppliedFiltersProvider descriptors={ recycleBinFilterDescriptors }>
        <SelectedRowsProvider>
          <RecycleBinContainerInner />
        </SelectedRowsProvider>
      </RecycleBinAppliedFiltersProvider>
    </DynamicTypeRegistryProvider>
  )
}
