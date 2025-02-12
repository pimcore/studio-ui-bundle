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
import { RowSelectionDecorator } from '@Pimcore/modules/element/listing/decorators/row-selection/row-selection-decorator'
import { useElementId } from '@Pimcore/modules/asset/listing/hooks/use-element-id'
import { ColumnConfigurationDecorator } from './decorator/column-configuration/column-configuration-decorator'
import React from 'react'
import { DynamicTypeRegistryProvider } from '@Pimcore/modules/element/dynamic-types/registry/provider/dynamic-type-registry-provider'

export interface IObjectListingDefaultParams extends ListingContainerProps {
  useDataQuery: typeof useDataObjectGetGridQuery
  useDataQueryHelper: typeof useDataQueryHelper
  useElementId: ListingContainerProps['useElementId']
}

const defaultProps = {
  ...listingDefaultProps,
  useDataQuery: useDataObjectGetGridQuery,
  useDataQueryHelper,
  useElementId
}

const props = RowSelectionDecorator(ColumnConfigurationDecorator(defaultProps), { rowSelectionMode: 'multiple' }) as IObjectListingDefaultParams

export const ListingContainer = (): React.JSX.Element => {
  return (
    <DynamicTypeRegistryProvider serviceIds={ ['DynamicTypes/ListingRegistry'] }>
      <BaseListing
        { ...props }
      />
    </DynamicTypeRegistryProvider>
  )
}
