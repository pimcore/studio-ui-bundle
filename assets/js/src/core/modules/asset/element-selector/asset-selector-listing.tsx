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

import React, { useMemo } from 'react'
import { useDataQueryHelper } from '../listing/data-layer/use-data-query-helper'
import { ListingContainer, defaultProps as listingDefaultProps } from '@Pimcore/modules/element/listing/abstract/listing-container'
import { compose } from '@Pimcore/utils/compose'
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { SortingDecorator } from '@Pimcore/modules/element/listing/decorators/sorting/sorting-decorator'
import { PagingDecorator } from '@Pimcore/modules/element/listing/decorators/paging/paging-decorator'
import { type IRowSelectionDecoratorConfig, RowSelectionDecorator } from '@Pimcore/modules/element/listing/decorators/row-selection/row-selection-decorator'
import { TagFilterDecorator } from '../listing/decorator/tag-filter/tag-filter-decorator'
import { GeneralFiltersDecorator, type GeneralFiltersDecoratorConfig } from '../../element/listing/decorators/general-filters/general-filters-decorator'
import { useElementSelectorHelper } from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector-helper'
import { useRootElementId } from '../listing/hooks/use-root-element-id'
import { DynamicTypeRegistryProvider } from '@Pimcore/modules/element/dynamic-types/registry/provider/dynamic-type-registry-provider'
import { GlobalRowSelectionDecorator, type IGlobalRowSelectionConfig } from '@Pimcore/modules/element/element-selector/listing-decorators/global-row-selection/global-row-selection-decorator'
import { DefaultView } from './view-layer/views/default-view'
import { TypeFilterDecorator, type TypeFilterDecoratorConfig } from '@Pimcore/modules/element/listing/decorators/type-filter/type-filter-decorator'
import { StaticColumnConfigurationDecorator } from '@Pimcore/modules/search/modal/tabs/asset/listing/decorator/static-column-configuration/static-column-configuration-decorator'
import { useAssetGetSearchQuery } from '@Pimcore/modules/search/search-api-slice.gen'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'

const defaultProps = {
  ...listingDefaultProps,
  ViewComponent: DefaultView,
  useDataQuery: useAssetGetSearchQuery,
  useDataQueryHelper,
  useElementId: useRootElementId
}

export const AssetSelectorListing = (): React.JSX.Element => {
  const { config } = useElementSelectorHelper()

  const allowedTypes: string[] = config.config?.assets?.allowedTypes ?? []

  /* eslint-disable @typescript-eslint/consistent-type-assertions */
  const listingProps = useMemo(() => compose<AbstractDecoratorProps>(
    PagingDecorator,
    StaticColumnConfigurationDecorator,
    [RowSelectionDecorator, { rowSelectionMode: config?.selectionType } as IRowSelectionDecoratorConfig],
    TagFilterDecorator,
    [GeneralFiltersDecorator, { handleSearchTermInSidebar: false } as GeneralFiltersDecoratorConfig],
    SortingDecorator,
    [GlobalRowSelectionDecorator, { rowSelectionMode: config?.selectionType, elementType: 'asset' } as IGlobalRowSelectionConfig],
    [
      TypeFilterDecorator,
      {
        restrictedOptions: allowedTypes.length > 0 ? allowedTypes : undefined,
        elementType: elementTypes.asset
      } as TypeFilterDecoratorConfig
    ]
  )(defaultProps), [config])
  /* eslint-enable @typescript-eslint/consistent-type-assertions */

  return useMemo(() => (
    <DynamicTypeRegistryProvider serviceIds={ [
      'DynamicTypes/GridCellRegistry',
      'DynamicTypes/MetadataRegistry',
      'DynamicTypes/ListingRegistry'
    ] }
    >
      <ListingContainer
        { ...listingProps }
      />
    </DynamicTypeRegistryProvider>
  ), [listingProps])
}
