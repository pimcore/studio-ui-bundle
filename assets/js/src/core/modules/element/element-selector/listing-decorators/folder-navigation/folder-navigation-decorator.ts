/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */


import { type AbstractDecorator } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { withFolderNavigationContext } from './context-layer/with-folder-navigation-context'
import { withFolderNavigationQueryArg } from './data-layer/with-folder-navigation-query-arg'
import { withFolderNavigationEntry } from './view-layer/components/sidebar/hooks/with-folder-navigation-entry'

export interface FolderNavigationDecoratorConfig {
  elementType: ElementType
}

/**
 * Lets the element selector (asset/document/data-object relation field pickers, and the
 * toolbar's Search menu) be scoped to a folder the user navigates to via a "Folders"
 * sidebar tab, instead of always searching from the root (PEES-1975). Must be composed
 * after GeneralFiltersDecorator so its PQL filter (if any) is combined, not overwritten.
 */
export const FolderNavigationDecorator: AbstractDecorator<FolderNavigationDecoratorConfig> = (props, config) => {
  const { ContextComponent, useSidebarOptions, useDataQueryHelper, ...baseProps } = props

  const newProps = {
    ...baseProps,
    ContextComponent: withFolderNavigationContext(ContextComponent),
    useSidebarOptions: withFolderNavigationEntry(useSidebarOptions, config!),
    useDataQueryHelper: withFolderNavigationQueryArg(useDataQueryHelper)
  }

  return newProps
}
