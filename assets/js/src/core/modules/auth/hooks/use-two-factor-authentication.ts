/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { type TwoFactorLoginStep, useLoginTwoFactorMutation } from '@Pimcore/modules/auth/authorization-api-slice.gen'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import {
  type TwoFactorAuthenticationData,
  type TwoFactorSetup,
  useUserTwoFactorConfirmMutation,
  useUserTwoFactorDisableMutation,
  useUserTwoFactorResetByIdMutation,
  useUserTwoFactorSetupMutation
} from '@Pimcore/modules/auth/user/user-api-slice.gen'
import { twoFactorAuthenticationChanged } from '@Pimcore/modules/auth/user/user-slice'
import { userTwoFactorAuthenticationChanged } from '@Pimcore/modules/user/user-management-slice'
import { useAppDispatch } from '@sdk/app'
import { type SerializedError } from '@reduxjs/toolkit'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'

export type TwoFactorStep = TwoFactorLoginStep['twoFactorStep']

export type TwoFactorSetupData = Pick<TwoFactorSetup, 'secret' | 'otpauthUri'>

export type TwoFactorCodeErrorReason = 'invalid-code' | 'too-many-attempts' | 'setup-expired'

export class TwoFactorCodeError extends Error {
  constructor (public readonly reason: TwoFactorCodeErrorReason) {
    super(reason)
  }
}

export interface UseTwoFactorAuthenticationReturn {
  verifyCode: (code: string) => Promise<void>
  loadSetup: () => Promise<TwoFactorSetupData>
  confirmSetup: (code: string) => Promise<void>
  resetUserTwoFactor: (userId: number) => Promise<void>
  disableTwoFactor: () => Promise<void>
}

type RequestError = FetchBaseQueryError | SerializedError

type TwoFactorState = Pick<TwoFactorAuthenticationData, 'enabled' | 'active' | 'type'>

const ACTIVE: TwoFactorState = { enabled: true, active: true, type: 'google' }
const INACTIVE: TwoFactorState = { enabled: false, active: false, type: '' }

// Both the login answer and the 401 of a login waiting for its code carry the step
export const getTwoFactorStep = (body: unknown): TwoFactorStep | undefined => {
  if (typeof body !== 'object' || body === null) {
    return undefined
  }

  const { twoFactorRequired, twoFactorStep } = body as Partial<TwoFactorLoginStep>

  if (twoFactorRequired !== true || (twoFactorStep !== 'verify' && twoFactorStep !== 'setup')) {
    return undefined
  }

  return twoFactorStep
}

const getStatus = (error: RequestError): number | undefined => {
  return 'status' in error && typeof error.status === 'number' ? error.status : undefined
}

// Tracks the API failure first, so the diagnostics are not lost behind the user-facing error
const trackedError = (error: RequestError, message: string): Error => {
  trackError(new ApiError(error))
  return new Error(message)
}

const throwCodeError = (error: RequestError, reasons: Partial<Record<number, TwoFactorCodeErrorReason>>): never => {
  const reason = reasons[getStatus(error) ?? 0]

  if (reason !== undefined) {
    throw new TwoFactorCodeError(reason)
  }

  throw trackedError(error, 'Two-factor request failed')
}

export const useTwoFactorAuthentication = (): UseTwoFactorAuthenticationReturn => {
  const [loginTwoFactor] = useLoginTwoFactorMutation()
  const [setup] = useUserTwoFactorSetupMutation()
  const [confirm] = useUserTwoFactorConfirmMutation()
  const [disable] = useUserTwoFactorDisableMutation()
  const [reset] = useUserTwoFactorResetByIdMutation()
  const dispatch = useAppDispatch()
  const currentUser = useUser()

  // The profile and user management hold their own copy of a user; both must show the change
  const applyTwoFactorState = (userId: number, state: TwoFactorState): void => {
    dispatch(userTwoFactorAuthenticationChanged({ id: userId, twoFactorAuthentication: state }))

    if (userId === currentUser.id) {
      dispatch(twoFactorAuthenticationChanged(state))
    }
  }

  // Also takes the first code of a setup during the login; /user/two-factor/confirm is closed until the login is done
  const verifyCode = async (code: string): Promise<void> => {
    const result = await loginTwoFactor({ twoFactorCode: { code } })

    if (result.error !== undefined) {
      throwCodeError(result.error, { 401: 'invalid-code', 429: 'too-many-attempts' })
    }
  }

  const loadSetup = async (): Promise<TwoFactorSetupData> => {
    const result = await setup()

    if (result.error !== undefined) {
      throw trackedError(result.error, 'Two-factor setup could not be created')
    }

    return result.data
  }

  const confirmSetup = async (code: string): Promise<void> => {
    const result = await confirm({ twoFactorCode: { code } })

    if (result.error !== undefined) {
      throwCodeError(result.error, { 409: 'setup-expired', 422: 'invalid-code' })
    }

    applyTwoFactorState(currentUser.id, ACTIVE)
  }

  const disableTwoFactor = async (): Promise<void> => {
    const result = await disable()

    if (result.error !== undefined) {
      throw trackedError(result.error, 'Two-factor authentication could not be disabled')
    }

    applyTwoFactorState(currentUser.id, INACTIVE)
  }

  const resetUserTwoFactor = async (userId: number): Promise<void> => {
    const result = await reset({ id: userId })

    if (result.error !== undefined) {
      throw trackedError(result.error, 'Two-factor authentication could not be reset')
    }

    applyTwoFactorState(userId, INACTIVE)
  }

  return {
    verifyCode,
    loadSetup,
    confirmSetup,
    resetUserTwoFactor,
    disableTwoFactor
  }
}
