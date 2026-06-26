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
import { useDraftSync } from '@Pimcore/components/filters'
import { FilterContainerInner } from './filter-container-inner'
import { ClassificationStoreModalProvider } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider/classifcation-store-modal-provider'
import { DraftFiltersProvider, elementFilterDefinitions, useAppliedFilters, useDraftFilters } from '../../../../../element-filters'

const DraftSync = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const { values } = useAppliedFilters()
  const draftStore = useDraftFilters()

  useDraftSync(values, draftStore)

  return <>{children}</>
}

export const FilterContainer = (): React.JSX.Element => {
  const { values } = useAppliedFilters()

  return (
    <DraftFiltersProvider
      descriptors={ elementFilterDefinitions }
      initialValues={ values }
    >
      <DraftSync>
        <ClassificationStoreModalProvider>
          <FilterContainerInner />
        </ClassificationStoreModalProvider>
      </DraftSync>
    </DraftFiltersProvider>
  )
}
