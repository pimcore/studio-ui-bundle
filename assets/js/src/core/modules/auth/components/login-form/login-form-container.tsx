/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Checkbox, Input } from 'antd'
import { Button } from '@Pimcore/components/button/button'
import React, { useState } from 'react'
import { useStyle } from '@Pimcore/modules/auth/components/login-form/login-form-style'
import { useDispatch } from 'react-redux'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { useTranslation } from 'react-i18next'
import { Icon } from '../../../../components/icon/icon'
import { type Credentials, useLoginMutation } from '@Pimcore/modules/auth/authorization-api-slice.gen'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { setAuthState } from '@Pimcore/modules/auth/auth-slice'
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
  const dispatch = useDispatch()
  const { styles } = useStyle()
  const messageApi = useMessage()
  const { t } = useTranslation()
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
