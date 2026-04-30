/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type Loader } from '@Pimcore/modules/app/app-loader/services/app-loader-registry'
import { type ExecutionEngine } from '../services/execution-engine'
import { api } from '../execution-engine-api-slice-enhanced'
import { type JobRun } from '../execution-engine-api-slice.gen'
import { store } from '@Pimcore/app/store'

export const rehydrateJobsLoader: Loader = {
  name: 'rehydrate-running-jobs',

  async onLoad (): Promise<void> {
    const { data } = await store.dispatch(
      api.endpoints.executionEngineListJobs.initiate(
        { body: { filters: { page: 1, pageSize: 200, sortFilter: { key: 'id', direction: 'desc' } } } },
        { forceRefetch: true }
      )
    )
    const items: JobRun[] = data?.items ?? []

    const executionEngine = container.get<ExecutionEngine>(serviceIds.executionEngine)
    executionEngine.rehydrateRunningJobs(items)
  }
}
