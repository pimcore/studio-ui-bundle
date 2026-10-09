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
import { useAlertModal } from '@sdk/components'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'
import { useDataObjectUpdateByIdMutation } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import {
  useOptionalEditFormContext
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider'

// Factories, so the real modules — and the SDK barrel they pull in — are never loaded.
jest.mock('@sdk/components', () => ({ useAlertModal: jest.fn() }))
jest.mock('@Pimcore/modules/element/hooks/use-element-draft', () => ({ useElementDraft: jest.fn() }))
jest.mock('@Pimcore/modules/data-object/data-object-api-slice-enhanced', () => ({ useDataObjectUpdateByIdMutation: jest.fn() }))
jest.mock(
  '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider',
  () => ({ useOptionalEditFormContext: jest.fn() })
)
jest.mock('@Pimcore/modules/app/error-handler', () => ({ __esModule: true, default: jest.fn(), ApiError: jest.fn() }))
jest.mock('i18next', () => ({ t: (key: string) => key }))

const warn = jest.fn()
const updateDataObject = jest.fn()
const removeTrackedChanges = jest.fn()
const resetModifiedDataObjectAttributes = jest.fn()

const action = (unsavedChangesBehaviour?: UnsavedChangesBehaviour, actionType: 'transition' | 'global' = 'transition'): WorkflowAction => ({
  actionType,
  workflowId: 'wf',
  transitionId: 'ready',
  label: 'Ready',
  unsavedChangesBehaviour
})

const setUp = (
  { modified = false, published = true, formChanges = {} }: { modified?: boolean, published?: boolean, formChanges?: Record<string, unknown> } = {}
): void => {
  (useElementDraft as jest.Mock).mockReturnValue({ element: { modified, published }, removeTrackedChanges });
  (useOptionalEditFormContext as jest.Mock).mockReturnValue({
    getModifiedDataObjectAttributes: () => formChanges,
    resetModifiedDataObjectAttributes
  })
}

const guard = (elementType: 'data-object' | 'asset' = 'data-object'): ReturnType<typeof useUnsavedChangesGuard>['guard'] =>
  renderHook(() => useUnsavedChangesGuard(7, elementType)).result.current.guard

beforeEach(() => {
  jest.clearAllMocks();
  (useAlertModal as jest.Mock).mockReturnValue({ warn });
  (useDataObjectUpdateByIdMutation as jest.Mock).mockReturnValue([updateDataObject])
  updateDataObject.mockResolvedValue({ data: {} })
})

describe('useUnsavedChangesGuard', () => {
  it('lets an element without changes through without asking or saving', async () => {
    setUp()

    await expect(guard()(action('save'))).resolves.toBe(true)
    await expect(guard()(action('warn'))).resolves.toBe(true)
    expect(updateDataObject).not.toHaveBeenCalled()
    expect(warn).not.toHaveBeenCalled()
  })

  it('ignores the changes for "ignore", for global actions and without a behaviour', async () => {
    setUp({ modified: true })

    await expect(guard()(action('ignore'))).resolves.toBe(true)
    await expect(guard()(action('save', 'global'))).resolves.toBe(true)
    await expect(guard()(action(undefined))).resolves.toBe(true)
    expect(updateDataObject).not.toHaveBeenCalled()
    expect(warn).not.toHaveBeenCalled()
  })

  it('saves a published data object first for "save", including edits the autosave has not sent yet', async () => {
    setUp({ formChanges: { name: 'new' } })

    await expect(guard()(action('save'))).resolves.toBe(true)
    expect(updateDataObject).toHaveBeenCalledWith({
      id: 7,
      body: { data: { editableData: { name: 'new' }, task: 'publish', useDraftData: true } }
    })
    expect(resetModifiedDataObjectAttributes).toHaveBeenCalled()
    expect(removeTrackedChanges).toHaveBeenCalled()
  })

  it('saves an unpublished data object without publishing it', async () => {
    setUp({ modified: true, published: false })

    await guard()(action('save'))

    expect(updateDataObject.mock.calls[0][0].body.data.task).toBe('save')
  })

  it('does not apply the action when saving fails', async () => {
    setUp({ modified: true })
    updateDataObject.mockResolvedValue({ error: { status: 422 } })

    await expect(guard()(action('save'))).resolves.toBe(false)
    expect(removeTrackedChanges).not.toHaveBeenCalled()
  })

  it('asks for "warn" and follows the answer', async () => {
    setUp({ modified: true })

    warn.mockImplementationOnce(({ onOk }: { onOk: () => void }) => { onOk() })
    await expect(guard()(action('warn'))).resolves.toBe(true)

    warn.mockImplementationOnce(({ onCancel }: { onCancel: () => void }) => { onCancel() })
    await expect(guard()(action('warn'))).resolves.toBe(false)

    expect(updateDataObject).not.toHaveBeenCalled()
  })

  it('falls back to asking for "save" on element types it cannot save', async () => {
    setUp({ modified: true })
    warn.mockImplementationOnce(({ onCancel }: { onCancel: () => void }) => { onCancel() })

    await expect(guard('asset')(action('save'))).resolves.toBe(false)
    expect(warn).toHaveBeenCalled()
    expect(updateDataObject).not.toHaveBeenCalled()
  })
})
