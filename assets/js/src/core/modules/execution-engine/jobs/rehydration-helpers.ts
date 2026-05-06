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
  const leaf = jobRuns.at(-1)!
  const hasAncestors = jobRuns.length > 1
  return {
    jobRunId: leaf.id,
    ancestorJobRunIds: hasAncestors ? jobRuns.slice(0, -1).map(j => j.id) : undefined,
    startAtStep: jobRuns.length  // 1 for parent-only, 2 for one child, etc.
  }
}
