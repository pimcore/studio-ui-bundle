import { AbstractDecoratorProps, ClassDefinitionSelectionDecoratorConfig, IInlineEditDecoratorConfig, IRowSelectionDecoratorConfig } from "@sdk/modules/data-object"
import { IListingBuilder, ListingBuilder, ListingBuilderBuildOptions, ListingBuilderConfig, ListingBuilderConfigEntry } from "@sdk/modules/element"

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
}

export interface ObjectListingBuilderOptions extends ListingBuilderBuildOptions {
  config?: ObjectListingBuilderConfig
}

export interface IObjectListingBuilder extends IListingBuilder {
  build: (options: ObjectListingBuilderOptions) => AbstractDecoratorProps
}

export class ObjectListingBuilder<T extends IListingBuilder = IObjectListingBuilder> extends ListingBuilder<T> {}

const test = new ObjectListingBuilder()
