/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */
import { MessageBusJobHandler } from '@Pimcore/modules/execution-engine/message-handlers/message-bus-job/message-bus-job-handler'
import { ChildJobStepTracker } from '@Pimcore/modules/execution-engine/message-handlers/message-bus-job/step-tracker/child-job-step-tracker'
import { DefaultStepTracker } from '@Pimcore/modules/execution-engine/message-handlers/message-bus-job/step-tracker/default-step-tracker'
import { ProgressFieldCalculator } from '@Pimcore/modules/execution-engine/message-handlers/message-bus-job/progress-calculator/progress-field-calculator'
import { ZipDownloadJob } from '@Pimcore/modules/execution-engine/jobs/download/zip-download-job'
import { CsvDownloadJob } from '@Pimcore/modules/execution-engine/jobs/download/csv-download-job'
import { XlsxDownloadJob } from '@Pimcore/modules/execution-engine/jobs/download/xlsx-download-job'
import { AbstractBatchEditJob } from '@Pimcore/modules/execution-engine/jobs/batch-edit/abstract-batch-edit-job'
import { AbstractFolderBatchEditJob } from '@Pimcore/modules/execution-engine/jobs/batch-edit/abstract-folder-batch-edit-job'
import { ZipUploadJob } from '@Pimcore/modules/execution-engine/jobs/zip-upload/zip-upload-job'
import { type JobRun } from '@Pimcore/modules/execution-engine/execution-engine-api-slice.gen'
import { type JobRunOptions } from '@Pimcore/modules/execution-engine/jobs/job-interface'

jest.mock('@Pimcore/modules/execution-engine/message-handlers/message-bus-job/message-bus-job-handler', () => ({
  MessageBusJobHandler: jest.fn().mockImplementation(() => ({}))
}))
jest.mock('i18next', () => ({ t: (key: string) => key }))
jest.mock('@Pimcore/app/api/pimcore/route', () => ({ getPrefix: () => '' }))
jest.mock('@Pimcore/utils/files', () => ({ downloadFromUrl: jest.fn() }))
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  default: jest.fn(),
  GeneralError: class {} // eslint-disable-line @typescript-eslint/no-extraneous-class
}))

const HandlerMock = MessageBusJobHandler as jest.MockedClass<typeof MessageBusJobHandler>

function jobRun (id: number, jobName: string, state = 'running', jobRunChildId: number | null = null): JobRun {
  return {
    id,
    jobName,
    state,
    jobRunChildId,
    ownerId: null,
    executionContext: '',
    totalElements: 0,
    currentMessage: '',
    currentStep: null,
    totalSteps: null,
    creationDate: null,
    modificationDate: null
  }
}

beforeEach(() => {
  HandlerMock.mockClear()
})

// ─── ZipDownloadJob ───────────────────────────────────────────────────────────

describe('ZipDownloadJob.rehydrate()', () => {
  it('passes jobRunId from parent', () => {
    ZipDownloadJob.rehydrate([jobRun(10, 'studio_ee_job_create_download_zip')])
    const opts = HandlerMock.mock.calls.at(-1)![0]
    expect(opts.jobRunId).toBe(10)
  })

  it('uses the correct title key', () => {
    ZipDownloadJob.rehydrate([jobRun(10, 'studio_ee_job_create_download_zip')])
    const opts = HandlerMock.mock.calls.at(-1)![0]
    expect(opts.title).toBe('jobs.download-zip-job.title')
  })

  it('uses DefaultStepTracker (no child job)', () => {
    ZipDownloadJob.rehydrate([jobRun(10, 'studio_ee_job_create_download_zip')])
    const opts = HandlerMock.mock.calls.at(-1)![0]
    expect(opts.stepTracker).toBeInstanceOf(DefaultStepTracker)
  })

  it('uses ProgressFieldCalculator', () => {
    ZipDownloadJob.rehydrate([jobRun(10, 'studio_ee_job_create_download_zip')])
    const opts = HandlerMock.mock.calls.at(-1)![0]
    expect(opts.progressCalculator).toBeInstanceOf(ProgressFieldCalculator)
  })

  it('attaches a download button customizer', () => {
    ZipDownloadJob.rehydrate([jobRun(10, 'studio_ee_job_create_download_zip')])
    const opts = HandlerMock.mock.calls.at(-1)![0]
    expect(opts.onCustomizeButtons).toBeDefined()
  })

  it('leaves ancestorJobRunIds undefined for a single run', () => {
    ZipDownloadJob.rehydrate([jobRun(10, 'studio_ee_job_create_download_zip')])
    const opts = HandlerMock.mock.calls.at(-1)![0]
    expect(opts.ancestorJobRunIds).toBeUndefined()
  })
})

