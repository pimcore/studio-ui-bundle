/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export type TwoFactorStep = 'verify' | 'setup'

export interface TwoFactorSetupData {
  secret: string
  otpauthUri: string
}

export interface UseTwoFactorAuthenticationReturn {
  isAvailable: boolean
  getTwoFactorStep: (loginResponse: unknown) => TwoFactorStep | undefined
  verifyCode: (code: string) => Promise<void>
  loadSetup: () => Promise<TwoFactorSetupData>
  confirmSetup: (code: string) => Promise<void>
  resetUserTwoFactor: (userId: number) => Promise<void>
}

// Placeholder until the Studio backend provides the 2FA endpoints, see pimcore/studio-ui-bundle#3902
const notAvailable = async (): Promise<never> => {
  throw new Error('Two-factor authentication is not available yet')
}

export const useTwoFactorAuthentication = (): UseTwoFactorAuthenticationReturn => {
  return {
    isAvailable: false,
    getTwoFactorStep: () => undefined,
    verifyCode: notAvailable,
    loadSetup: notAvailable,
    confirmSetup: notAvailable,
    resetUserTwoFactor: notAvailable
  }
}
