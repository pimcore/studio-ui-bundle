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

import { useDataQueryHelper } from '@Pimcore/modules/asset/listing/data-layer/use-data-query-helper'
import { TagFilterDecorator } from '@Pimcore/modules/asset/listing/decorator/tag-filter/tag-filter-decorator'
import { useRootElementId } from '@Pimcore/modules/asset/listing/hooks/use-root-element-id'
import { DynamicTypeRegistryProvider } from '@Pimcore/modules/element/dynamic-types/registry/provider/dynamic-type-registry-provider'
import { ListingContainer, defaultProps as listingDefaultProps } from '@Pimcore/modules/element/listing/abstract/listing-container'
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { GeneralFiltersDecorator, type GeneralFiltersDecoratorConfig } from '@Pimcore/modules/element/listing/decorators/general-filters/general-filters-decorator'
import { PagingDecorator } from '@Pimcore/modules/element/listing/decorators/paging/paging-decorator'
import { SortingDecorator } from '@Pimcore/modules/element/listing/decorators/sorting/sorting-decorator'
import { useAssetGetSearchQuery } from '@Pimcore/modules/search/search-api-slice.gen'
import { compose } from '@Pimcore/utils/compose'
import React from 'react'
import { StaticColumnConfigurationDecorator } from './decorator/static-column-configuration/static-column-configuration-decorator'
import { DefaultView } from './view/view-layer/views/default-view'
import { TypeFilterDecorator } from './decorator/type-filter/type-filter-decorator'
import { OpenElementDecorator, type OpenElementDecoratorConfig } from './decorator/open-element/open-element-decorator'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'

const defaultProps = {
  ...listingDefaultProps,
  ViewComponent: DefaultView,
  useDataQuery: useAssetGetSearchQuery,
  useDataQueryHelper,
  useElementId: useRootElementId
}

/* eslint-disable @typescript-eslint/consistent-type-assertions */
const listingProps = compose<AbstractDecoratorProps>(
  PagingDecorator,
  StaticColumnConfigurationDecorator,
  TagFilterDecorator,
  [GeneralFiltersDecorator, { handleSearchTermInSidebar: false } as GeneralFiltersDecoratorConfig],
  TypeFilterDecorator,
  SortingDecorator,
  [OpenElementDecorator, { elementType: elementTypes.asset } as OpenElementDecoratorConfig]
)(defaultProps)
/* eslint-enable @typescript-eslint/consistent-type-assertions */

export const AssetSearchListing = (): React.JSX.Element => {
  return (
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
  )
}
