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
import { modalApi } from '@Pimcore/app/public-api/modal/modal-api'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { type ExecutionEngine } from '@Pimcore/modules/execution-engine/services/execution-engine'
import { t } from 'i18next'
import { IndexSyncJob } from '@Pimcore/modules/execution-engine/jobs/index-sync/index-sync-job'

export const startIndexSync = async (): Promise<void> => {
  const executionEngine = container.get<ExecutionEngine>(serviceIds.executionEngine)

  try {
    await executionEngine.runJob(new IndexSyncJob())
  } catch (error) {
    trackError(new GeneralError('Failed to start the search index synchronization'))
  }
}

export const confirmIndexSync = (): void => {
  modalApi.confirm({
    title: t('index-sync.confirmation.title'),
    content: t('index-sync.confirmation.text'),
    okText: t('index-sync.confirmation.ok'),
    onOk: startIndexSync
  })
}