// ─── CsvDownloadJob ───────────────────────────────────────────────────────────

describe('CsvDownloadJob.rehydrate()', () => {
  describe('Scenario A: non-folder export (studio_ee_job_create_csv)', () => {
    it('uses parent.id as jobRunId', () => {
      CsvDownloadJob.rehydrate([jobRun(20, 'studio_ee_job_create_csv')])
      const opts = HandlerMock.mock.calls.at(-1)![0]
      expect(opts.jobRunId).toBe(20)
    })

    it('uses DefaultStepTracker when hasChildJob is false', () => {
      CsvDownloadJob.rehydrate([jobRun(20, 'studio_ee_job_create_csv')])
      const opts = HandlerMock.mock.calls.at(-1)![0]
      expect(opts.stepTracker).toBeInstanceOf(DefaultStepTracker)
    })

    it('leaves ancestorJobRunIds undefined', () => {
      CsvDownloadJob.rehydrate([jobRun(20, 'studio_ee_job_create_csv')])
      const opts = HandlerMock.mock.calls.at(-1)![0]
      expect(opts.ancestorJobRunIds).toBeUndefined()
    })
  })

  describe('Scenario B: folder export, parent step active (no child run yet)', () => {
    it('uses parent.id as jobRunId', () => {
      CsvDownloadJob.rehydrate([jobRun(30, 'studio_ee_job_collect_csv_folder_export_elements')])
      const opts = HandlerMock.mock.calls.at(-1)![0]
      expect(opts.jobRunId).toBe(30)
    })

    it('uses ChildJobStepTracker at step 1', () => {
      CsvDownloadJob.rehydrate([jobRun(30, 'studio_ee_job_collect_csv_folder_export_elements')])
      const opts = HandlerMock.mock.calls.at(-1)![0]
      expect(opts.stepTracker).toBeInstanceOf(ChildJobStepTracker)
      const tracker = opts.stepTracker as ChildJobStepTracker
      expect(tracker.state.currentStep).toBe(1)
      expect(tracker.state.totalSteps).toBe(2)
    })

    it('leaves ancestorJobRunIds undefined', () => {
      CsvDownloadJob.rehydrate([jobRun(30, 'studio_ee_job_collect_csv_folder_export_elements')])
      const opts = HandlerMock.mock.calls.at(-1)![0]
      expect(opts.ancestorJobRunIds).toBeUndefined()
    })
  })

  describe('Scenario C: folder export, child run active', () => {
    const parent = jobRun(30, 'studio_ee_job_collect_csv_folder_export_elements', 'finished', 99)
    const child = jobRun(99, 'studio_ee_job_create_csv')
    const chain = [parent, child] as [JobRun, ...JobRun[]]

    it('uses child.id as jobRunId', () => {
      CsvDownloadJob.rehydrate(chain)
      const opts = HandlerMock.mock.calls.at(-1)![0]
      expect(opts.jobRunId).toBe(99)
    })

    it('uses ChildJobStepTracker at step 2', () => {
      CsvDownloadJob.rehydrate(chain)
      const opts = HandlerMock.mock.calls.at(-1)![0]
      expect(opts.stepTracker).toBeInstanceOf(ChildJobStepTracker)
      const tracker = opts.stepTracker as ChildJobStepTracker
      expect(tracker.state.currentStep).toBe(2)
      expect(tracker.state.totalSteps).toBe(2)
    })

    it('sets ancestorJobRunIds to [parent.id]', () => {
      CsvDownloadJob.rehydrate(chain)
      const opts = HandlerMock.mock.calls.at(-1)![0]
      expect(opts.ancestorJobRunIds).toEqual([30])
    })

    it('uses correct title key', () => {
      CsvDownloadJob.rehydrate(chain)
      const opts = HandlerMock.mock.calls.at(-1)![0]
      expect(opts.title).toBe('jobs.download-csv-job.title')
    })
  })
})

