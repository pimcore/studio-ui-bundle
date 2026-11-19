/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { act, renderHook, waitFor } from '@testing-library/react'
import { useEditLock } from './use-edit-lock'
import { awaitEditLockPersistAllowed } from '@Pimcore/modules/element/services/edit-lock-gate'
import { elementOpeningService } from '@Pimcore/app/public-api/element/element-api'

// Factories, so the real modules — and the SDK barrels they pull in — are never loaded.
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('@sdk/app', () => ({ useAppDispatch: () => dispatch }))
jest.mock('@Pimcore/modules/element/element-api-slice-enhanced', () => ({
  useElementLockMutation: () => [lockElement],
  useElementUnlockMutation: () => [unlockElement],
  useLazyElementGetEditlockQuery: () => [getEditlock]
}))
jest.mock('@Pimcore/components/modal/form-modal/hooks/use-form-modal', () => ({ useFormModal: () => ({ confirm }) }))
jest.mock('@Pimcore/modules/element/components/edit-lock-warning/edit-lock-warning', () => ({ EditLockWarning: () => null }))
jest.mock('@Pimcore/app/api/pimcore/route', () => ({ getPrefix: () => '/pimcore-studio/api' }))
jest.mock('@Pimcore/modules/widget-manager/utils/tools', () => ({
  getWidgetId: (elementType: string, id: number) => `${elementType}-${id}`
}))
jest.mock('@Pimcore/modules/widget-manager/widget-manager-slice', () => ({
  closeWidget: (widgetId: string) => ({ type: 'widget-manager/closeWidget', payload: widgetId })
}))
jest.mock('@Pimcore/app/public-api/element/element-api', () => ({ elementOpeningService: { openElement: jest.fn() } }))
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  ApiError: jest.fn(),
  isApiErrorData: () => false
}))

const dispatch = jest.fn()
const confirm = jest.fn()
const lockElement = jest.fn()
const unlockElement = jest.fn()
const getEditlock = jest.fn()

const unwrapping = <T, >(value: T): { unwrap: () => Promise<T> } => ({ unwrap: async () => value })

interface ConfirmConfig {
  onOk: () => void
  onCancel: () => void
}

const lastConfirmConfig = (): ConfirmConfig => confirm.mock.calls[confirm.mock.calls.length - 1][0] as ConfirmConfig

// An editor whose draft is already dirty when it mounts, e.g. a field normalising its value on load.
const mountDirtyEditor = (): ReturnType<typeof renderHook> =>
  renderHook(() => { useEditLock({ id: 7, elementType: 'data-object', modified: true, path: '/Products/7' }) })

beforeEach(() => {
  jest.clearAllMocks()
  getEditlock.mockReturnValue(unwrapping({ isLocked: true, date: 1_794_300_000, user: { name: 'other' } }))
  lockElement.mockReturnValue(unwrapping(undefined))
  unlockElement.mockReturnValue(unwrapping(undefined))
})

describe('useEditLock', () => {
  it('warns when another user holds the lock', async () => {
    mountDirtyEditor()

    await waitFor(() => { expect(confirm).toHaveBeenCalledTimes(1) })
    expect(lockElement).not.toHaveBeenCalled()
  })

  it('closes the editor on cancel without opening it again', async () => {
    mountDirtyEditor()
    await waitFor(() => { expect(confirm).toHaveBeenCalledTimes(1) })

    act(() => { lastConfirmConfig().onCancel() })

    expect(dispatch).toHaveBeenCalledWith({ type: 'widget-manager/closeWidget', payload: 'data-object-7' })
    expect(elementOpeningService.openElement).not.toHaveBeenCalled()
  })

  it('does not loop back into the warning when the element is dirty on load (PEES-2012)', async () => {
    // Opening the element mounts a fresh editor, like the widget manager does.
    (elementOpeningService.openElement as jest.Mock).mockImplementation(async () => {
      mountDirtyEditor()
    })

    mountDirtyEditor()
    await waitFor(() => { expect(confirm).toHaveBeenCalledTimes(1) })

    act(() => { lastConfirmConfig().onCancel() })

    // Give a reopened editor the chance to run its lock check.
    await act(async () => { await Promise.resolve() })
    expect(confirm).toHaveBeenCalledTimes(1)
  })

  it('aborts the held autosave on cancel', async () => {
    mountDirtyEditor()
    const persistAllowed = awaitEditLockPersistAllowed('data-object', 7)
    await waitFor(() => { expect(confirm).toHaveBeenCalledTimes(1) })

    act(() => { lastConfirmConfig().onCancel() })

    await expect(persistAllowed).resolves.toBe(false)
  })

  it('takes the lock over on continue', async () => {
    mountDirtyEditor()
    const persistAllowed = awaitEditLockPersistAllowed('data-object', 7)
    await waitFor(() => { expect(confirm).toHaveBeenCalledTimes(1) })

    act(() => { lastConfirmConfig().onOk() })

    await expect(persistAllowed).resolves.toBe(true)
    expect(unlockElement).toHaveBeenCalledWith({ id: 7, elementType: 'data-object' })
    expect(lockElement).toHaveBeenCalledWith({ id: 7, elementType: 'data-object' })
    expect(dispatch).not.toHaveBeenCalled()
  })
})
