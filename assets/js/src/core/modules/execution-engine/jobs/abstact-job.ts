/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type NonEmptyArray } from 'types/non-empty-array'
import { type topics } from '../topics'

export enum JobStatus {
  QUEUED = 'queued',
  RUNNING = 'running',
  SUCCESS = 'success',
  FINISHED_WITH_ERRORS = 'finished_with_errors',
  FAILED = 'failed',
}

export interface AbstractJob {
  id: number
  action: () => Promise<number>
  type: string
  title: string
  status: JobStatus
  topics: NonEmptyArray<(typeof topics)[string]>
  config: unknown
}
