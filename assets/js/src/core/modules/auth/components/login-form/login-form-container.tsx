/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useStyle } from '@Pimcore/modules/auth/components/login-form/login-form-style'
import { useLogoutMutation } from '@Pimcore/modules/auth/authorization-api-slice.gen'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { sendStatistics } from '@Pimcore/modules/auth/services/statisticsService'
import React, { useState } from 'react'
import { useTwoFactorAuthentication, type TwoFactorStep } from '../../hooks/use-two-factor-authentication'
import { ForgotPasswordForm } from '../forgot-password-form/forgot-password-form'
import { TwoFactorForm } from '../two-factor-form/two-factor-form'
import { TwoFactorSetupForm } from '../two-factor-setup-form/two-factor-setup-form'
import { LoginForm } from './login-form'

type LoginStep = 'login' | 'forgot-password' | TwoFactorStep

export const LoginFormContainer = (): React.JSX.Element => {
  const { styles } = useStyle()
  const user = useUser()
  const [step, setStep] = useState<LoginStep>('login')
  const [logout] = useLogoutMutation()
  const { verifyCode, loadSetup, confirmSetup } = useTwoFactorAuthentication()

  const completeLogin = async (): Promise<void> => {
    await sendStatistics(user.isAdmin)
    globalThis.location.reload()
  }

  const handleVerify = async (code: string): Promise<void> => {
    await verifyCode(code)
    await completeLogin()
  }

  const handleConfirmSetup = async (code: string): Promise<void> => {
    await confirmSetup(code)
    await completeLogin()
  }

  const handleCancelTwoFactor = (): void => {
    void logout().finally(() => { setStep('login') })
  }

  return (
    <div className={ styles.form }>
      {step === 'forgot-password' && (
        <ForgotPasswordForm
          onGetBack={ () => { setStep('login') } }
        />
      )}

      {step === 'verify' && (
        <TwoFactorForm
          onGetBack={ handleCancelTwoFactor }
          onVerify={ handleVerify }
        />
      )}

      {step === 'setup' && (
        <TwoFactorSetupForm
          loadSetup={ loadSetup }
          onConfirm={ handleConfirmSetup }
          onGetBack={ handleCancelTwoFactor }
        />
      )}

      {step === 'login' && (
        <LoginForm
          onPasswordForgotten={ () => { setStep('forgot-password') } }
          onTwoFactorRequired={ setStep }
        />
      )}
    </div>
  )
}
