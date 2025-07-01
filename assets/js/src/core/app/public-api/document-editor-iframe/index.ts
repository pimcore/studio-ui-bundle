/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { documentEditableApi, type DocumentEditableApi } from './editable-data/editable-data'

export interface PublicApiDocumentEditorIframe {
  documentEditable: DocumentEditableApi
}

export const PimcoreDocumentEditor: PublicApiDocumentEditorIframe = {
  documentEditable: documentEditableApi
}
