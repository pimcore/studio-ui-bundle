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
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { EditorToolbarSaveButtons } from './save-buttons'

interface MockPermissions {
  save: boolean
  publish: boolean
}

interface MockDataObject {
  type: string
  published: boolean
  changes: Record<string, unknown>
  permissions: MockPermissions
  draftData?: unknown
}

const mockSave = jest.fn(async () => {})
const mockKeyBindings = new Map<string, () => Promise<void>>()
let mockDataObject: MockDataObject

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/components/button-group/button-group', () => ({
  ButtonGroup: ({ items }: { items: React.ReactNode[] }) => (
    <div>
      {items.map((item, index) => <React.Fragment key={ index }>{item}</React.Fragment>)}
    </div>
  )
}))

jest.mock('@sdk/components', () => ({
  Button: ({ children, disabled, onClick }: { children: React.ReactNode, disabled?: boolean, onClick?: () => void }) => (
    <button
      disabled={ disabled }
      onClick={ onClick }
      type="button"
    >
      {children}
    </button>
  )
}))

jest.mock('@Pimcore/components/dropdown/dropdown', () => ({
  Dropdown: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

jest.mock('@Pimcore/components/icon-button/icon-button', () => ({
  IconButton: () => null
}))

jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: () => null
}))

jest.mock('@Pimcore/components/spin/spin', () => ({
  Spin: () => null
}))

jest.mock('@Pimcore/components/tooltip/tooltip', () => ({
  Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

jest.mock('@Pimcore/components/message/useMessage', () => ({
  useMessage: () => ({ success: jest.fn(async () => {}) })
}))

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  ApiError: class ApiError extends Error {}
}))

jest.mock('@Pimcore/modules/element/actions/delete-draft/use-delete-draft', () => ({
  useDeleteDraft: () => ({ deleteDraft: jest.fn(), isLoading: false, buttonText: 'delete-draft' })
}))

jest.mock('@Pimcore/modules/data-object/actions/save/use-save', () => ({
  SaveTaskType: {
    Version: 'version',
    AutoSave: 'autoSave',
    Publish: 'publish',
    Save: 'save',
    Unpublish: 'unpublish'
  },
  useSave: () => ({ save: mockSave, isLoading: false, isSuccess: false, isError: false, error: undefined })
}))

jest.mock('@Pimcore/modules/data-object/data-object-provider', () => ({
  DataObjectContext: jest.requireActual('react').createContext({ id: 1 })
}))

jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider', () => ({
  useEditFormContext: () => ({
    getModifiedDataObjectAttributes: () => ({}),
    resetModifiedDataObjectAttributes: jest.fn()
  })
}))

jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/save-provider/use-save-context', () => ({
  useSaveContext: () => ({ isAutoSaveLoading: false, runningTask: undefined })
}))

jest.mock('@Pimcore/modules/data-object/hooks/use-data-object-draft', () => ({
  useDataObjectDraft: () => ({
    dataObject: mockDataObject,
    removeTrackedChanges: jest.fn(),
    publishDraft: jest.fn()
  })
}))

jest.mock('@Pimcore/modules/element/editor/shared-tab-manager/tabs/schedule/hooks/use-save-schedules', () => ({
  useSaveSchedules: () => ({
    saveSchedules: jest.fn(async () => {}),
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: undefined
  })
}))

jest.mock('@Pimcore/modules/app/hook/use-handle-keybindings', () => ({
  useHandleKeyBindings: (callback: () => Promise<void>, actionName: string) => {
    mockKeyBindings.set(actionName, callback)
  }
}))

const createDataObject = (published: boolean, permissions: MockPermissions): MockDataObject => ({
  type: 'object',
  published,
  changes: {},
  permissions
})

const triggerKeyBinding = async (actionName: string): Promise<void> => {
  const callback = mockKeyBindings.get(actionName)

  if (callback === undefined) {
    throw new Error(`No key binding registered for "${actionName}"`)
  }

  await callback()
}

const buttonLabels = (): string[] => screen.queryAllByRole('button').map((button) => button.textContent ?? '')

describe('EditorToolbarSaveButtons publish permission', () => {
  beforeEach(() => {
    mockSave.mockClear()
    mockKeyBindings.clear()
  })

  it.each([
    ['unpublished', false],
    ['published', true]
  ])('does not offer save and publish for an %s object when publishing is denied', (_state, published) => {
    mockDataObject = createDataObject(published, { save: true, publish: false })

    render(<EditorToolbarSaveButtons />)

    expect(buttonLabels()).not.toContain('toolbar.save-and-publish')
    expect(buttonLabels()).toContain('toolbar.save-draft')
  })

  it.each([
    ['unpublished', false],
    ['published', true]
  ])('offers save and publish for an %s object when publishing is allowed', (_state, published) => {
    mockDataObject = createDataObject(published, { save: true, publish: true })

    render(<EditorToolbarSaveButtons />)

    expect(buttonLabels()).toContain('toolbar.save-and-publish')
  })

  it('publishes with the save and publish button of an unpublished object when publishing is allowed', async () => {
    mockDataObject = createDataObject(false, { save: true, publish: true })

    render(<EditorToolbarSaveButtons />)
    fireEvent.click(screen.getByText('toolbar.save-and-publish'))

    await waitFor(() => {
      expect(mockSave).toHaveBeenCalledWith({}, 'publish', expect.any(Function))
    })
  })

  it.each([
    ['unpublished', false],
    ['published', true]
  ])('does not publish an %s object by keyboard when publishing is denied', async (_state, published) => {
    mockDataObject = createDataObject(published, { save: true, publish: false })

    render(<EditorToolbarSaveButtons />)
    await triggerKeyBinding('publish')
    await triggerKeyBinding('save')

    expect(mockSave).not.toHaveBeenCalledWith(expect.anything(), 'publish', expect.anything())
  })
})
