/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { AbstractBackgroundJobHandler } from './abstract-background-job-handler'

export abstract class AbstractJobRunIdHandler extends AbstractBackgroundJobHandler {
  protected readonly jobRunId: string | number

  constructor(jobRunId: string | number) {
    super()
    this.jobRunId = jobRunId
  }

  public shouldHandle(message: any): boolean {
    // Check if message contains jobRunId that matches this handler
    const messageJobRunId = message.payload?.jobRunId
    return messageJobRunId !== undefined && messageJobRunId === this.jobRunId
  }

  public getId(): string | number {
    return this.jobRunId
  }

  /**
   * Process the message - to be implemented by concrete handlers
   */
  abstract handleMessage(message: any): void
}
