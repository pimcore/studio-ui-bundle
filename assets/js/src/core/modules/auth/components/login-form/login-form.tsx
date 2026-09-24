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
import { Checkbox, Input } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '../../../../components/icon/icon'

interface ILoginFormProps {
  onPasswordForgotten?: () => void
}

export const LoginForm = ({ onPasswordForgotten }: ILoginFormProps): React.JSX.Element => {
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
        //
        // Reload rather than navigate: the login screen is rendered at the URL the
        // user asked for, so that URL is already the target, whatever it carries -
        // an OAuth `?authorization_id=…`, an element deep link, or nothing. Booting
        // the application again at the same address lets the route guard render the
        // route's own content now that the session exists.
        //
        // No computed destination is assigned here on purpose. A post-login target
        // read from anywhere other than the current address would be a redirect this
        // form performs on someone else's say-so, and reloading cannot leave the origin.
        await sendStatistics(user.isAdmin)

        globalThis.location.reload()
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
