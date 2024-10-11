/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
