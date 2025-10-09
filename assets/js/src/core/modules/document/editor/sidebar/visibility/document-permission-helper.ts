/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { store } from '@Pimcore/app/store'
import { type IDocumentContext } from '@Pimcore/modules/document/document-provider'
import { selectDocumentById } from '@Pimcore/modules/document/document-draft-slice'
import { checkElementPermission, type ElementPermissionKeys } from '@Pimcore/modules/element/permissions/permission-helper'
import { isNil } from 'lodash'

/**
 * Generic utility function to check document permissions for sidebar visibility.
 * This function takes a document context parameter since visibility functions
 * are called from the sidebar manager which doesn't have React context access.
 *
 * @param context - The document context containing the document ID
 * @param permission - The permission key to check (e.g., 'settings', 'properties', 'view', etc.)
 * @returns boolean indicating whether the user has the specified permission for the document
 */
export const checkDocumentPermission = (context: IDocumentContext, permission: ElementPermissionKeys): boolean => {
  try {
    const state = store.getState()
    const document = selectDocumentById(state, context.id)

    if (isNil(document?.permissions)) {
      return false
    }

    return checkElementPermission(document.permissions, permission)
  } catch (error) {
    console.warn(`Could not check document permission '${permission}':`, error)
    return false
  }
}
