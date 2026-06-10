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
  /**
   * Unmounts the iframe's React application. Called by the parent window when the
   * document tab is closed so that all effect cleanups run (observers disconnected,
   * timers cleared, listeners removed), allowing the browser to reclaim the iframe's
   * realm instead of retaining it. Wired up in mf-bootstrap-document-editor-iframe.
   */
  unmount: () => void
}

export const PimcoreDocumentEditor: PublicApiDocumentEditorIframe = {
  documentEditable: documentEditableApi,
  unmount: () => {}
}
