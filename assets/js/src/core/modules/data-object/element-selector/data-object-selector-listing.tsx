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
import { ListingContainer, defaultProps as listingDefaultProps } from '@Pimcore/modules/element/listing/abstract/listing-container'
import { compose } from '@Pimcore/utils/compose'
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { SortingDecorator } from '@Pimcore/modules/element/listing/decorators/sorting/sorting-decorator'
import { PagingDecorator } from '@Pimcore/modules/element/listing/decorators/paging/paging-decorator'
import { ColumnConfigurationDecorator } from '../listing/decorator/column-configuration/column-configuration-decorator'
import { type IRowSelectionDecoratorConfig, RowSelectionDecorator } from '@Pimcore/modules/element/listing/decorators/row-selection/row-selection-decorator'
import { useElementSelectorHelper } from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector-helper'
import { DynamicTypeRegistryProvider } from '@Pimcore/modules/element/dynamic-types/registry/provider/dynamic-type-registry-provider'
import { GlobalRowSelectionDecorator, type IGlobalRowSelectionConfig } from '@Pimcore/modules/element/element-selector/listing-decorators/global-row-selection/global-row-selection-decorator'
import { useDataObjectGetGridQuery } from '../data-object-api-slice.gen'
import { useDataQueryHelper } from '../listing/data-layer/hooks/use-data-query-helper'
import { useRootElementId } from '@Pimcore/modules/asset/listing/hooks/use-root-element-id'
import { ClassDefinitionSelectionDecorator, type ClassDefinitionSelectionDecoratorConfig } from '../listing/decorator/class-definition-selection/class-definition-selection-decorator'
import { DefaultView } from './view-layer/views/default-view'
import { GeneralFiltersDecorator, type GeneralFiltersDecoratorConfig } from '@Pimcore/modules/element/listing/decorators/general-filters/general-filters-decorator'

const defaultProps = {
  ...listingDefaultProps,
  ViewComponent: DefaultView,
  useDataQuery: useDataObjectGetGridQuery,
  useDataQueryHelper,
  useElementId: useRootElementId
}

export const DataObjectSelectorListing = (): React.JSX.Element => {
  const { config } = useElementSelectorHelper()

  /* eslint-disable @typescript-eslint/consistent-type-assertions */
  const listingProps = useMemo(() => compose<AbstractDecoratorProps>(
    PagingDecorator,
    ColumnConfigurationDecorator,
    [RowSelectionDecorator, { rowSelectionMode: config?.selectionType } as IRowSelectionDecoratorConfig],
    SortingDecorator,
    [GlobalRowSelectionDecorator, { rowSelectionMode: config?.selectionType, elementType: 'data-object' } as IGlobalRowSelectionConfig],
    [ClassDefinitionSelectionDecorator, { showConfigLayer: true } as ClassDefinitionSelectionDecoratorConfig],
    [GeneralFiltersDecorator, { handleSearchTermInSidebar: false } as GeneralFiltersDecoratorConfig]
  )(defaultProps), [config])
  /* eslint-enable @typescript-eslint/consistent-type-assertions */

  return useMemo(() => (
    <DynamicTypeRegistryProvider serviceIds={ [
      'DynamicTypes/GridCellRegistry',
      'DynamicTypes/ListingRegistry'
    ] }
    >
      <ListingContainer
        { ...listingProps }
      />
    </DynamicTypeRegistryProvider>
  ), [listingProps])
}
