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
import React, { useState } from 'react'
import { ForgotPasswordForm } from '../forgot-password-form/forgot-password-form'
import { LoginForm } from './login-form'

export interface IAdditionalLogins {
  key: string
  name: string
  link: string
}

interface ILoginFormProps {
  additionalLogins?: IAdditionalLogins[]
}

export const LoginFormContainer = ({ additionalLogins }: ILoginFormProps): React.JSX.Element => {
  const { styles } = useStyle()
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false)

  return (
    <div className={styles.form}>
      {showForgotPassword && <ForgotPasswordForm
        onGetBack={() => setShowForgotPassword(false)}
      />}


      {!showForgotPassword && <LoginForm
        additionalLogins={additionalLogins}
        onPasswordForgotten={() => setShowForgotPassword(true)}
      />}
    </div>
  )
}
