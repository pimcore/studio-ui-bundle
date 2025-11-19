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
import { ColumnConfigurationDecorator } from './decorator/column-configuration/column-configuration-decorator'
import { type IRowSelectionDecoratorConfig, RowSelectionDecorator } from '@Pimcore/modules/element/listing/decorators/row-selection/row-selection-decorator'
import { type IInlineEditDecoratorConfig, InlineEditDecorator } from '@Pimcore/modules/element/listing/decorators/inline-edit/inline-edit-decorator'
import { ActionColumnDecorator } from './decorator/action-column/action-column-decorator'
import { ContextMenuDecorator } from './decorator/context-menu/context-menu-decorator'
import { SortingDecorator } from '@Pimcore/modules/element/listing/decorators/sorting/sorting-decorator'
import { TagFilterDecorator } from './decorator/tag-filter/tag-filter-decorator'
import { GeneralFiltersDecorator } from '../../element/listing/decorators/general-filters/general-filters-decorator'
import { GlobalContextDecorator } from '@Pimcore/modules/element/listing/decorators/global-context/global-context-decorator'
import { PagingDecorator } from '@Pimcore/modules/element/listing/decorators/paging/paging-decorator'
import { useInlineEditApiUpdate } from './decorator/inline-editing/hooks/use-inline-edit-api-update'
import { DynamicTypeDecorator } from '@Pimcore/modules/asset/listing/decorator/dynamic-type/dynamic-type-decorator'
import { type AssetListingBuilder } from '@Pimcore/modules/asset/listing/builder/asset-listing-builder'
import { ToolbarRight } from '@Pimcore/modules/asset/listing/toolbar/toolbar-right'
import { ToolbarLeft } from '@Pimcore/modules/asset/listing/toolbar/toolbar-left'
import { ToolbarInner } from '@Pimcore/modules/asset/listing/toolbar/toolbar-inner'

moduleSystem.registerModule({
  onInit: () => {
    const componentRegistry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])

    componentRegistry.register({
      name: componentConfig.asset.listing.toolbar.component.name,
      component: ToolbarInner
    })

    componentRegistry.registerToSlot(componentConfig.asset.listing.toolbar.left.name, {
      name: 'batch-actions',
      component: ToolbarLeft
    })

    componentRegistry.registerToSlot(componentConfig.asset.listing.toolbar.right.name, {
      name: 'pagination',
      component: ToolbarRight
    })

    const listingBuilder = container.get<AssetListingBuilder>(serviceIds['Asset/Listing/Builder'])

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
