/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Button } from '@Pimcore/components/button/button'
import { useMessage } from '@Pimcore/components/message/useMessage'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { componentConfig } from '@Pimcore/modules/app/component-registry/component-config'
import { SlotRenderer } from '@Pimcore/modules/app/component-registry/slot-renderer'
import { setAuthState } from '@Pimcore/modules/auth/auth-slice'
import { type Credentials, useLoginMutation } from '@Pimcore/modules/auth/authorization-api-slice.gen'
import { useStyle } from '@Pimcore/modules/auth/components/login-form/login-form-style'
import { Checkbox, Input } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Icon } from '../../../../components/icon/icon'

interface ILoginFormProps {
  onPasswordForgotten?: () => void
}

export const LoginForm = ({ onPasswordForgotten }: ILoginFormProps): React.JSX.Element => {
  const dispatch = useDispatch()
  const { styles } = useStyle()
  const messageApi = useMessage()
  const { t } = useTranslation()
  const [hideCredentialsForm, setHideCredentialsForm] = useState<boolean>(false)

  const [formState, setFormState] = useState<Credentials>({
    username: '',
    password: ''
  })

  const [login] = useLoginMutation()
  // Use manual isLoading state because the rtkQueryErrorLogger prevents this action on 401 error
  const [isLoginLoading, setIsLoginLoading] = useState(false)

  const handleAuthentication = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    const loginTask = login({ credentials: formState })

    setIsLoginLoading(true)

    loginTask.catch((error: Error) => {
      setIsLoginLoading(false)
      trackError(new ApiError(error))
    })

    try {
      event.preventDefault()
      const response = (await loginTask)

      if (response.error !== undefined) {
        trackError(new ApiError(response.error))
      }

      if (response.error === undefined) {
        dispatch(setAuthState(true))
      }

      setIsLoginLoading(false)
    } catch (e: any) {
      setIsLoginLoading(false)

      await messageApi.error({
        content: e.message
      })
    }
  }

  return (
    <div className={ styles.form }>
      {!hideCredentialsForm && (
      <form onSubmit={ handleAuthentication }>
        <Input
          aria-label={ t('login-form.username') }
          autoComplete="username"
          name={ 'username' }
          onChange={ (e) => { setFormState({ ...formState, username: e.target.value }) } }
          placeholder={ t('login-form.username') }
          prefix={ <Icon value="user" /> }
        />
        <Input.Password
          aria-label={ t('login-form.password') }
          autoComplete="current-password"
          name={ 'password' }
          onChange={ (e) => { setFormState({ ...formState, password: e.target.value }) } }
          placeholder={ t('login-form.password') }
        />
        <div className={ 'flex-space' }>
          <Checkbox
            aria-label={ t('aria.login-form-additional-logins.remember-me-checkbox') }
          >
            {t('login-form.remember-me')}
          </Checkbox>
          <Button
            onClick={ onPasswordForgotten }
            style={ { paddingLeft: 0, paddingRight: 0 } }
            type={ 'link' }
          >
            {t('login-form.forgot-password')}
          </Button>
        </div>

        <Button
          htmlType="submit"
          loading={ isLoginLoading }
          type="primary"
        >
          {t('login-form.login')}
        </Button>
      </form>
      )}

      <SlotRenderer
        props={ { hideCredentialsForm, onHideCredentialsForm: setHideCredentialsForm } }
        slot={ componentConfig.form.login.name }
      />
    </div>
  )
}
