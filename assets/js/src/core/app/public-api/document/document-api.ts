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
import { markDocumentEditablesAsModified } from '@Pimcore/modules/document/document-draft-slice'

export interface DocumentApi {
  markDraftAsModified: (documentId: number) => void
}

class DocumentApiImpl implements DocumentApi {
  markDraftAsModified (documentId: number): void {
    store.dispatch(markDocumentEditablesAsModified(documentId))
  }
}

export const documentApi = new DocumentApiImpl()