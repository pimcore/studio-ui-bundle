/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { act, render } from '@testing-library/react'
import { EditFormProvider, useEditFormContext } from './edit-form-provider'

const mockSave = jest.fn()
const mockMarkObjectDataAsModified = jest.fn()
let mockSettings: Record<string, unknown> = {}

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  debounce: (fn: (...args: unknown[]) => unknown) => fn
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/modules/data-object/hooks/use-data-object-draft', () => ({
  useDataObjectDraft: () => ({
    dataObject: { permissions: { save: true, publish: true } },
    markObjectDataAsModified: mockMarkObjectDataAsModified
  })
}))

jest.mock('@Pimcore/modules/element/hooks/use-element-context', () => ({
  useElementContext: () => ({ id: 1 })
}))

jest.mock('@Pimcore/modules/data-object/actions/save/use-save', () => ({
  SaveTaskType: { AutoSave: 'autoSave' },
  useSave: () => ({ save: mockSave, isError: false })
}))

jest.mock('@Pimcore/modules/app/settings/hooks/use-settings', () => ({
  useSettings: () => mockSettings
}))

jest.mock('@Pimcore/components/message/useMessage', () => ({
  useMessage: () => ({ error: jest.fn() })
}))

jest.mock('@Pimcore/modules/element/permissions/permission-helper', () => ({
  checkElementPermission: () => true
}))

jest.mock('@sdk/components', () => ({
  Form: { useForm: () => [{}] }
}))

jest.mock('@Pimcore/app/depency-injection', () => ({
  container: { get: () => ({}) }
}))

jest.mock('@Pimcore/app/config/services/service-ids', () => ({
  serviceIds: {}
}))

jest.mock('./utils/merge-form-changes', () => ({
  mergeFormChanges: (current: Record<string, unknown>, changed: Record<string, unknown>) => ({ ...current, ...changed })
}))

type EditFormContext = ReturnType<typeof useEditFormContext>

function renderProvider (): EditFormContext {
  let context: EditFormContext | undefined

  const Consumer = (): null => {
    context = useEditFormContext()
    return null
  }

  render(
    <EditFormProvider>
      <Consumer />
    </EditFormProvider>
  )

  return context!
}

async function changeFieldAndUpdateDraft (context: EditFormContext): Promise<void> {
  context.updateModifiedDataObjectAttributes({ name: 'changed' })

  await act(async () => {
    await context.updateDraft()
  })
}

describe('EditFormProvider auto-save', () => {
  beforeEach(() => {
    mockSave.mockReset()
    mockMarkObjectDataAsModified.mockReset()
  })

  it('auto-saves changes when an auto-save interval is configured', async () => {
    mockSettings = { object_auto_save_interval: 60 }

    await changeFieldAndUpdateDraft(renderProvider())

    expect(mockMarkObjectDataAsModified).toHaveBeenCalled()
    expect(mockSave).toHaveBeenCalledWith({ name: 'changed' }, 'autoSave')
  })

  it('keeps auto-saving when the setting is not provided', async () => {
    mockSettings = {}

    await changeFieldAndUpdateDraft(renderProvider())

    expect(mockSave).toHaveBeenCalledWith({ name: 'changed' }, 'autoSave')
  })

  it('does not auto-save but still marks the object as modified when the interval is 0', async () => {
    mockSettings = { object_auto_save_interval: 0 }

    await changeFieldAndUpdateDraft(renderProvider())

    expect(mockMarkObjectDataAsModified).toHaveBeenCalled()
    expect(mockSave).not.toHaveBeenCalled()
  })
})
