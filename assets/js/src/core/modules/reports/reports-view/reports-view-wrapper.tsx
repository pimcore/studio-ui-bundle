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
import { GridFilterProvider } from '@Pimcore/modules/reports/reports-view/context/grid-filter-context'
import { ColumnsProvider } from '@Pimcore/components/grid/contexts/columns-context'
import { ReportsView } from '@Pimcore/modules/reports/reports-view/reports-view'
import { DynamicTypeRegistryProvider } from '@Pimcore/modules/element/dynamic-types/registry/provider/dynamic-type-registry-provider'

export const ReportsViewWrapper = (): React.JSX.Element => {
  return (
    <GridFilterProvider initialValue={ { columnFilters: [], drillDownFilters: {} } }>
      <ColumnsProvider>
        <DynamicTypeRegistryProvider serviceIds={ ['DynamicTypes/FieldFilterRegistry'] }>
          <ReportsView />
        </DynamicTypeRegistryProvider>
      </ColumnsProvider>
    </GridFilterProvider>
  )
}