// ─── XlsxDownloadJob ─────────────────────────────────────────────────────────

describe('XlsxDownloadJob.rehydrate()', () => {
  describe('Scenario A: non-folder export (studio_ee_job_create_xlsx)', () => {
    it('uses parent.id as jobRunId with DefaultStepTracker', () => {
      XlsxDownloadJob.rehydrate([jobRun(40, 'studio_ee_job_create_xlsx')])
      const opts = HandlerMock.mock.calls.at(-1)![0]
      expect(opts.jobRunId).toBe(40)
      expect(opts.stepTracker).toBeInstanceOf(DefaultStepTracker)
    })

    it('uses the xlsx title key, not the csv one', () => {
      XlsxDownloadJob.rehydrate([jobRun(40, 'studio_ee_job_create_xlsx')])
      const opts = HandlerMock.mock.calls.at(-1)![0]
      expect(opts.title).toBe('jobs.download-xlsx-job.title')
    })
  })

  describe('Scenario C: folder export, child run active', () => {
    const parent = jobRun(40, 'studio_ee_job_collect_xlsx_folder_export_elements', 'finished', 99)
    const child = jobRun(99, 'studio_ee_job_create_xlsx')
    const chain = [parent, child] as [JobRun, ...JobRun[]]

    it('uses child.id as jobRunId', () => {
      XlsxDownloadJob.rehydrate(chain)
      const opts = HandlerMock.mock.calls.at(-1)![0]
      expect(opts.jobRunId).toBe(99)
    })

    it('uses ChildJobStepTracker at step 2 with ancestorJobRunIds', () => {
      XlsxDownloadJob.rehydrate(chain)
      const opts = HandlerMock.mock.calls.at(-1)![0]
      expect(opts.stepTracker).toBeInstanceOf(ChildJobStepTracker)
      const tracker = opts.stepTracker as ChildJobStepTracker
      expect(tracker.state.currentStep).toBe(2)
      expect(opts.ancestorJobRunIds).toEqual([40])
    })
  })
})

// ─── AbstractBatchEditJob ─────────────────────────────────────────────────────

describe('AbstractBatchEditJob.rehydrate()', () => {
  it('passes jobRunId from parent', () => {
    AbstractBatchEditJob.rehydrate([jobRun(42, 'studio_ee_job_patch_elements')])
    const opts = HandlerMock.mock.calls.at(-1)![0]
    expect(opts.jobRunId).toBe(42)
  })

  it('uses the batch-edit title key', () => {
    AbstractBatchEditJob.rehydrate([jobRun(42, 'studio_ee_job_patch_elements')])
    const opts = HandlerMock.mock.calls.at(-1)![0]
    expect(opts.title).toBe('batch-edit.job-title')
  })

  it('does not pass onJobCompletion (no side-effect callbacks on rehydrate)', () => {
    AbstractBatchEditJob.rehydrate([jobRun(42, 'studio_ee_job_patch_elements')])
    const opts = HandlerMock.mock.calls.at(-1)![0]
    expect(opts.onJobCompletion).toBeUndefined()
  })

  it('does not pass stepTracker (uses handler default)', () => {
    AbstractBatchEditJob.rehydrate([jobRun(42, 'studio_ee_job_patch_elements')])
    const opts = HandlerMock.mock.calls.at(-1)![0]
    expect(opts.stepTracker).toBeUndefined()
  })

  it('does not pass progressCalculator (uses handler default)', () => {
    AbstractBatchEditJob.rehydrate([jobRun(42, 'studio_ee_job_patch_elements')])
    const opts = HandlerMock.mock.calls.at(-1)![0]
    expect(opts.progressCalculator).toBeUndefined()
  })
})

// ─── AbstractFolderBatchEditJob ───────────────────────────────────────────────

