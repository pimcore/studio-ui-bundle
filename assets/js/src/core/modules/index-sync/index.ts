/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { container } from '@Pimcore/app/depency-injection'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { type JobRehydrationRegistry } from '@Pimcore/modules/execution-engine/services/job-rehydration-registry'
import { IndexSyncJob } from '@Pimcore/modules/execution-engine/jobs/index-sync/index-sync-job'
import { type MainNavRegistry } from '@sdk/modules/app'
import { UserPermission } from '@sdk/modules/auth'
import { useTranslation } from 'react-i18next'
import { startIndexSync } from './index-sync-actions'

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'System/IndexSync',
      label: 'navigation.index-sync',
      order: 600,
      permission: UserPermission.SystemSettings,
      useCustomMainNavItem: () => {
        const { t } = useTranslation()
        const modal = useFormModal()

        return {
          name: 'IndexSync',
          onClick: () => {
            modal.confirm({
              title: t('index-sync.confirmation.title'),
              content: t('index-sync.confirmation.text'),
              okText: t('index-sync.confirmation.ok'),
              onOk: startIndexSync
            })
          }
        }
      }
    })

    const rehydrationRegistry = container.get<JobRehydrationRegistry>(
      serviceIds['ExecutionEngine/JobRehydrationRegistry']
    )
    rehydrationRegistry.register(IndexSyncJob)
  }
})
