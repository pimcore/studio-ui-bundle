/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { container } from '@Pimcore/app/depency-injection'
import { type DocumentSidebarManager } from './document-sidebar-manager'

/**
 * Gets the service ID for a document sidebar manager based on document type
 */
export const getSidebarManagerServiceId = (documentType: string): string => {
  const capitalizedType = documentType.charAt(0).toUpperCase() + documentType.slice(1)
  return `Document/Editor/Sidebar/${capitalizedType}SidebarManager`
}

/**
 * Gets the document sidebar manager for a specific document type
 */
export const getDocumentSidebarManager = (documentType?: string): DocumentSidebarManager => {
  return container.get<DocumentSidebarManager>(
    getSidebarManagerServiceId(documentType ?? 'page')
  )
}
