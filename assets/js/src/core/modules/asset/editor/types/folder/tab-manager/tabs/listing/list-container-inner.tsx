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
import { ListingContainer, type ListingContainerProps, defaultProps as listingDefaultProps } from '@Pimcore/modules/element/listing/abstract/listing-container'
import React from 'react'
import { useDataQueryHelper } from './data-layer/use-data-query-helper'
import { AssetAvailableColumnsDecorator } from './decorator/asset-available-columns/decorator'
import { RowSelectionDecorator } from '@Pimcore/modules/element/listing/decorators/row-selection/row-selection-decorator'
import { InlineEditDecorator } from '@Pimcore/modules/element/listing/decorators/inline-edit/inline-edit-decorator'
import { useInlineEditApiUpdate } from './inline-editing/hooks/use-inline-edit-api-update'
import { useElementId } from './hooks/use-element-id'
import { FilterDecorator } from '@Pimcore/modules/element/listing/decorators/filters/filter-decorator'

export interface IAssetListingDefaultParams extends ListingContainerProps {
  useDataQuery: typeof useAssetGetGridQuery
  useDataQueryHelper: typeof useDataQueryHelper
  useElementId: ListingContainerProps['useElementId']
}

const defaultProps = {
  ...listingDefaultProps,
  useDataQuery: useAssetGetGridQuery,
  useDataQueryHelper,
  useElementId
}

const props = RowSelectionDecorator(
  AssetAvailableColumnsDecorator(
    InlineEditDecorator(
      FilterDecorator(
        defaultProps
      ),
      { useInlineEditApiUpdate }
    )
  ), { rowSelectionMode: 'multiple' }
) as IAssetListingDefaultParams

console.log('AssetListingDefaultParams', props)

export const ListContainerInner = (): React.JSX.Element => {
  return (
    <ListingContainer
      { ...props }
    />
  )
}
