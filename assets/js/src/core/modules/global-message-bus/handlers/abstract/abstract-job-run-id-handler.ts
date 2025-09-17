/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { AbstractMessageHandler } from './abstract-message-handler'
import { type AbstractMercureMessage } from '../../../background-processor/process/abstract-mercure-process'

export abstract class AbstractJobRunIdHandler extends AbstractMessageHandler {
  protected readonly jobRunId: string | number

  constructor (jobRunId: string | number) {
    super()
    this.jobRunId = jobRunId
  }

  public shouldHandle (message: AbstractMercureMessage): boolean {
    const messageJobRunId = (message.payload as any)?.jobRunId
    return messageJobRunId !== undefined && messageJobRunId === this.jobRunId
  }

  public getId (): string | number {
    return this.jobRunId
  }
}
