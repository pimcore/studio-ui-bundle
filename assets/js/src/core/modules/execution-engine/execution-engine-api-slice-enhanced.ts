/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { api } from './execution-engine-api-slice.gen'

api.enhanceEndpoints({
  endpoints: {
    executionEngineAbortJobRunById: {
      invalidatesTags: []
    },
    executionEngineHideJobRuns: {
      invalidatesTags: []
    },
    executionEngineListJobs: {
      providesTags: []
    }
  }
})

export const {
  useExecutionEngineAbortJobRunByIdMutation,
  useExecutionEngineHideJobRunsMutation,
  useExecutionEngineListJobsQuery
} = api

export { api }
export type * from './execution-engine-api-slice.gen'
