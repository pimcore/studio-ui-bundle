/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type GlobalMessageBus } from '@Pimcore/modules/global-message-bus/services/global-message-bus'

/**
 * Options for running a job
 */
export interface JobRunOptions {
  messageBus: GlobalMessageBus
}

/**
 * Interface for all execution engine jobs
 * Jobs must implement the run method to execute their logic
 */
export interface JobInterface {
  /**
   * Run the complete job execution workflow
   * This is the main entry point for job execution
   */
  run: (options: JobRunOptions) => Promise<void>
}
