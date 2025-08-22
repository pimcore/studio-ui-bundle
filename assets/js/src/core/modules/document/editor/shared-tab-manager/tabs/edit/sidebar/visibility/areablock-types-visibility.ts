/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { selectDocumentHasAreablocks } from '@Pimcore/modules/document/document-editor-slice'
import { store } from '@Pimcore/app/store'
import { type IDocumentContext } from '@Pimcore/modules/document/document-provider'

/**
 * Checks if areablock types should be visible in the sidebar.
 * This function takes a document context parameter since visibility functions
 * are called from the sidebar manager which doesn't have React context access.
 */
export const checkAreablockTypesVisibility = (context: IDocumentContext): boolean => {
  try {
    // Get the state from Redux store
    const state = store.getState()
    return selectDocumentHasAreablocks(state, context.id)
  } catch (error) {
    console.warn('Could not check areablock types visibility:', error)
    return false
  }
}
