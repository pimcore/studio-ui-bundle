/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect } from 'react'
import { startDocumentCloneJob, type DocumentCloneJobConfig } from './start-document-clone-job'

export interface DocumentCloneBackgroundProcessorConfig extends DocumentCloneJobConfig {
  // Additional config properties if needed
}

/**
 * React hook to start and manage document clone background processing
 */
export const useDocumentCloneBackgroundProcessor = (config: DocumentCloneBackgroundProcessorConfig): void => {
  useEffect(() => {
    if (!config) {
      return
    }

    const startJob = async (): Promise<void> => {
      try {
        await startDocumentCloneJob(config)
      } catch (error) {
        console.error('Failed to start document clone job:', error)
      }
    }

    startJob().catch(console.error)
  }, [config.sourceId, config.targetId, config.parentFolder, config.isReplace])
}
