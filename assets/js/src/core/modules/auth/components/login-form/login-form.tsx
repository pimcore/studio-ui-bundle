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
import { type Credentials, useLoginMutation } from '@Pimcore/modules/auth/authorization-api-slice.gen'
import { useStyle } from '@Pimcore/modules/auth/components/login-form/login-form-style'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { sendStatistics } from '@Pimcore/modules/auth/services/statisticsService'
import { routes } from '@Pimcore/app/router/router'
import { Checkbox, Input } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { Icon } from '../../../../components/icon/icon'

interface ILoginFormProps {
  onPasswordForgotten?: () => void
}

export const LoginForm = ({ onPasswordForgotten }: ILoginFormProps): React.JSX.Element => {
  const location = useLocation()
  const user = useUser()
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
        // Keep the login screen visible until the reload: do NOT flip the auth
        // state (that would start the app's intro/fade animation). Auth is
        // re-established from the session cookie on the fresh boot. The submit
        // button stays in its loading state because we return before clearing it.
        // Preserve the full return target (path AND query) so deep links that
        // carry state — e.g. the OAuth `?authorization_id=…` — survive the
        // login round-trip. Restoring only the pathname would drop the id and
        // the consent screen would 404 ("expired").
        const from = (location.state as { from?: { pathname?: string, search?: string } } | null)?.from
        const redirectPath: string = from?.pathname !== undefined
          ? `${from.pathname}${from.search ?? ''}`
          : routes.root

        await sendStatistics(user.isAdmin)

        window.location.href = redirectPath
        return
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
