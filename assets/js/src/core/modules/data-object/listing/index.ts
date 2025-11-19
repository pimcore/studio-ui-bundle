/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { container } from '@Pimcore/app/depency-injection'
import { componentConfig, type ComponentRegistry } from '@Pimcore/modules/app/component-registry/component-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { ListingContainer } from '@Pimcore/modules/element/listing/abstract/listing-container'
import { type ListingBuilder } from '@Pimcore/modules/element/listing/abstract/builder/listing-builder'
import { ActionColumnDecorator, ClassDefinitionSelectionDecorator, type ClassDefinitionSelectionDecoratorConfig, ColumnConfigurationDecorator, ContextMenuDecorator, GeneralFiltersDecorator, InlineEditDecorator, type IRowSelectionDecoratorConfig, PagingDecorator, RowSelectionDecorator, SortingDecorator, TagFilterDecorator, useInlineEditApiUpdate } from '@sdk/modules/data-object'
import { type IInlineEditDecoratorConfig } from '@Pimcore/modules/element/listing/decorators/inline-edit/inline-edit-decorator'
import { DynamicTypeDecorator } from '@Pimcore/modules/data-object/listing/decorator/dynamic-type/dynamic-type-decorator'
import { GlobalContextDecorator } from '@Pimcore/modules/element/listing/decorators/global-context/global-context-decorator'

moduleSystem.registerModule({
  onInit: () => {
    const componentRegistry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])

    componentRegistry.register({
      name: componentConfig.dataObject.listing.component.name,
      component: ListingContainer
    })

    const listingBuilder = container.get<ListingBuilder>(serviceIds['DataObject/Listing/Builder'])

    listingBuilder.addDecorator({
      name: 'actionColumn',
      decorator: ActionColumnDecorator
    })

    listingBuilder.addDecorator({
      name: 'globalContext',
      decorator: GlobalContextDecorator
    })

    listingBuilder.addDecorator({
      name: 'sorting',
      decorator: SortingDecorator
    })

    listingBuilder.addDecorator({
      name: 'paging',
      decorator: PagingDecorator
    })

    const classDefinitionSelectionDecoratorConfig: ClassDefinitionSelectionDecoratorConfig = {
      showConfigLayer: true
    }

    listingBuilder.addDecorator({
      name: 'classDefinitionSelection',
      decorator: ClassDefinitionSelectionDecorator,
      config: classDefinitionSelectionDecoratorConfig
    })

    listingBuilder.addDecorator({
      name: 'columnConfiguration',
      decorator: ColumnConfigurationDecorator
    })

    const inlineEditDecoratorConfig: IInlineEditDecoratorConfig = {
      useInlineEditApiUpdate
    }

    listingBuilder.addDecorator({
      name: 'inlineEdit',
      decorator: InlineEditDecorator,
      config: inlineEditDecoratorConfig
    })

    const rowSelectionDecoratorConfig: IRowSelectionDecoratorConfig = {
      rowSelectionMode: 'multiple'
    }

    listingBuilder.addDecorator({
      name: 'rowSelection',
      decorator: RowSelectionDecorator,
      config: rowSelectionDecoratorConfig
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
