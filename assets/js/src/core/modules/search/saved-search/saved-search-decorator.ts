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
import { withSavedSearchSidebarEntry } from './view-layer/with-saved-search-sidebar-entry'

/** Adds the "Save Search" sidebar entry. Asset + Data Object listings only — not "All"/Documents, which have no saveable grid state. */
export const SavedSearchDecorator: AbstractDecorator = (props) => {
  const { useSidebarOptions, ...defaultProps } = props

  const newProps: AbstractDecoratorProps = {
    ...defaultProps,
    useSidebarOptions: withSavedSearchSidebarEntry(useSidebarOptions)
  }

  return newProps
}
