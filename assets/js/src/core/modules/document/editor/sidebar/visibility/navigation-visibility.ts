/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type IDocumentContext } from '@Pimcore/modules/document/document-provider'
import { checkDocumentPermission } from './document-permission-helper'

/**
 * Checks if navigation should be visible based on document permissions.
 * This function takes a document context parameter since visibility functions
 * are called from the sidebar manager which doesn't have React context access.
 */
export const checkNavigationVisibility = (context: IDocumentContext): boolean => {
  return checkDocumentPermission(context, 'properties')
}
