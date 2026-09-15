---
title: How to Run a Background Job
---

# How to Run a Background Job

## Overview
Start a long-running operation from your plugin, show it in the running-jobs panel with progress, retry and error details, and keep it there across page reloads.

## Details
Pimcore Studio runs long operations through the Generic Execution Engine. The frontend never polls your endpoint: the backend publishes progress and the terminal state over Mercure to the user's private topic, and the `execution-engine` module renders those updates in the jobs panel. Both sides have to follow a small contract.

### Backend
- Start the job with `JobExecutionAgentInterface::startJobExecution($job, $userId, Config::CONTEXT_CONTINUE_ON_ERROR->value)` (or `CONTEXT_STOP_ON_ERROR`). Only runs in one of these two Studio execution contexts, owned by the current user, are listed by the running-jobs endpoint and can be rehydrated after a reload.
- Return the run id from your controller as `201 { "jobRunId": <int> }`.
- Publish progress from your step handlers with `HandlerProgressTrait::updateProgress()`.
- Add a `JobRunStateChangedEvent` subscriber filtered on your job name that publishes `Finished` to `UserTopicServiceInterface::getUserTopic($ownerId)` for `FINISHED`, and calls `EventSubscriberServiceInterface::handleFinishedWithErrors()` for `FINISHED_WITH_ERRORS`. `FAILED` is already published by Studio's `FailureSubscriber` for the two Studio contexts.

### Frontend
- Implement `JobInterface`. Declare `static readonly jobNames` with your backend job name(s) and `static rehydrate(jobRuns)`; both `run()` and `rehydrate()` build the same `MessageBusJobHandler`.
- Register the class in your module's `onInit()` on the `JobRehydrationRegistry` service. `ExecutionEngine.runJob()` throws for a job whose names are not registered.
- Run it with `useExecutionEngine().runJob(new MyJob(...))`. `runJob()` resolves once the request is dispatched and the handler registered, not when the job ends; put completion side effects in `onJobCompletion`.
- Pick the progress calculator that matches what the backend publishes: `StepCompletionCalculator` when each step completes as a unit, `BatchedStepProgressCalculator` when equally weighted steps each stream 0–100, `ProgressFieldCalculator` when a single `progress` field streams 0–100. A custom calculator returns a number, `null` (indeterminate) or `PROGRESS_NO_UPDATE`.

```typescript
import { t } from 'i18next'
import { store } from '@pimcore/studio-ui-bundle/app'
import {
  MessageBusJobHandler,
  StepCompletionCalculator,
  type JobCompletionData,
  type JobInterface,
  type JobRunList,
  type JobRunOptions,
  type RehydratableJob
} from '@pimcore/studio-ui-bundle/modules/execution-engine'
import { api } from '../my-api-slice-enhanced'

export class MyJob implements JobInterface {
  static readonly jobNames = ['my_bundle_job'] as const

  static rehydrate ([jobRun]: JobRunList): MessageBusJobHandler {
    return MyJob.buildHandler({ jobRunId: jobRun.id })
  }

  private static buildHandler (options: { jobRunId: number, onRetry?: () => Promise<void> }): MessageBusJobHandler {
    return new MessageBusJobHandler({
      jobRunId: options.jobRunId,
      title: t('my-bundle.job-title'),
      progressCalculator: new StepCompletionCalculator(),
      onRetry: options.onRetry,
      onJobCompletion: async (data: JobCompletionData): Promise<void> => {
        if (data.isFinished) {
          store.dispatch(api.util.invalidateTags(['MyData']))
        }
      }
    })
  }

  async run (options: JobRunOptions): Promise<void> {
    const response = await store.dispatch(api.endpoints.myBundleStartJob.initiate({}))
    const jobRunId = response.data?.jobRunId

    if (jobRunId === undefined) {
      return
    }

    options.messageBus.registerHandler(MyJob.buildHandler({
      jobRunId,
      onRetry: async () => { await this.run(options) }
    }))
  }
}

void (MyJob satisfies RehydratableJob)
```

```typescript
// in your module's onInit()
import { container } from '@pimcore/studio-ui-bundle'
import { serviceIds } from '@pimcore/studio-ui-bundle/app'
import { type JobRehydrationRegistry } from '@pimcore/studio-ui-bundle/modules/execution-engine'

container
  .get<JobRehydrationRegistry>(serviceIds['ExecutionEngine/JobRehydrationRegistry'])
  .register(MyJob)
```

## Code Example on GitHub
> A complete in-repo example is the bulk import job: [bulk-import-job.ts](https://github.com/pimcore/studio-ui-bundle/blob/2026.x/assets/js/src/core/modules/bulk-import/jobs/bulk-import-job.ts), registered in [bulk-import/index.ts](https://github.com/pimcore/studio-ui-bundle/blob/2026.x/assets/js/src/core/modules/bulk-import/index.ts).
