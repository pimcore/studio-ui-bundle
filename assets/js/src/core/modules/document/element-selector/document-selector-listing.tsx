/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { ListingContainer, defaultProps as listingDefaultProps } from '@Pimcore/modules/element/listing/abstract/listing-container'
import { compose } from '@Pimcore/utils/compose'
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { SortingDecorator } from '@Pimcore/modules/element/listing/decorators/sorting/sorting-decorator'
import { PagingDecorator } from '@Pimcore/modules/element/listing/decorators/paging/paging-decorator'
import { type IRowSelectionDecoratorConfig, RowSelectionDecorator } from '@Pimcore/modules/element/listing/decorators/row-selection/row-selection-decorator'
import { GeneralFiltersDecorator, type GeneralFiltersDecoratorConfig } from '../../element/listing/decorators/general-filters/general-filters-decorator'
import { useElementSelectorHelper } from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector-helper'
import { DynamicTypeRegistryProvider } from '@Pimcore/modules/element/dynamic-types/registry/provider/dynamic-type-registry-provider'
import { GlobalRowSelectionDecorator, type IGlobalRowSelectionConfig } from '@Pimcore/modules/element/element-selector/listing-decorators/global-row-selection/global-row-selection-decorator'
import { DefaultView } from './view-layer/views/default-view'
import { TypeFilterDecorator, type TypeFilterDecoratorConfig } from '@Pimcore/modules/element/listing/decorators/type-filter/type-filter-decorator'
import { useDocumentGetSearchQuery } from '@Pimcore/modules/search/search-api-slice.gen'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import { useDataQueryHelper } from '@Pimcore/modules/asset/listing/data-layer/use-data-query-helper'
import { useRootElementId } from '@Pimcore/modules/asset/listing/hooks/use-root-element-id'
import { TagFilterDecorator } from '@Pimcore/modules/asset/listing/decorator/tag-filter/tag-filter-decorator'
import { StaticColumnConfigurationDecorator } from '@Pimcore/modules/search/modal/tabs/document/listing/decorator/static-column-configuration/static-column-configuration-decorator'

const defaultProps = {
  ...listingDefaultProps,
  ViewComponent: DefaultView,
  useDataQuery: useDocumentGetSearchQuery,
  useDataQueryHelper,
  useElementId: useRootElementId
}

export const DocumentSelectorListing = (): React.JSX.Element => {
  const { config } = useElementSelectorHelper()

  const allowedTypes: string[] = config.config?.documents?.allowedTypes ?? []

  /* eslint-disable @typescript-eslint/consistent-type-assertions */
  const listingProps = useMemo(() => compose<AbstractDecoratorProps>(
    PagingDecorator,
    StaticColumnConfigurationDecorator,
    [RowSelectionDecorator, { rowSelectionMode: config?.selectionType } as IRowSelectionDecoratorConfig],
    TagFilterDecorator,
    [GeneralFiltersDecorator, { handleSearchTermInSidebar: false } as GeneralFiltersDecoratorConfig],
    SortingDecorator,
    [GlobalRowSelectionDecorator, { rowSelectionMode: config?.selectionType, elementType: 'document' } as IGlobalRowSelectionConfig],
    [
      TypeFilterDecorator,
      {
        restrictedOptions: allowedTypes.length > 0 ? allowedTypes : undefined,
        elementType: elementTypes.document
      } as TypeFilterDecoratorConfig
    ]
  )(defaultProps), [config])
  /* eslint-enable @typescript-eslint/consistent-type-assertions */

  return useMemo(() => (
    <DynamicTypeRegistryProvider serviceIds={ [
      'DynamicTypes/GridCellRegistry',
      'DynamicTypes/ListingRegistry',
      'DynamicTypes/FieldFilterRegistry'
    ] }
    >
      <ListingContainer
        { ...listingProps }
      />
    </DynamicTypeRegistryProvider>
  ), [listingProps])
}
