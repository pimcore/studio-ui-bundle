/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * Creates a debounce tag for document-specific form operations.
 * This tag is used to group and flush debounced form changes by document.
 *
 * @param documentId - The unique identifier of the document
 * @returns A standardized tag string for document form debouncing
 */
export const createDocumentDebounceTag = (documentId: number): string => {
  return `document-${documentId}`
}
