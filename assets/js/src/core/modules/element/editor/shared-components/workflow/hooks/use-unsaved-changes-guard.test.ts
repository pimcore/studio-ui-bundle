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
import { useUnsavedChangesGuard } from './use-unsaved-changes-guard'
import { type UnsavedChangesBehaviour, type WorkflowAction } from '../types/workflow-types'
import { type UnsavedChangesSaver } from '../provider/unsaved-changes-saver-context'
import { useAlertModal } from '@sdk/components'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'
import {
  useEditFormContextOptional
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider'

// Factories, so the real modules — and the SDK barrel they pull in — are never loaded.
jest.mock('@sdk/components', () => ({ useAlertModal: jest.fn() }))
jest.mock('@Pimcore/modules/element/hooks/use-element-draft', () => ({ useElementDraft: jest.fn() }))
jest.mock(
  '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider',
  () => ({ useEditFormContextOptional: jest.fn() })
)
jest.mock('i18next', () => ({ t: (key: string) => key }))

const warn = jest.fn()
const error = jest.fn()
const saver = jest.fn<Promise<boolean>, []>()

const action = (unsavedChangesBehaviour?: UnsavedChangesBehaviour, actionType: 'transition' | 'global' = 'transition'): WorkflowAction => ({
  actionType,
  workflowId: 'wf',
  transitionId: 'ready',
  label: 'Ready',
  unsavedChangesBehaviour
})

const setUp = ({ modified = false, formChanges = {} }: { modified?: boolean, formChanges?: Record<string, unknown> } = {}): void => {
  (useElementDraft as jest.Mock).mockReturnValue({ element: { modified } });
  (useEditFormContextOptional as jest.Mock).mockReturnValue({ getModifiedDataObjectAttributes: () => formChanges })
}

const guard = (getSaver: () => UnsavedChangesSaver | undefined = () => saver): ReturnType<typeof useUnsavedChangesGuard>['guard'] =>
  renderHook(() => useUnsavedChangesGuard(7, 'data-object', getSaver)).result.current.guard

beforeEach(() => {
  jest.clearAllMocks();
  (useAlertModal as jest.Mock).mockReturnValue({ warn, error })
  saver.mockResolvedValue(true)
})

describe('useUnsavedChangesGuard', () => {
  it('lets an element without changes through without asking or saving', async () => {
    setUp()

    await expect(guard()(action('save'))).resolves.toBe(true)
    await expect(guard()(action('warn'))).resolves.toBe(true)
    expect(saver).not.toHaveBeenCalled()
    expect(warn).not.toHaveBeenCalled()
  })

  it('ignores the changes for "ignore", for global actions and without a behaviour', async () => {
    setUp({ modified: true })

    await expect(guard()(action('ignore'))).resolves.toBe(true)
    await expect(guard()(action('save', 'global'))).resolves.toBe(true)
    await expect(guard()(action(undefined))).resolves.toBe(true)
    expect(saver).not.toHaveBeenCalled()
    expect(warn).not.toHaveBeenCalled()
  })

  it('saves through the registered saver for "save" — also for edits the autosave has not sent yet', async () => {
    setUp({ formChanges: { name: 'new' } })

    await expect(guard()(action('save'))).resolves.toBe(true)
    expect(saver).toHaveBeenCalledTimes(1)
    expect(error).not.toHaveBeenCalled()
  })

  it('does not apply the action and says why when saving fails', async () => {
    setUp({ modified: true })
    saver.mockResolvedValue(false)

    await expect(guard()(action('save'))).resolves.toBe(false)
    expect(error).toHaveBeenCalledWith(expect.objectContaining({ content: 'workflow.unsaved-changes.save-failed' }))
  })

  it('asks for "warn" and follows the answer', async () => {
    setUp({ modified: true })

    warn.mockImplementationOnce(({ onOk }: { onOk: () => void }) => { onOk() })
    await expect(guard()(action('warn'))).resolves.toBe(true)

    warn.mockImplementationOnce(({ onCancel }: { onCancel: () => void }) => { onCancel() })
    await expect(guard()(action('warn'))).resolves.toBe(false)

    expect(saver).not.toHaveBeenCalled()
  })

  it('falls back to asking for "save" when no saver is registered (e.g. assets, documents)', async () => {
    setUp({ modified: true })
    warn.mockImplementationOnce(({ onCancel }: { onCancel: () => void }) => { onCancel() })

    await expect(guard(() => undefined)(action('save'))).resolves.toBe(false)
    expect(warn).toHaveBeenCalled()
  })
})
