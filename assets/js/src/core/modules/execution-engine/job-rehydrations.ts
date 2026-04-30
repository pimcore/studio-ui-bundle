/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { t } from 'i18next'
import { store } from '@Pimcore/app/store'
import { MessageBusJobHandler } from './message-handlers/message-bus-job/message-bus-job-handler'
import { ChildJobStepTracker } from './message-handlers/message-bus-job/step-tracker/child-job-step-tracker'
import { DefaultStepTracker } from './message-handlers/message-bus-job/step-tracker/default-step-tracker'
import { ProgressFieldCalculator } from './message-handlers/message-bus-job/progress-calculator/progress-field-calculator'
import { StepCompletionCalculator } from './message-handlers/message-bus-job/progress-calculator/step-completion-calculator'
import { type JobRun } from './execution-engine-api-slice.gen'
import { type JobRehydrationRegistry } from './services/job-rehydration-registry'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { api } from '@Pimcore/app/api/pimcore'
import { refreshTreeByElementType } from '@Pimcore/components/element-tree/element-tree-slice'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { type JobButtonCustomizationContext } from './message-handlers/message-bus-job/message-bus-job-notification'

export function registerAllJobRehydrations (registry: JobRehydrationRegistry): void {
  // Single-element delete
  registry.register(
    ['studio_ee_job_delete_assets', 'studio_ee_job_delete_data_objects', 'studio_ee_job_delete_documents'],
    (parent: JobRun) => new MessageBusJobHandler({
      jobRunId: parent.id,
      title: t('jobs.delete-job.title'),
      progressCalculator: new StepCompletionCalculator()
    })
  )

  // Batch delete
  registry.register(
    ['studio_ee_job_batch_delete_assets', 'studio_ee_job_batch_delete_data_objects'],
    (parent: JobRun) => new MessageBusJobHandler({
      jobRunId: parent.id,
      title: t('jobs.batch-delete-job.title'),
      progressCalculator: new StepCompletionCalculator()
    })
  )

  // Clone (may have child job)
  registry.register(
    ['studio_ee_job_clone_assets', 'studio_ee_job_clone_data_objects', 'studio_ee_job_clone_documents'],
    (parent: JobRun, child?: JobRun) => {
      const isChild = child !== undefined
      return new MessageBusJobHandler({
        jobRunId: child?.id ?? parent.id,
        ancestorJobRunIds: isChild ? [parent.id] : undefined,
        title: t('jobs.clone-job.title'),
        stepTracker: new ChildJobStepTracker({ startAtStep: isChild ? 2 : 1 }),
        progressCalculator: new StepCompletionCalculator()
      })
    }
  )

  // Batch edit (patch elements / rewrite references)
  registry.register(
    ['studio_ee_job_patch_elements', 'studio_ee_job_rewrite_element_references'],
    (parent: JobRun) => new MessageBusJobHandler({
      jobRunId: parent.id,
      title: t('jobs.batch-edit-job.title')
    })
  )

  // ZIP upload (two-step: extract → create assets)
  registry.register(
    ['studio_ee_job_upload_zip_file'],
    (parent: JobRun, child?: JobRun) => {
      const isChild = child !== undefined
      return new MessageBusJobHandler({
        jobRunId: child?.id ?? parent.id,
        ancestorJobRunIds: isChild ? [parent.id] : undefined,
        title: isChild ? t('jobs.zip-upload-job.step2.title') : t('jobs.zip-upload-job.step1.title'),
        stepTracker: new ChildJobStepTracker({ totalSteps: 2, startAtStep: isChild ? 2 : 1 }),
        progressCalculator: new ProgressFieldCalculator()
      })
    }
  )

  // Download: selected-row CSV/XLSX (no child job)
  registry.register(
    ['studio_ee_job_create_csv', 'studio_ee_job_create_xlsx'],
    (parent: JobRun) => {
      const downloadUrl = parent.jobName === 'studio_ee_job_create_csv'
        ? `${getPrefix()}/export/download/csv/{jobRunId}`
        : `${getPrefix()}/export/download/xlsx/{jobRunId}`

      return new MessageBusJobHandler({
        jobRunId: parent.id,
        title: t('jobs.download-job.title'),
        stepTracker: new DefaultStepTracker(),
        progressCalculator: new ProgressFieldCalculator(),
        onCustomizeButtons: buildDownloadButton(downloadUrl)
      })
    }
  )

  // Download: ZIP (no child job)
  registry.register(
    ['studio_ee_job_create_download_zip'],
    (parent: JobRun) => new MessageBusJobHandler({
      jobRunId: parent.id,
      title: t('jobs.download-job.title'),
      stepTracker: new DefaultStepTracker(),
      progressCalculator: new ProgressFieldCalculator(),
      onCustomizeButtons: buildDownloadButton(`${getPrefix()}/assets/download/zip/{jobRunId}`)
    })
  )

  // Folder export: collect step transitions to a CSV/XLSX child
  registry.register(
    ['studio_ee_job_collect_folder_export_elements'],
    (parent: JobRun, child?: JobRun) => {
      const isChild = child !== undefined
      const childJobName = child?.jobName ?? ''
      let downloadUrl: string | undefined
      if (childJobName === 'studio_ee_job_create_csv') {
        downloadUrl = `${getPrefix()}/export/download/csv/{jobRunId}`
      } else if (childJobName === 'studio_ee_job_create_xlsx') {
        downloadUrl = `${getPrefix()}/export/download/xlsx/{jobRunId}`
      }

      return new MessageBusJobHandler({
        jobRunId: child?.id ?? parent.id,
        ancestorJobRunIds: isChild ? [parent.id] : undefined,
        title: t('jobs.download-job.title'),
        stepTracker: new ChildJobStepTracker({ totalSteps: 2, startAtStep: isChild ? 2 : 1 }),
        progressCalculator: new ProgressFieldCalculator(),
        ...(downloadUrl !== undefined && { onCustomizeButtons: buildDownloadButton(downloadUrl) })
      })
    }
  )

  // Recycle bin restore
  registry.register(
    ['studio_ee_job_recycle_bin_restore'],
    (parent: JobRun) => new MessageBusJobHandler({
      jobRunId: parent.id,
      title: t('jobs.recycle-bin-restore-job.title'),
      onJobCompletion: async (data) => {
        if (data.isFinished) {
          store.dispatch(refreshTreeByElementType({ elementTypes: ['asset', 'data-object', 'document'] }))
          store.dispatch(api.util.invalidateTags(invalidatingTags.RECYCLING_BIN()))
        }
      }
    })
  )

  // Recycle bin delete
  registry.register(
    ['studio_ee_job_recycle_bin_delete'],
    (parent: JobRun) => new MessageBusJobHandler({
      jobRunId: parent.id,
      title: t('jobs.recycle-bin-delete-job.title'),
      onJobCompletion: async (data) => {
        if (data.isFinished) {
          store.dispatch(api.util.invalidateTags(invalidatingTags.RECYCLING_BIN()))
        }
      }
    })
  )

  // Tag assign/replace
  registry.register(
    ['studio_ee_job_batch_tag_assign', 'studio_ee_job_batch_tag_replace'],
    (parent: JobRun) => new MessageBusJobHandler({
      jobRunId: parent.id,
      title: t('jobs.tag-assign-job.title')
    })
  )

  // Search and replace assignments
  registry.register(
    ['studio_ee_job_element_usage_replace'],
    (parent: JobRun) => new MessageBusJobHandler({
      jobRunId: parent.id,
      title: t('jobs.search-replace-assignments-job.title')
    })
  )
}

function buildDownloadButton (downloadUrl: string): (context: JobButtonCustomizationContext) => void {
  return (context: JobButtonCustomizationContext) => {
    context.addSuccessButton({
      label: t('jobs.job.button-download'),
      handler: () => {
        const a = document.createElement('a')
        a.href = downloadUrl.replace('{jobRunId}', context.jobRunId.toString())
        a.download = ''
        a.click()
      }
    })
  }
}
