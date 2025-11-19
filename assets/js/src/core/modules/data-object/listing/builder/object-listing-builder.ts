/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AbstractDecoratorProps, type ClassDefinitionSelectionDecoratorConfig, type IInlineEditDecoratorConfig, type IRowSelectionDecoratorConfig } from '@sdk/modules/data-object'
import { type IListingBuilder, ListingBuilder, type ListingBuilderBuildOptions, type ListingBuilderConfig, type ListingBuilderConfigEntry } from '@sdk/modules/element'

export type ObjectListingBuilderConfig = ListingBuilderConfig & {
  'actionColumn'?: ListingBuilderConfigEntry
  'sorting'?: ListingBuilderConfigEntry
  'paging'?: ListingBuilderConfigEntry
  'classDefinitionSelection'?: ListingBuilderConfigEntry<ClassDefinitionSelectionDecoratorConfig>
  'columnConfiguration'?: ListingBuilderConfigEntry
  'inlineEdit'?: ListingBuilderConfigEntry<IInlineEditDecoratorConfig>
  'rowSelection'?: ListingBuilderConfigEntry<IRowSelectionDecoratorConfig>
  'contextMenu'?: ListingBuilderConfigEntry
  'tagFilter'?: ListingBuilderConfigEntry
  'generalFilters'?: ListingBuilderConfigEntry
  'globalContext'?: ListingBuilderConfigEntry
}
export interface ObjectListingBuilderOptions extends ListingBuilderBuildOptions {
  config?: ObjectListingBuilderConfig
}

export interface IObjectListingBuilder extends IListingBuilder {
  build: (options: ObjectListingBuilderOptions) => AbstractDecoratorProps
}

export class ObjectListingBuilder<T extends IListingBuilder = IObjectListingBuilder> extends ListingBuilder<T> {}
