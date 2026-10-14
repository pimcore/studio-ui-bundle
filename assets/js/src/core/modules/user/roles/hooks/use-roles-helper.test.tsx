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
import { useRoleHelper } from './use-roles-helper'

const mockDispatch = jest.fn()
const mockMessageError = jest.fn()
const mockMessageSuccess = jest.fn()

jest.mock('@sdk/app', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: () => undefined
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/modules/user/roles/roles-api-slice.gen', () => ({
  api: {
    endpoints: {
      roleUpdateById: { initiate: (arg: unknown) => ({ endpoint: 'roleUpdateById', arg }) }
    }
  }
}))

jest.mock('@Pimcore/modules/user/roles/roles-slice', () => ({
  roleOpened: jest.fn(),
  roleClosed: jest.fn(),
  roleUpdated: (payload: unknown) => ({ type: 'role/roleUpdated', payload })
}))

jest.mock('@Pimcore/components/message/useMessage', () => ({
  useMessage: () => ({ error: mockMessageError, success: mockMessageSuccess })
}))

const setupDispatch = (result: Record<string, unknown>): void => {
  mockDispatch.mockImplementation((action: { endpoint?: string }): unknown =>
    action.endpoint !== undefined ? Promise.resolve(result) : action
  )
}

const dispatchedRoleUpdated = (): unknown[] =>
  mockDispatch.mock.calls
    .map(([action]) => action)
    .filter((action) => action?.type === 'role/roleUpdated')

const role = { id: 7, name: 'editors', perspectives: [] } as any

describe('useRoleHelper.updateRoleById', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('keeps the role marked as modified when the update fails', async () => {
    setupDispatch({ error: { status: 422, data: { message: 'Validation failed' } } })

    const { result } = renderHook(() => useRoleHelper())
    await result.current.updateRoleById({ id: 7, item: role })

    expect(dispatchedRoleUpdated()).toEqual([])
    expect(mockMessageError).toHaveBeenCalledWith('Validation failed')
  })

  it('marks the role as saved on success', async () => {
    setupDispatch({ data: role })

    const { result } = renderHook(() => useRoleHelper())
    await result.current.updateRoleById({ id: 7, item: role })

    expect(dispatchedRoleUpdated()).toEqual([{ type: 'role/roleUpdated', payload: 7 }])
    expect(mockMessageSuccess).toHaveBeenCalledWith('roles.save-item.success')
  })
})