describe('AbstractFolderBatchEditJob.rehydrate()', () => {
  it('passes jobRunId from parent', () => {
    AbstractFolderBatchEditJob.rehydrate([jobRun(77, 'studio_ee_job_patch_folder_elements')])
    const opts = HandlerMock.mock.calls.at(-1)![0]
    expect(opts.jobRunId).toBe(77)
  })

  it('uses the batch-edit title key', () => {
    AbstractFolderBatchEditJob.rehydrate([jobRun(77, 'studio_ee_job_patch_folder_elements')])
    const opts = HandlerMock.mock.calls.at(-1)![0]
    expect(opts.title).toBe('batch-edit.job-title')
  })

  it('passes step descriptions for the two batch-edit steps', () => {
    AbstractFolderBatchEditJob.rehydrate([jobRun(77, 'studio_ee_job_patch_folder_elements')])
    const opts = HandlerMock.mock.calls.at(-1)![0]
    expect(opts.stepDescriptions).toEqual({
      1: 'jobs.job.step.batch-edit.preparing',
      2: 'jobs.job.step.batch-edit.applying'
    })
  })

  it('uses DefaultStepTracker with showStepLabel=true', () => {
    AbstractFolderBatchEditJob.rehydrate([jobRun(77, 'studio_ee_job_patch_folder_elements')])
    const opts = HandlerMock.mock.calls.at(-1)![0]
    expect(opts.stepTracker).toBeInstanceOf(DefaultStepTracker)
    const tracker = opts.stepTracker as DefaultStepTracker
    expect(tracker.showStepLabel).toBe(true)
  })

  it('uses ProgressFieldCalculator', () => {
    AbstractFolderBatchEditJob.rehydrate([jobRun(77, 'studio_ee_job_patch_folder_elements')])
    const opts = HandlerMock.mock.calls.at(-1)![0]
    expect(opts.progressCalculator).toBeInstanceOf(ProgressFieldCalculator)
  })
})

// ─── ZipUploadJob ─────────────────────────────────────────────────────────────

describe('ZipUploadJob.rehydrate()', () => {
  describe('no child run yet (parent only)', () => {
    it('uses parent.id as jobRunId', () => {
      ZipUploadJob.rehydrate([jobRun(50, 'studio_ee_job_upload_zip_file')])
      const opts = HandlerMock.mock.calls.at(-1)![0]
      expect(opts.jobRunId).toBe(50)
    })

    it('uses ChildJobStepTracker at step 1', () => {
      ZipUploadJob.rehydrate([jobRun(50, 'studio_ee_job_upload_zip_file')])
      const opts = HandlerMock.mock.calls.at(-1)![0]
      expect(opts.stepTracker).toBeInstanceOf(ChildJobStepTracker)
      const tracker = opts.stepTracker as ChildJobStepTracker
      expect(tracker.state.currentStep).toBe(1)
      expect(tracker.state.totalSteps).toBe(2)
    })

    it('leaves ancestorJobRunIds undefined', () => {
      ZipUploadJob.rehydrate([jobRun(50, 'studio_ee_job_upload_zip_file')])
      const opts = HandlerMock.mock.calls.at(-1)![0]
      expect(opts.ancestorJobRunIds).toBeUndefined()
    })
  })

  describe('child run active', () => {
    const parent = jobRun(50, 'studio_ee_job_upload_zip_file', 'finished', 60)
    const child = jobRun(60, 'studio_ee_job_create_assets_from_zip')
    const chain = [parent, child] as [JobRun, ...JobRun[]]

    it('uses child.id as jobRunId', () => {
      ZipUploadJob.rehydrate(chain)
      const opts = HandlerMock.mock.calls.at(-1)![0]
      expect(opts.jobRunId).toBe(60)
    })

    it('uses ChildJobStepTracker at step 2', () => {
      ZipUploadJob.rehydrate(chain)
      const opts = HandlerMock.mock.calls.at(-1)![0]
      expect(opts.stepTracker).toBeInstanceOf(ChildJobStepTracker)
      const tracker = opts.stepTracker as ChildJobStepTracker
      expect(tracker.state.currentStep).toBe(2)
      expect(tracker.state.totalSteps).toBe(2)
    })

    it('sets ancestorJobRunIds to [parent.id]', () => {
      ZipUploadJob.rehydrate(chain)
      const opts = HandlerMock.mock.calls.at(-1)![0]
      expect(opts.ancestorJobRunIds).toEqual([50])
    })
  })

  it('uses ProgressFieldCalculator', () => {
    ZipUploadJob.rehydrate([jobRun(50, 'studio_ee_job_upload_zip_file')])
    const opts = HandlerMock.mock.calls.at(-1)![0]
    expect(opts.progressCalculator).toBeInstanceOf(ProgressFieldCalculator)
  })
})

