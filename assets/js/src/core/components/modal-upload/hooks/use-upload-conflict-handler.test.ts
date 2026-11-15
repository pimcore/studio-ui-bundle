/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { renderHook } from '@testing-library/react'
import type { RcFile } from 'antd/es/upload/interface'
import { useUploadConflictHandler, UploadConflictAction } from './use-upload-conflict-handler'
import { useUploadConflictModal, type UploadConflictCheckResult } from './use-upload-conflict-modal'

// A factory, so the real module — and the SDK barrel it pulls in — is never loaded.
jest.mock('./use-upload-conflict-modal', () => ({ useUploadConflictModal: jest.fn() }))

const checkFilesExist = jest.fn()
const askUserOverwrite = jest.fn()
const askUserOverwriteAll = jest.fn()

const deferred = <T, >(): { promise: Promise<T>, resolve: (value: T) => void } => {
  let settle!: (value: T) => void
  const promise = new Promise<T>((resolve) => { settle = resolve })

  return { promise, resolve: settle }
}

const file = (name: string): RcFile => {
  const rcFile = new File([name], name) as RcFile
  rcFile.uid = name

  return rcFile
}

const renderHandler = (): ReturnType<typeof useUploadConflictHandler> =>
  renderHook(() => useUploadConflictHandler({ targetFolderId: 1 })).result.current

beforeEach(() => {
  // `clearAllMocks` keeps implementations, which would leak one test's answer into the next.
  jest.resetAllMocks();
  (useUploadConflictModal as jest.Mock).mockReturnValue({
    checkFilesExist,
    checkFileExists: jest.fn(),
    askUserOverwrite,
    askUserOverwriteAll,
    resetApplyToAll: jest.fn()
  })
})

