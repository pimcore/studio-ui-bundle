/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type JobRunList } from '../services/job-rehydration-registry'

export function resolveChildJobRunOptions (jobRuns: JobRunList): {
  jobRunId: number
  ancestorJobRunIds: number[] | undefined
  startAtStep: number
} {
  const [parent, child] = jobRuns
  const isChild = child !== undefined
  return {
    jobRunId: child?.id ?? parent.id,
    ancestorJobRunIds: isChild ? [parent.id] : undefined,
    startAtStep: isChild ? 2 : 1
  }
}
