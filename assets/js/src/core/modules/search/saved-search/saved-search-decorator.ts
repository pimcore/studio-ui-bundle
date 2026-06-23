/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AbstractDecorator, type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { withSavedSearchSidebarEntry } from './view-layer/with-saved-search-sidebar-entry'

export interface SavedSearchDecoratorConfig {
  elementType: ElementType
  /**
   * When true (the Quick Search typed tabs) the panel supports loading an existing saved search
   * for update/clone. In the regular editor grids it stays false — saving is always "save as new".
   */
  supportsLoadedState?: boolean
}

/**
 * Adds the "Save Search" sidebar entry. Asset + Data Object listings only — not "All"/Documents, which have no saveable grid state.
 */
export const SavedSearchDecorator: AbstractDecorator<SavedSearchDecoratorConfig> = (props, config) => {
  const { useSidebarOptions, ...defaultProps } = props

  const newProps: AbstractDecoratorProps = {
    ...defaultProps,
    useSidebarOptions: withSavedSearchSidebarEntry(useSidebarOptions, {
      elementType: config?.elementType,
      supportsLoadedState: config?.supportsLoadedState ?? false
    })
  }

  return newProps
}
