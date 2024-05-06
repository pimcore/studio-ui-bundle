import { Button, Checkbox, Input } from 'antd'
import React from 'react'
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from '@ant-design/icons'
import { useStyle } from '@Pimcore/components/login-form/login-form-style'
import { type LoginRequest, useLoginMutation } from '@Pimcore/components/login-form/services/auth'
import { useDispatch } from 'react-redux'
import { setCredentials } from '@Pimcore/app/auth/authSlice'
import { useMessage } from '@Pimcore/components/message/useMessage'

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
  const [messageApi, contextHolder] = useMessage()

  const [formState, setFormState] = React.useState<LoginRequest>({
    username: '',
    password: ''
  })

  const [login, { isLoading }] = useLoginMutation()

  const handleAuthentication = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault()
      const user = await login(formState).unwrap()
      console.log(user)
      dispatch(setCredentials({
        user: {
          username: user.username
        },
        token: user.token
      }))

      console.log('worked', user)
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      messageApi.error({
        content: error.data.message
      })
    }
  }

  return (
    <>
      {contextHolder}
      <div className={ styles.form }>
        <form onSubmit={ handleAuthentication }>
          <Input
            onChange={ (e) => { setFormState({ ...formState, username: e.target.value }) } }
            placeholder="Username"
            prefix={ <UserOutlined /> }
          />
          <Input.Password
            iconRender={ (visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />) }
            onChange={ (e) => { setFormState({ ...formState, password: e.target.value }) } }
            placeholder="Password"
          />
          <div className={ 'flex-space' }>
            <Checkbox>
              Remember me
            </Checkbox>
            <Button type={ 'link' }>Forgot password</Button>
          </div>

          <Button
            htmlType="submit"
            loading={ isLoading }
            type="primary"
          >
            Log in
          </Button>
        </form>

        {Array.isArray(additionalLogins) && (
          <div className={ 'login__additional-logins' }>
            <p>or</p>

            {additionalLogins?.map((login) => (
              <Button
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
    </>
  )
}
