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

import { type ListingContainerProps, defaultProps as listingDefaultProps, ListingContainer as BaseListing } from '@Pimcore/modules/element/listing/abstract/listing-container'
import { useDataObjectGetGridQuery } from '../data-object-api-slice.gen'
import { useDataQueryHelper } from './data-layer/hooks/use-data-query-helper'
import { type IRowSelectionDecoratorConfig, RowSelectionDecorator } from '@Pimcore/modules/element/listing/decorators/row-selection/row-selection-decorator'
import { useElementId } from '@Pimcore/modules/asset/listing/hooks/use-element-id'
import { ColumnConfigurationDecorator } from './decorator/column-configuration/column-configuration-decorator'
import React from 'react'
import { DynamicTypeRegistryProvider } from '@Pimcore/modules/element/dynamic-types/registry/provider/dynamic-type-registry-provider'
import { compose } from '@Pimcore/utils/compose'
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { PagingDecorator } from '@Pimcore/modules/element/listing/decorators/paging/paging-decorator'
import { SortingDecorator } from '@Pimcore/modules/element/listing/decorators/sorting/sorting-decorator'
import { DefaultView } from './views/default-view'
import { ClassDefinitionSelectionDecorator, type ClassDefinitionSelectionDecoratorConfig } from './decorator/class-definition-selection/class-definition-selection-decorator'

export interface IObjectListingDefaultParams extends ListingContainerProps {
  useDataQuery: typeof useDataObjectGetGridQuery
  useDataQueryHelper: typeof useDataQueryHelper
  useElementId: ListingContainerProps['useElementId']
}

const defaultProps = {
  ...listingDefaultProps,
  ViewComponent: DefaultView,
  useDataQuery: useDataObjectGetGridQuery,
  useDataQueryHelper,
  useElementId
}

/* eslint-disable @typescript-eslint/consistent-type-assertions */
const props = compose<AbstractDecoratorProps>(
  SortingDecorator,
  PagingDecorator,
  ColumnConfigurationDecorator,
  [RowSelectionDecorator, { rowSelectionMode: 'multiple' } as IRowSelectionDecoratorConfig],
  [ClassDefinitionSelectionDecorator, { showConfigLayer: true } as ClassDefinitionSelectionDecoratorConfig]
)(defaultProps)
/* eslint-enable @typescript-eslint/consistent-type-assertions */

export const ListingContainer = (): React.JSX.Element => {
  return (
    <DynamicTypeRegistryProvider serviceIds={ ['DynamicTypes/ListingRegistry'] }>
      <BaseListing
        { ...props }
      />
    </DynamicTypeRegistryProvider>
  )
}