// ─── run() vs rehydrate() structural parity ───────────────────────────────────
//
// Verify that the refactoring did not change what run() produces compared to
// rehydrate(): title, stepTracker type and initial state, progressCalculator type,
// and onCustomizeButtons presence must be identical.
//
// Intentional differences (onRetry, onJobCompletion) are not compared —
// rehydrate() deliberately omits callbacks that require the original call context.

const mockBus: Pick<JobRunOptions['messageBus'], 'registerHandler'> = { registerHandler: jest.fn() }

// Concrete subclasses for testing abstract batch-edit jobs
class TestableBatchEditJob extends AbstractBatchEditJob {  
  protected async executeEditRequest (): Promise<number | null> { return 42 }
}

class TestableFolderBatchEditJob extends AbstractFolderBatchEditJob {  
  protected async executeEditRequest (): Promise<number | null> { return 77 }
}

interface HandlerSnapshot {
  title: unknown
  stepTrackerType: string | null
  stepTrackerCurrentStep: number | null
  stepTrackerTotalSteps: number | null
  progressCalculatorType: string | null
  hasCustomizeButtons: boolean
}

function structuralSnapshot (opts: any): HandlerSnapshot {
  return {
    // Normalise function titles so two different closures with the same shape compare equal
    title: typeof opts.title === 'function' ? '[function]' : opts.title,
    stepTrackerType: opts.stepTracker?.constructor.name ?? null,
    stepTrackerCurrentStep: opts.stepTracker?.state?.currentStep ?? null,
    stepTrackerTotalSteps: opts.stepTracker?.state?.totalSteps ?? null,
    progressCalculatorType: opts.progressCalculator?.constructor.name ?? null,
    hasCustomizeButtons: typeof opts.onCustomizeButtons === 'function'
  }
}

describe('ZipDownloadJob: run() matches rehydrate() structurally', () => {
  it('produces identical title, stepTracker, progressCalculator and button presence', async () => {
    const job = new ZipDownloadJob({ action: async () => 10 })
    await job.run({ messageBus: mockBus as any })
    const runSnapshot = structuralSnapshot(HandlerMock.mock.calls.at(-1)![0])
    HandlerMock.mockClear()

    ZipDownloadJob.rehydrate([jobRun(10, 'studio_ee_job_create_download_zip')])
    const rehydrateSnapshot = structuralSnapshot(HandlerMock.mock.calls.at(-1)![0])

    expect(runSnapshot).toEqual(rehydrateSnapshot)
  })
})

describe('CsvDownloadJob: run() matches rehydrate() structurally', () => {
  it('non-folder export: identical structure', async () => {
    const job = new CsvDownloadJob({ action: async () => 20, isFolderExport: false })
    await job.run({ messageBus: mockBus as any })
    const runSnapshot = structuralSnapshot(HandlerMock.mock.calls.at(-1)![0])
    HandlerMock.mockClear()

    CsvDownloadJob.rehydrate([jobRun(20, 'studio_ee_job_create_csv')])
    const rehydrateSnapshot = structuralSnapshot(HandlerMock.mock.calls.at(-1)![0])

    expect(runSnapshot).toEqual(rehydrateSnapshot)
  })

  it('folder export (parent step): identical structure', async () => {
    const job = new CsvDownloadJob({ action: async () => 30, isFolderExport: true })
    await job.run({ messageBus: mockBus as any })
    const runSnapshot = structuralSnapshot(HandlerMock.mock.calls.at(-1)![0])
    HandlerMock.mockClear()

    CsvDownloadJob.rehydrate([jobRun(30, 'studio_ee_job_collect_csv_folder_export_elements')])
    const rehydrateSnapshot = structuralSnapshot(HandlerMock.mock.calls.at(-1)![0])

    expect(runSnapshot).toEqual(rehydrateSnapshot)
  })
})

