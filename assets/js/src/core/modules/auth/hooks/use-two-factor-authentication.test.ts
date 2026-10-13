/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const mockLoginTwoFactor = jest.fn()
const mockConfirm = jest.fn()
const mockDisable = jest.fn()
const mockReset = jest.fn()
const mockTrackError = jest.fn()
const mockDispatch = jest.fn()
const CURRENT_USER_ID = 7

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: (error: unknown) => mockTrackError(error),
  ApiError: class {
    constructor (public readonly cause: unknown) {}
  }
}))
jest.mock('@Pimcore/modules/auth/authorization-api-slice.gen', () => ({
  useLoginTwoFactorMutation: () => [mockLoginTwoFactor]
}))
jest.mock('@Pimcore/modules/auth/user/user-api-slice.gen', () => ({
  useUserTwoFactorSetupMutation: () => [jest.fn()],
  useUserTwoFactorConfirmMutation: () => [mockConfirm],
  useUserTwoFactorDisableMutation: () => [mockDisable],
  useUserTwoFactorResetByIdMutation: () => [mockReset]
}))
jest.mock('@Pimcore/modules/auth/hooks/use-user', () => ({ useUser: () => ({ id: CURRENT_USER_ID }) }))
jest.mock('@Pimcore/modules/auth/user/user-slice', () => ({
  twoFactorAuthenticationChanged: (payload: unknown) => ({ type: 'profile', payload })
}))
jest.mock('@Pimcore/modules/user/user-management-slice', () => ({
  userTwoFactorAuthenticationChanged: (payload: unknown) => ({ type: 'user-management', payload })
}))
jest.mock('@sdk/app', () => ({ useAppDispatch: () => mockDispatch }))

// eslint-disable-next-line import/first
import { renderHook } from '@testing-library/react'
// eslint-disable-next-line import/first
import { getTwoFactorStep, TwoFactorCodeError, useTwoFactorAuthentication } from './use-two-factor-authentication'

const failWith = (status: number): { error: { status: number, data: object } } => ({ error: { status, data: {} } })

const reasonOf = async (promise: Promise<void>): Promise<string | undefined> => {
  try {
    await promise
    return undefined
  } catch (error) {
    return error instanceof TwoFactorCodeError ? error.reason : 'other'
  }
}

describe('getTwoFactorStep', () => {
  it('reads the step from the login answer and from the 401 of a pending login', () => {
    expect(getTwoFactorStep({ twoFactorRequired: true, twoFactorStep: 'verify' })).toBe('verify')
    expect(getTwoFactorStep({ message: 'Two-factor authentication is required.', twoFactorRequired: true, twoFactorStep: 'setup' })).toBe('setup')
  })

  it('finds no step in an empty login answer or an ordinary 401', () => {
    expect(getTwoFactorStep(null)).toBeUndefined()
    expect(getTwoFactorStep('')).toBeUndefined()
    expect(getTwoFactorStep({ error: 'Invalid credentials.' })).toBeUndefined()
    expect(getTwoFactorStep({ twoFactorRequired: true, twoFactorStep: 'other' })).toBeUndefined()
  })
})

describe('useTwoFactorAuthentication', () => {
  beforeEach(() => {
    mockLoginTwoFactor.mockReset()
    mockConfirm.mockReset()
    mockDisable.mockReset()
    mockReset.mockReset()
    mockTrackError.mockReset()
    mockDispatch.mockReset()
  })

  it('sends a login code to the login endpoint', async () => {
    mockLoginTwoFactor.mockResolvedValue({ data: null })
    const { result } = renderHook(() => useTwoFactorAuthentication())

    await result.current.verifyCode('123456')

    expect(mockLoginTwoFactor).toHaveBeenCalledWith({ twoFactorCode: { code: '123456' } })
  })

  it('tells a wrong login code from too many attempts', async () => {
    const { result } = renderHook(() => useTwoFactorAuthentication())

    mockLoginTwoFactor.mockResolvedValue(failWith(401))
    expect(await reasonOf(result.current.verifyCode('000000'))).toBe('invalid-code')

    mockLoginTwoFactor.mockResolvedValue(failWith(429))
    expect(await reasonOf(result.current.verifyCode('123456'))).toBe('too-many-attempts')

    expect(mockTrackError).not.toHaveBeenCalled()
  })

  it('tells a wrong profile code from an expired setup', async () => {
    const { result } = renderHook(() => useTwoFactorAuthentication())

    mockConfirm.mockResolvedValue(failWith(422))
    expect(await reasonOf(result.current.confirmSetup('000000'))).toBe('invalid-code')

    mockConfirm.mockResolvedValue(failWith(409))
    expect(await reasonOf(result.current.confirmSetup('123456'))).toBe('setup-expired')

    expect(mockTrackError).not.toHaveBeenCalled()
  })

  it('shows a confirmed setup in the profile and in user management', async () => {
    mockConfirm.mockResolvedValue({ data: null })
    const { result } = renderHook(() => useTwoFactorAuthentication())

    await result.current.confirmSetup('123456')

    const active = { enabled: true, active: true, type: 'google' }
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'user-management', payload: { id: CURRENT_USER_ID, twoFactorAuthentication: active } })
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'profile', payload: active })
  })

  it('shows disabling in the profile and in user management', async () => {
    mockDisable.mockResolvedValue({ data: null })
    const { result } = renderHook(() => useTwoFactorAuthentication())

    await result.current.disableTwoFactor()

    const inactive = { enabled: false, active: false, type: '' }
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'user-management', payload: { id: CURRENT_USER_ID, twoFactorAuthentication: inactive } })
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'profile', payload: inactive })
  })

  it('updates the profile only when the reset user is the current user', async () => {
    mockReset.mockResolvedValue({ data: null })
    const { result } = renderHook(() => useTwoFactorAuthentication())

    await result.current.resetUserTwoFactor(5)
    expect(mockDispatch.mock.calls.map(([action]) => action.type)).toEqual(['user-management'])

    mockDispatch.mockReset()
    await result.current.resetUserTwoFactor(CURRENT_USER_ID)
    expect(mockDispatch.mock.calls.map(([action]) => action.type)).toEqual(['user-management', 'profile'])
  })

  it('changes nothing when the request fails', async () => {
    mockConfirm.mockResolvedValue(failWith(422))
    mockReset.mockResolvedValue(failWith(403))
    const { result } = renderHook(() => useTwoFactorAuthentication())

    await reasonOf(result.current.confirmSetup('000000'))
    await reasonOf(result.current.resetUserTwoFactor(CURRENT_USER_ID))

    expect(mockDispatch).not.toHaveBeenCalled()
  })

  it('reports any other failure through trackError', async () => {
    mockConfirm.mockResolvedValue(failWith(500))
    const { result } = renderHook(() => useTwoFactorAuthentication())

    expect(await reasonOf(result.current.confirmSetup('123456'))).toBe('other')
    expect(mockTrackError).toHaveBeenCalledTimes(1)
  })
})
