/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { Checkbox, Input } from 'antd'
import { Button } from '@Pimcore/components/button/button'
import React, { useState } from 'react'
// import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons-old'
import { useStyle } from '@Pimcore/components/login-form/login-form-style'
import { useDispatch } from 'react-redux'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { useTranslation } from 'react-i18next'
import { setUser } from '@Pimcore/modules/auth/user/user-slice'
import { Icon } from '../icon/icon'
import { type Credentials, useLoginMutation } from '@Pimcore/modules/auth/authorization-api-slice.gen'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'

export interface IAdditionalLogins {
  key: string
  name: string
  link: string
}

interface ILoginFormProps {
  additionalLogins?: IAdditionalLogins[]
}

export const LoginForm = ({ additionalLogins }: ILoginFormProps): React.JSX.Element => {
  const dispatch = useDispatch()
  const { styles } = useStyle()
  const messageApi = useMessage()
  const { t } = useTranslation()

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

      setIsLoginLoading(false)

      const userInformation = response.data!
      dispatch(setUser(userInformation))
    } catch (e: any) {
      setIsLoginLoading(false)

      await messageApi.error({
        content: e.message
      })
    }
  }

  return (
    <div className={ styles.form }>
      <form onSubmit={ handleAuthentication }>
        <Input
          onChange={ (e) => { setFormState({ ...formState, username: e.target.value }) } }
          placeholder="Username"
          prefix={ <Icon value="user" /> }
        />
        <Input.Password
          // iconRender={ (visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />) }
          onChange={ (e) => { setFormState({ ...formState, password: e.target.value }) } }
          placeholder="Password"
        />
        <div className={ 'flex-space' }>
          <Checkbox
            aria-label={ t('aria.login-form-additional-logins.remember-me-checkbox') }
          >
            {t('login-form.remember-me')}
          </Checkbox>
          <Button type={ 'link' }>{t('login-form.forgot-password')}</Button>
        </div>

        <Button
          htmlType="submit"
          loading={ isLoginLoading }
          type="primary"
        >
          {t('login-form.login')}
        </Button>
      </form>

      {Array.isArray(additionalLogins) && (
        <div className={ 'login__additional-logins' }>
          <p>{t('login-form-additional-logins.or')}</p>

          {additionalLogins?.map((login) => (
            <Button
              aria-label={ `${t('aria.login-form-additional-logins.additional-login-provider')} ${login.name}` }
              href={ login.link }
              key={ login.key }
              type={ 'primary' }
            >
              {login.name}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