describe('useUploadConflictHandler', () => {
  it('reports no cancellation for a check that runs to the end', async () => {
    checkFilesExist.mockResolvedValue([{ exists: false }] satisfies UploadConflictCheckResult[])

    const handler = renderHandler()

    await expect(handler.resolveConflicts([file('a.jpg')])).resolves.toBe(false)
  })

  it('stops the check and reports the cancellation to every waiting file', async () => {
    const firstBatch = deferred<UploadConflictCheckResult[]>()
    checkFilesExist.mockReturnValueOnce(firstBatch.promise)

    const handler = renderHandler()
    const files = Array.from({ length: 30 }, (_, index) => file(`file-${index}.jpg`))

    const firstFile = handler.resolveConflicts(files)
    const secondFile = handler.resolveConflicts(files)

    handler.cancelCheck()
    firstBatch.resolve(Array.from({ length: 25 }, () => ({ exists: false })))

    await expect(firstFile).resolves.toBe(true)
    await expect(secondFile).resolves.toBe(true)

    // The second batch of 30 files was never requested, and an existing asset
    // that had already come back is not turned into an overwrite prompt.
    expect(checkFilesExist).toHaveBeenCalledTimes(1)
    expect(askUserOverwrite).not.toHaveBeenCalled()
  })

  it('does not carry a cancellation over into the next batch', async () => {
    const stalled = deferred<UploadConflictCheckResult[]>()
    checkFilesExist.mockReturnValueOnce(stalled.promise)

    const handler = renderHandler()

    const cancelled = handler.resolveConflicts([file('a.jpg')])
    handler.cancelCheck()

    // The user starts over while the abandoned request is still outstanding.
    handler.reset()
    checkFilesExist.mockResolvedValue([{ exists: false }] satisfies UploadConflictCheckResult[])

    await expect(handler.resolveConflicts([file('b.jpg')])).resolves.toBe(false)

    stalled.resolve([{ exists: false }])
    await expect(cancelled).resolves.toBe(true)
  })

  it('keeps resolving conflicts when nothing was cancelled', async () => {
    checkFilesExist.mockResolvedValue([{ exists: true, id: 42 }] satisfies UploadConflictCheckResult[])
    askUserOverwrite.mockResolvedValue(UploadConflictAction.OVERWRITE)

    const handler = renderHandler()
    const target = file('a.jpg')

    await expect(handler.resolveConflicts([target])).resolves.toBe(false)

    expect(askUserOverwrite).toHaveBeenCalledWith('a.jpg')
    expect(askUserOverwriteAll).not.toHaveBeenCalled()
    expect(handler.getReplaceId(target)).toBe(42)
  })

  describe('with several existing files', () => {
    const existing = [{ exists: true, id: 1 }, { exists: true, id: 2 }, { exists: true, id: 3 }] satisfies UploadConflictCheckResult[]

    it('asks once for the whole batch instead of once per file', async () => {
      checkFilesExist.mockResolvedValue(existing)
      askUserOverwriteAll.mockResolvedValue(UploadConflictAction.SKIP)

      const handler = renderHandler()
      const files = [file('a.jpg'), file('b.jpg'), file('c.jpg')]

      await expect(handler.resolveConflicts(files)).resolves.toBe(false)

      expect(askUserOverwriteAll).toHaveBeenCalledTimes(1)
      expect(askUserOverwriteAll).toHaveBeenCalledWith(['a.jpg', 'b.jpg', 'c.jpg'])
      expect(askUserOverwrite).not.toHaveBeenCalled()
      expect(files.every(f => handler.shouldSkipFile(f))).toBe(true)
    })

    it('overwrites every existing asset when the batch answer is overwrite', async () => {
      checkFilesExist.mockResolvedValue(existing)
      askUserOverwriteAll.mockResolvedValue(UploadConflictAction.OVERWRITE)

      const handler = renderHandler()
      const files = [file('a.jpg'), file('b.jpg'), file('c.jpg')]

      await handler.resolveConflicts(files)

      expect(askUserOverwriteAll).toHaveBeenCalledTimes(1)
      expect(askUserOverwrite).not.toHaveBeenCalled()
      expect(files.map(f => handler.getReplaceId(f))).toEqual([1, 2, 3])
      expect(files.some(f => handler.shouldSkipFile(f))).toBe(false)
    })

    it('uploads every file under its own name when the batch answer is keep both', async () => {
      checkFilesExist.mockResolvedValue(existing)
      askUserOverwriteAll.mockResolvedValue(UploadConflictAction.KEEP)

      const handler = renderHandler()
      const files = [file('a.jpg'), file('b.jpg'), file('c.jpg')]

      await handler.resolveConflicts(files)

      expect(files.map(f => handler.getReplaceId(f))).toEqual([undefined, undefined, undefined])
      expect(files.some(f => handler.shouldSkipFile(f))).toBe(false)
    })

    it('falls back to one prompt per file when the user wants to review each', async () => {
      checkFilesExist.mockResolvedValue(existing)
      askUserOverwriteAll.mockResolvedValue(null)
      askUserOverwrite
        .mockResolvedValueOnce(UploadConflictAction.SKIP)
        .mockResolvedValueOnce(UploadConflictAction.OVERWRITE)
        .mockResolvedValueOnce(UploadConflictAction.KEEP)

      const handler = renderHandler()
      const [a, b, c] = [file('a.jpg'), file('b.jpg'), file('c.jpg')]

      await handler.resolveConflicts([a, b, c])

      expect(askUserOverwrite).toHaveBeenCalledTimes(3)
      expect(handler.shouldSkipFile(a)).toBe(true)
      expect(handler.getReplaceId(b)).toBe(2)
      expect(handler.shouldSkipFile(c)).toBe(false)
      expect(handler.getReplaceId(c)).toBeUndefined()
    })

    it('keeps the single-file prompt when only one file of the batch already exists', async () => {
      checkFilesExist.mockResolvedValue([{ exists: false }, { exists: true, id: 2 }, { exists: false }] satisfies UploadConflictCheckResult[])
      askUserOverwrite.mockResolvedValue(UploadConflictAction.KEEP)

      const handler = renderHandler()

      await handler.resolveConflicts([file('a.jpg'), file('b.jpg'), file('c.jpg')])

      expect(askUserOverwriteAll).not.toHaveBeenCalled()
      expect(askUserOverwrite).toHaveBeenCalledTimes(1)
      expect(askUserOverwrite).toHaveBeenCalledWith('b.jpg')
    })
  })
})
