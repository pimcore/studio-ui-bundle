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
import { type IRowSelectionDecoratorConfig, RowSelectionDecorator } from '@Pimcore/modules/element/listing/decorators/row-selection/row-selection-decorator'
import { useElementSelectorHelper } from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector-helper'
import { DynamicTypeRegistryProvider } from '@Pimcore/modules/element/dynamic-types/registry/provider/dynamic-type-registry-provider'
import { GlobalRowSelectionDecorator, type IGlobalRowSelectionConfig } from '@Pimcore/modules/element/element-selector/listing-decorators/global-row-selection/global-row-selection-decorator'
import { useRootElementId } from '@Pimcore/modules/asset/listing/hooks/use-root-element-id'
import { ClassDefinitionSelectionDecorator, type ClassDefinitionSelectionDecoratorConfig } from '../listing/decorator/class-definition-selection/class-definition-selection-decorator'
import { DefaultView } from './view-layer/views/default-view'
import { GeneralFiltersDecorator, type GeneralFiltersDecoratorConfig } from '@Pimcore/modules/element/listing/decorators/general-filters/general-filters-decorator'
import { TagFilterDecorator } from '@Pimcore/modules/asset/listing/decorator/tag-filter/tag-filter-decorator'
import { ColumnConfigurationDecorator } from '@Pimcore/modules/search/modal/tabs/object/listing/decorator/column-configuration/column-configuration-decorator'
import { TypeFilterDecorator, type TypeFilterDecoratorConfig } from '@Pimcore/modules/element/listing/decorators/type-filter/type-filter-decorator'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import { useDataObjectGetSearchQuery } from '@Pimcore/modules/search/search-api-slice.gen'
import { useDataQueryHelper } from '@Pimcore/modules/search/modal/tabs/object/listing/data-layer/use-data-query-helper'

const defaultProps = {
  ...listingDefaultProps,
  ViewComponent: DefaultView,
  useDataQuery: useDataObjectGetSearchQuery,
  useDataQueryHelper,
  useElementId: useRootElementId
}

export const DataObjectSelectorListing = (): React.JSX.Element => {
  const { config } = useElementSelectorHelper()

  const hasAllowedTypes = config.config?.objects?.allowedTypes?.length !== undefined
  const isFolderIncluded = config.config?.objects?.allowedTypes?.includes('folder') ?? false
  const areClassesIncluded = config.config?.objects?.allowedTypes?.some((type) => type !== 'folder') ?? false
  const typeRestriction: TypeFilterDecoratorConfig['restrictedOptions'] = []

  if (isFolderIncluded) {
    typeRestriction.push('folder')
  }

  if (areClassesIncluded) {
    typeRestriction.push('object')
    typeRestriction.push('variant')
  }

  let classRestriction: ClassDefinitionSelectionDecoratorConfig['classRestriction'] = []

  if (hasAllowedTypes) {
    const classesWithoutFolder = config.config?.objects?.allowedTypes?.filter((type) => type !== 'folder') ?? []
    classRestriction = classesWithoutFolder.map((type) => ({
      classes: type
    }))
  }

  /* eslint-disable @typescript-eslint/consistent-type-assertions */
  const listingProps = useMemo(() => compose<AbstractDecoratorProps>(
    PagingDecorator,
    ColumnConfigurationDecorator,
    [RowSelectionDecorator, { rowSelectionMode: config?.selectionType } as IRowSelectionDecoratorConfig],
    SortingDecorator,
    [GlobalRowSelectionDecorator, { rowSelectionMode: config?.selectionType, elementType: 'data-object' } as IGlobalRowSelectionConfig],
    TagFilterDecorator,
    [
      ClassDefinitionSelectionDecorator,
      {
        showConfigLayer: false,
        classRestriction: classRestriction.length > 0 ? classRestriction : undefined
      } as ClassDefinitionSelectionDecoratorConfig
    ],
    [GeneralFiltersDecorator, { handleSearchTermInSidebar: false } as GeneralFiltersDecoratorConfig],
    [
      TypeFilterDecorator,
      {
        elementType: elementTypes.dataObject,
        restrictedOptions: typeRestriction.length > 0 ? typeRestriction : undefined
      } as TypeFilterDecoratorConfig
    ]
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