describe('XlsxDownloadJob: run() matches rehydrate() structurally', () => {
  it('non-folder export: identical structure', async () => {
    const job = new XlsxDownloadJob({ action: async () => 40, isFolderExport: false })
    await job.run({ messageBus: mockBus as any })
    const runSnapshot = structuralSnapshot(HandlerMock.mock.calls.at(-1)![0])
    HandlerMock.mockClear()

    XlsxDownloadJob.rehydrate([jobRun(40, 'studio_ee_job_create_xlsx')])
    const rehydrateSnapshot = structuralSnapshot(HandlerMock.mock.calls.at(-1)![0])

    expect(runSnapshot).toEqual(rehydrateSnapshot)
  })

  it('folder export (parent step): identical structure', async () => {
    const job = new XlsxDownloadJob({ action: async () => 50, isFolderExport: true })
    await job.run({ messageBus: mockBus as any })
    const runSnapshot = structuralSnapshot(HandlerMock.mock.calls.at(-1)![0])
    HandlerMock.mockClear()

    XlsxDownloadJob.rehydrate([jobRun(50, 'studio_ee_job_collect_xlsx_folder_export_elements')])
    const rehydrateSnapshot = structuralSnapshot(HandlerMock.mock.calls.at(-1)![0])

    expect(runSnapshot).toEqual(rehydrateSnapshot)
  })
})

describe('ZipUploadJob: run() matches rehydrate() structurally', () => {
  it('produces identical title type, stepTracker, progressCalculator and button presence', async () => {
    let capturedOnSuccess: ((response: any) => Promise<void>) | undefined
    const job = new ZipUploadJob({
      triggerUpload: (opts: any) => { capturedOnSuccess = opts.onSuccess },
      parentFolder: '1'
    })
    const runPromise = job.run({ messageBus: mockBus as any })
    await capturedOnSuccess!([{ response: { jobRunId: 50 } }])
    await runPromise
    const runSnapshot = structuralSnapshot(HandlerMock.mock.calls.at(-1)![0])
    HandlerMock.mockClear()

    ZipUploadJob.rehydrate([jobRun(50, 'studio_ee_job_upload_zip_file')])
    const rehydrateSnapshot = structuralSnapshot(HandlerMock.mock.calls.at(-1)![0])

    expect(runSnapshot).toEqual(rehydrateSnapshot)
  })
})

describe('AbstractBatchEditJob: run() matches rehydrate() structurally', () => {
  it('produces identical title, stepTracker (none) and progressCalculator (none)', async () => {
    const job = new TestableBatchEditJob({ assetContextId: 1, refreshGrid: async () => {} })
    await job.run({ messageBus: mockBus as any })
    const runSnapshot = structuralSnapshot(HandlerMock.mock.calls.at(-1)![0])
    HandlerMock.mockClear()

    AbstractBatchEditJob.rehydrate([jobRun(42, 'studio_ee_job_patch_elements')])
    const rehydrateSnapshot = structuralSnapshot(HandlerMock.mock.calls.at(-1)![0])

    expect(runSnapshot.title).toEqual(rehydrateSnapshot.title)
    expect(runSnapshot.stepTrackerType).toEqual(rehydrateSnapshot.stepTrackerType)
    expect(runSnapshot.progressCalculatorType).toEqual(rehydrateSnapshot.progressCalculatorType)
  })
})

describe('AbstractFolderBatchEditJob: run() matches rehydrate() structurally', () => {
  it('produces identical title, DefaultStepTracker (showStepLabel=true) and ProgressFieldCalculator', async () => {
    const job = new TestableFolderBatchEditJob({ assetContextId: 1, refreshGrid: async () => {} })
    await job.run({ messageBus: mockBus as any })
    const runSnapshot = structuralSnapshot(HandlerMock.mock.calls.at(-1)![0])
    HandlerMock.mockClear()

    AbstractFolderBatchEditJob.rehydrate([jobRun(77, 'studio_ee_job_patch_folder_elements')])
    const rehydrateSnapshot = structuralSnapshot(HandlerMock.mock.calls.at(-1)![0])

    expect(runSnapshot.title).toEqual(rehydrateSnapshot.title)
    expect(runSnapshot.stepTrackerType).toEqual(rehydrateSnapshot.stepTrackerType)
    expect(runSnapshot.progressCalculatorType).toEqual(rehydrateSnapshot.progressCalculatorType)
  })
})
