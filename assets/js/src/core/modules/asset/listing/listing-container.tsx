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

import { useAssetGetGridQuery } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { ListingContainer as BaseListingContainer, type ListingContainerProps, defaultProps as listingDefaultProps } from '@Pimcore/modules/element/listing/abstract/listing-container'
import React from 'react'
import { useDataQueryHelper } from './data-layer/use-data-query-helper'
import { ColumnConfigurationDecorator } from './decorator/column-configuration/column-configuration-decorator'
import { type IRowSelectionDecoratorConfig, RowSelectionDecorator } from '@Pimcore/modules/element/listing/decorators/row-selection/row-selection-decorator'
import { type IInlineEditDecoratorConfig, InlineEditDecorator } from '@Pimcore/modules/element/listing/decorators/inline-edit/inline-edit-decorator'
import { useInlineEditApiUpdate } from './decorator/inline-editing/hooks/use-inline-edit-api-update'
import { useElementId } from './hooks/use-element-id'
import { PagingDecorator } from '@Pimcore/modules/element/listing/decorators/paging/paging-decorator'
import { compose } from '@Pimcore/utils/compose'
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { DefaultView } from './views/default-view'
import { ActionColumnDecorator } from './decorator/action-column/action-column-decorator'
import { ContextMenuDecorator } from './decorator/context-menu/context-menu-decorator'
import { SortingDecorator } from '@Pimcore/modules/element/listing/decorators/sorting/sorting-decorator'
import { TagFilterDecorator } from './decorator/tag-filter/tag-filter-decorator'
import { GeneralFiltersDecorator } from '../../element/listing/decorators/general-filters/general-filters-decorator'

export interface IAssetListingDefaultParams extends ListingContainerProps {
  useDataQuery: typeof useAssetGetGridQuery
  useDataQueryHelper: typeof useDataQueryHelper
  useElementId: ListingContainerProps['useElementId']
}

const defaultProps = {
  ...listingDefaultProps,
  ViewComponent: DefaultView,
  useDataQuery: useAssetGetGridQuery,
  useDataQueryHelper,
  useElementId
}

/* eslint-disable @typescript-eslint/consistent-type-assertions */
const props = compose<AbstractDecoratorProps>(
  SortingDecorator,
  PagingDecorator,
  ColumnConfigurationDecorator,
  [InlineEditDecorator, { useInlineEditApiUpdate } as IInlineEditDecoratorConfig],
  [RowSelectionDecorator, { rowSelectionMode: 'multiple' } as IRowSelectionDecoratorConfig],
  ActionColumnDecorator,
  ContextMenuDecorator,
  TagFilterDecorator,
  GeneralFiltersDecorator
)(defaultProps) as IAssetListingDefaultParams

export const ListingContainer = (): React.JSX.Element => {
  return (
    <BaseListingContainer
      { ...props }
    />
  )
}
