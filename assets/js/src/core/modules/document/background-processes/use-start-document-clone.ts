/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useDocumentCloneBackgroundProcessor, type DocumentCloneBackgroundProcessorConfig } from './use-document-clone-background-processor'

/**
 * Start a document clone operation in the background
 */
export const useStartDocumentClone = () => {
  return (config: DocumentCloneBackgroundProcessorConfig) => {
    // The hook automatically starts when called with config
    useDocumentCloneBackgroundProcessor(config)
  }
}
