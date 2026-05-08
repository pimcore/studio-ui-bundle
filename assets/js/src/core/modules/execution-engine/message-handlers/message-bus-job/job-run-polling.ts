/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { store } from '@Pimcore/app/store'
import { api } from '@Pimcore/modules/execution-engine/execution-engine-api-slice-enhanced'
import { isNil } from 'lodash'
import { type JobRun } from '@Pimcore/modules/execution-engine/execution-engine-api-slice.gen'
import { ExponentialBackoff } from '@Pimcore/utils/exponential-backoff'
import { JobStatus } from '@Pimcore/modules/execution-engine/jobs/abstact-job'

const COMPLETION_STATES = ['finished', 'finished_with_errors', 'failed']

export interface JobRunPollingCallbacks {
  onStatusUpdate: (data: JobStatusUpdateData) => void | Promise<void>
  onError?: (error: Error) => void
}

export interface JobStatusUpdateData {
  status: string
  currentStep?: number | null
  totalSteps?: number | null
  currentMessage?: string
  jobRun: JobRun
}

/**
 * Handles polling for job run status when Mercure updates are not received
 * Automatically polls the API after a timeout period of no updates
 */
export class JobRunPolling {
  private readonly jobRunId: string | number
  private readonly callbacks: JobRunPollingCallbacks
  private isPolling: boolean = false
  private isDestroyed: boolean = false
  private lastJobSnapshot: JobRunSnapshot | null = null
  private readonly pollingBackoff: ExponentialBackoff

  constructor (jobRunId: string | number, callbacks: JobRunPollingCallbacks) {
    this.jobRunId = jobRunId
    this.callbacks = callbacks
    this.pollingBackoff = new ExponentialBackoff({
      initialDelay: 10000,
      maxDelay: 300000,
      multiplier: 1.25
    })
  }

  public start (): void {
    if (!this.isDestroyed) {
      this.schedulePolling()
    }
  }

  public notifyUpdate (): void {
    if (this.isDestroyed) {
      return
    }

    this.stopPolling()
    this.schedulePolling()
  }

  public destroy (): void {
    this.isDestroyed = true
    this.stopPolling()
  }

  private schedulePolling (): void {
    this.pollingBackoff.schedule(() => {
      this.startPolling()
    })
  }

  private startPolling (): void {
    if (this.isPolling || this.isDestroyed) {
      return
    }

    this.isPolling = true
    this.lastJobSnapshot = null
    void this.pollJobStatus()
  }

  private scheduleNextPoll (): void {
    this.pollingBackoff.schedule(() => {
      void this.pollJobStatus()
    })
  }

  private hasJobChanged (currentSnapshot: JobRunSnapshot): boolean {
    return isNil(this.lastJobSnapshot) ||
      this.lastJobSnapshot.state !== currentSnapshot.state ||
      this.lastJobSnapshot.currentStep !== currentSnapshot.currentStep ||
      this.lastJobSnapshot.totalSteps !== currentSnapshot.totalSteps ||
      this.lastJobSnapshot.currentMessage !== currentSnapshot.currentMessage ||
      this.lastJobSnapshot.modificationDate !== currentSnapshot.modificationDate
  }

  private stopPolling (): void {
    this.pollingBackoff.clear()
    this.isPolling = false
    this.lastJobSnapshot = null
  }

  private createSnapshot (jobRun: JobRun): JobRunSnapshot {
    return {
      state: jobRun.state,
      currentStep: jobRun.currentStep ?? null,
      totalSteps: jobRun.totalSteps ?? null,
      currentMessage: jobRun.currentMessage,
      modificationDate: jobRun.modificationDate
    }
  }

  private async pollJobStatus (): Promise<void> {
    if (this.isDestroyed) {
      this.stopPolling()
      return
    }

    try {
      const { data } = await store.dispatch(
        api.endpoints.executionEngineListJobs.initiate(
          {
            body: {
              filters: {
                page: 1,
                pageSize: 1,
                columnFilters: [
                  {
                    type: 'id',
                    filterValue: Number(this.jobRunId)
                  }
                ]
              }
            }
          },
          { forceRefetch: true }
        )
      )

      if (!isNil(data)) {
        const jobRun = data.items[0]

        if (!isNil(jobRun)) {
          const currentSnapshot = this.createSnapshot(jobRun)
          const hasChanged = this.hasJobChanged(currentSnapshot)

          if (hasChanged) {
            this.pollingBackoff.reset()
          } else if (jobRun.state !== JobStatus.QUEUED) {
            this.pollingBackoff.increase()
          }

          this.lastJobSnapshot = currentSnapshot

          const effectiveStatus = jobRun.currentStep === 0 ? JobStatus.QUEUED : jobRun.state

          await this.callbacks.onStatusUpdate({
            status: effectiveStatus,
            currentStep: jobRun.currentStep,
            totalSteps: jobRun.totalSteps,
            currentMessage: jobRun.currentMessage,
            jobRun
          })

          if (COMPLETION_STATES.includes(jobRun.state)) {
            this.stopPolling()
            return
          }

          this.scheduleNextPoll()
        } else {
          this.stopPolling()
        }
      } else {
        this.pollingBackoff.increase()
        this.scheduleNextPoll()
      }
    } catch (error) {
      this.callbacks.onError?.(error as Error) ?? console.error('Error polling job run status:', error)
      this.scheduleNextPoll()
    }
  }
}

interface JobRunSnapshot {
  state: string
  currentStep: number | null
  totalSteps: number | null
  currentMessage?: string
  modificationDate: number | null
}
