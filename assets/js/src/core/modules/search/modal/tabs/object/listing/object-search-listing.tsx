/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { DynamicTypeRegistryProvider } from '@Pimcore/modules/element/dynamic-types/registry/provider/dynamic-type-registry-provider'
import { ListingContainer, defaultProps as listingDefaultProps } from '@Pimcore/modules/element/listing/abstract/listing-container'
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { GeneralFiltersDecorator, type GeneralFiltersDecoratorConfig } from '@Pimcore/modules/element/listing/decorators/general-filters/general-filters-decorator'
import { PagingDecorator } from '@Pimcore/modules/element/listing/decorators/paging/paging-decorator'
import { SortingDecorator } from '@Pimcore/modules/element/listing/decorators/sorting/sorting-decorator'
import { useDataObjectGetSearchQuery } from '@Pimcore/modules/search/search-api-slice.gen'
import { compose } from '@Pimcore/utils/compose'
import React from 'react'
import { DefaultView } from './view/view-layer/views/default-view'
import { OpenElementDecorator, type OpenElementDecoratorConfig } from './decorator/open-element/open-element-decorator'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import { useRootElementId } from '@Pimcore/modules/asset/listing/hooks/use-root-element-id'
import { TagFilterDecorator } from '@Pimcore/modules/asset/listing/decorator/tag-filter/tag-filter-decorator'
import { TypeFilterDecorator, type TypeFilterDecoratorConfig } from '@Pimcore/modules/element/listing/decorators/type-filter/type-filter-decorator'
import { useDataQueryHelper } from './data-layer/use-data-query-helper'
import { ClassDefinitionSelectionDecorator, type ClassDefinitionSelectionDecoratorConfig } from '@Pimcore/modules/data-object/listing/decorator/class-definition-selection/class-definition-selection-decorator'
import { ColumnConfigurationDecorator } from './decorator/column-configuration/column-configuration-decorator'
import { SavedSearchDecorator, type SavedSearchDecoratorConfig } from '@Pimcore/modules/search/saved-search/saved-search-decorator'
import { useDataObjectColumnMapper } from '@Pimcore/modules/data-object/listing/column-mapper/use-column-mapper'
import { LanguageSelectionProvider } from '@Pimcore/components/language-selection/provider/language-selection-provider'

const defaultProps = {
  ...listingDefaultProps,
  ViewComponent: DefaultView,
  useDataQuery: useDataObjectGetSearchQuery,
  useDataQueryHelper,
  useElementId: useRootElementId,
  useColumnMapper: useDataObjectColumnMapper
}

/* eslint-disable @typescript-eslint/consistent-type-assertions */
const listingProps = compose<AbstractDecoratorProps>(
  PagingDecorator,
  ColumnConfigurationDecorator,
  TagFilterDecorator,
  [GeneralFiltersDecorator, { handleSearchTermInSidebar: false, elementType: elementTypes.dataObject } as GeneralFiltersDecoratorConfig],
  SortingDecorator,
  [ClassDefinitionSelectionDecorator, { showConfigLayer: false } as ClassDefinitionSelectionDecoratorConfig],
  [OpenElementDecorator, { elementType: elementTypes.dataObject } as OpenElementDecoratorConfig],
  [TypeFilterDecorator, { elementType: elementTypes.dataObject } as TypeFilterDecoratorConfig],
  // Composed last so its sidebar entry prepends ahead of the filter/tag entries (first icon).
  [SavedSearchDecorator, { elementType: elementTypes.dataObject, supportsLoadedState: true } as SavedSearchDecoratorConfig]
)(defaultProps)
/* eslint-enable @typescript-eslint/consistent-type-assertions */

export const ObjectSearchListing = (): React.JSX.Element => {
  return (
    <LanguageSelectionProvider>
      <DynamicTypeRegistryProvider serviceIds={ [
        'DynamicTypes/GridCellRegistry',
        'DynamicTypes/ListingRegistry',
        'DynamicTypes/ObjectDataRegistry',
        'DynamicTypes/FieldFilterRegistry'
      ] }
      >
        <ListingContainer
          { ...listingProps }
        />
      </DynamicTypeRegistryProvider>
    </LanguageSelectionProvider>
  )
}
