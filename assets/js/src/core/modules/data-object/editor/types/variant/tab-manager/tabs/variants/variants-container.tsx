/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ListingContainerProps, defaultProps as listingDefaultProps, ListingContainer as BaseListing } from '@Pimcore/modules/element/listing/abstract/listing-container'

import { type IRowSelectionDecoratorConfig, RowSelectionDecorator } from '@Pimcore/modules/element/listing/decorators/row-selection/row-selection-decorator'
import { useElementId } from '@Pimcore/modules/asset/listing/hooks/use-element-id'
import React from 'react'
import { DynamicTypeRegistryProvider } from '@Pimcore/modules/element/dynamic-types/registry/provider/dynamic-type-registry-provider'
import { compose } from '@Pimcore/utils/compose'
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { PagingDecorator } from '@Pimcore/modules/element/listing/decorators/paging/paging-decorator'
import { SortingDecorator } from '@Pimcore/modules/element/listing/decorators/sorting/sorting-decorator'
import { type IInlineEditDecoratorConfig, InlineEditDecorator } from '@Pimcore/modules/element/listing/decorators/inline-edit/inline-edit-decorator'
import { GeneralFiltersDecorator } from '@Pimcore/modules/element/listing/decorators/general-filters/general-filters-decorator'
import { TagFilterDecorator } from '@Pimcore/modules/asset/listing/decorator/tag-filter/tag-filter-decorator'
import { type IEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab'
import { Icon } from '@Pimcore/components/icon/icon'
import { useDataObjectGetGridQuery } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { useDataQueryHelper } from '@Pimcore/modules/data-object/listing/data-layer/hooks/use-data-query-helper'
import { ActionColumnDecorator } from '@Pimcore/modules/data-object/listing/decorator/action-column/action-column-decorator'
import { ClassDefinitionSelectionDecorator, type ClassDefinitionSelectionDecoratorConfig } from '@Pimcore/modules/data-object/listing/decorator/class-definition-selection/class-definition-selection-decorator'
import { ColumnConfigurationDecorator } from '@Pimcore/modules/data-object/listing/decorator/column-configuration/column-configuration-decorator'
import { ContextMenuDecorator } from '@Pimcore/modules/data-object/listing/decorator/context-menu/context-menu-decorator'
import { useInlineEditApiUpdate } from '@Pimcore/modules/data-object/listing/decorator/inline-editing/hooks/use-inline-edit-api-update'
import { TypeFilterDecorator, type TypeFilterDecoratorConfig } from '@Pimcore/modules/element/listing/decorators/type-filter/type-filter-decorator'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { DefaultView } from './views/default-view'

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

export const VariantsContainer = (): React.JSX.Element => {
  const {id} = useElementContext()
  const draft = useDataObjectDraft(id);
  const currentClassName = "className" in draft ? draft.className : undefined

  console.log({currentClassName});

  /* eslint-disable @typescript-eslint/consistent-type-assertions */
  const props = compose<AbstractDecoratorProps>(
    ActionColumnDecorator,
    SortingDecorator,
    PagingDecorator,
    [ClassDefinitionSelectionDecorator, { isResolvingClassDefinitionsBasedOnElementId: false, classRestriction: [{ classes: currentClassName }] } as ClassDefinitionSelectionDecoratorConfig],
    ColumnConfigurationDecorator,
    [InlineEditDecorator, { useInlineEditApiUpdate } as IInlineEditDecoratorConfig],
    [RowSelectionDecorator, { rowSelectionMode: 'multiple' } as IRowSelectionDecoratorConfig],
    ContextMenuDecorator,
    TagFilterDecorator,
    GeneralFiltersDecorator,
    [TypeFilterDecorator, { elementType: 'data-object', restrictedOptions: ['variant'] } as TypeFilterDecoratorConfig]
  )(defaultProps)
  /* eslint-enable @typescript-eslint/consistent-type-assertions */

  return (
    <DynamicTypeRegistryProvider
      serviceIds={ [
        'DynamicTypes/ObjectDataRegistry',
        'DynamicTypes/GridCellRegistry',
        'DynamicTypes/ListingRegistry',
        'DynamicTypes/BatchEditRegistry',
        'DynamicTypes/FieldFilterRegistry'
      ] }
    >
      <BaseListing
        { ...props }
      />
    </DynamicTypeRegistryProvider>
  )
}

export const TAB_VARIANTS: IEditorTab = {
  key: 'variants',
  label: 'data-object.object-editor-tabs.variants',
  icon: <Icon value="data-object-variant" />,
  children: <VariantsContainer />,
  hidden: (elementApi) => !('allowVariants' in elementApi && elementApi?.allowVariants === true)
}
