import { moduleSystem } from "@Pimcore/app/module-system/module-system";
import { container } from "@Pimcore/app/depency-injection";
import { componentConfig, ComponentRegistry } from "@Pimcore/modules/app/component-registry/component-registry";
import { serviceIds } from "@Pimcore/app/config/services/service-ids";
import { ListingContainer } from "@Pimcore/modules/element/listing/abstract/listing-container";
import { ListingBuilder } from "@Pimcore/modules/element/listing/abstract/builder/listing-builder";
import { ActionColumnDecorator, ClassDefinitionSelectionDecorator, ClassDefinitionSelectionDecoratorConfig, ColumnConfigurationDecorator, ContextMenuDecorator, GeneralFiltersDecorator, InlineEditDecorator, IRowSelectionDecoratorConfig, PagingDecorator, RowSelectionDecorator, SortingDecorator, TagFilterDecorator, useInlineEditApiUpdate } from "@sdk/modules/data-object";
import { IInlineEditDecoratorConfig, IInlineEditDecoratorProps } from "@Pimcore/modules/element/listing/decorators/inline-edit/inline-edit-decorator";
import { DynamicTypeDecorator } from "@Pimcore/modules/data-object/listing/decorator/dynamic-type/dynamic-type-decorator";

moduleSystem.registerModule({
  onInit: () => {
    const componentRegistry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])

    componentRegistry.register({
      name: componentConfig.dataObject.listing.component.name,
      component: ListingContainer,
    })

    const listingBuilder = container.get<ListingBuilder>(serviceIds['DataObject/Listing/Builder'])

    listingBuilder.addDecorator({
      name: 'actionColumn',
      decorator: ActionColumnDecorator,
    })

    listingBuilder.addDecorator({
      name: 'sorting',
      decorator: SortingDecorator
    })

    listingBuilder.addDecorator({
      name: 'paging',
      decorator: PagingDecorator
    })
    
    listingBuilder.addDecorator({
      name: 'classDefinitionSelection',
      decorator: ClassDefinitionSelectionDecorator,
      config: { showConfigLayer: true } as ClassDefinitionSelectionDecoratorConfig
    })

    listingBuilder.addDecorator({
      name: 'columnConfiguration',
      decorator: ColumnConfigurationDecorator
    })

    listingBuilder.addDecorator({
      name: 'inlineEdit',
      decorator: InlineEditDecorator,
      config: { useInlineEditApiUpdate } as IInlineEditDecoratorConfig,
    })

    listingBuilder.addDecorator({
      name: 'rowSelection',
      decorator: RowSelectionDecorator,
      config: { rowSelectionMode: 'multiple' } as IRowSelectionDecoratorConfig
    })

    listingBuilder.addDecorator({
      name: 'contextMenu',
      decorator: ContextMenuDecorator
    })

    listingBuilder.addDecorator({
      name: 'tagFilter',
      decorator: TagFilterDecorator
    })

    listingBuilder.addDecorator({
      name: 'generalFilters',
      decorator: GeneralFiltersDecorator
    })

    listingBuilder.addDecorator({
      name: 'dynamicType',
      decorator: DynamicTypeDecorator
    })
  }
})
