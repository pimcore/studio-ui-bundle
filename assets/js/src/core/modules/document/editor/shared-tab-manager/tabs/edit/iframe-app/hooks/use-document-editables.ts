/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type DocumentEditableApi } from '@Pimcore/app/public-api/document-editor-iframe/editable-data/editable-data'

export const useDocumentEditables = (): DocumentEditableApi => {
  const documentEditableApi = window.PimcoreDocumentEditor?.documentEditable

  if (documentEditableApi === null || documentEditableApi === undefined) {
    throw new Error('Document editable API is not available')
  }

  return documentEditableApi
}
