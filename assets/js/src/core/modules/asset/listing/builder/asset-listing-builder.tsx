/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type IInlineEditDecoratorConfig } from '@Pimcore/modules/element/listing/decorators/inline-edit/inline-edit-decorator'
import { type IRowSelectionDecoratorConfig } from '@Pimcore/modules/element/listing/decorators/row-selection/row-selection-decorator'
import { type AbstractDecoratorProps, type IListingBuilder, ListingBuilder, type ListingBuilderBuildOptions, type ListingBuilderConfig, type ListingBuilderConfigEntry } from '@sdk/modules/element'

export type AssetListingBuilderConfig = ListingBuilderConfig & {
  'actionColumn'?: ListingBuilderConfigEntry
  'sorting'?: ListingBuilderConfigEntry
  'paging'?: ListingBuilderConfigEntry
  'columnConfiguration'?: ListingBuilderConfigEntry
  'inlineEdit'?: ListingBuilderConfigEntry<IInlineEditDecoratorConfig>
  'rowSelection'?: ListingBuilderConfigEntry<IRowSelectionDecoratorConfig>
  'contextMenu'?: ListingBuilderConfigEntry
  'tagFilter'?: ListingBuilderConfigEntry
  'generalFilters'?: ListingBuilderConfigEntry
  'globalContext'?: ListingBuilderConfigEntry
}

export interface AssetListingBuilderOptions extends ListingBuilderBuildOptions {
  config?: AssetListingBuilderConfig
}

export interface IAssetListingBuilder extends IListingBuilder {
  build: (options: AssetListingBuilderOptions) => AbstractDecoratorProps
}

export class AssetListingBuilder<T extends IListingBuilder = IAssetListingBuilder> extends ListingBuilder<T> {}
