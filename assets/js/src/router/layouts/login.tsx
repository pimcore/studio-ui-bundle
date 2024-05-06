import React from 'react'
import { createStyles } from 'antd-style'
import { type IAdditionalLogins, LoginForm } from '@Pimcore/components/login-form/login-form'

const useStyle = createStyles(({ token, css }) => {
  return {
    loginPage: css`
        display: flex;
        align-items: center;
        background: url(/bundles/pimcorestudioui/img/login-bg.png) lightgray 50% / cover no-repeat;
        position: absolute;
        inset: 0;
        overflow: hidden;
    `,
    loginWidget: css`
        display: flex;
        flex-direction: column;
        width: 503px;
        height: 608px;
        flex-shrink: 0;
        border-radius: 8px;
        background: linear-gradient(335deg, rgba(255, 255, 255, 0.86) 1.72%, rgba(57, 14, 97, 0.86) 158.36%);
        padding: 83px 100px 0 100px;
        margin-left: 80px;
        
        /* Component/Button/primaryShadow */
        box-shadow: 0px 2px 0px 0px rgba(114, 46, 209, 0.10);
        
        img {
            margin-bottom: 50px
        }
    `
  }
})

export default function LoginLayout (): React.JSX.Element {
  const { styles } = useStyle()
  const additionalLogins: IAdditionalLogins[] = [
    {
      key: 'google',
      name: 'Log in with Google',
      link: '/admin/login/google'
    },
    {
      key: 'github',
      name: 'Log in with GitHub',
      link: '/admin/login/github'
    }
  ]

  return (
    <div
      className={ styles.loginPage }
    >
      <div className={ styles.loginWidget }>
        <img
          alt={ 'Pimcore Logo' }
          src={ '/bundles/pimcorestudioui/img/logo.png' }
        />
        <LoginForm additionalLogins={ additionalLogins } />
      </div>
    </div>
  )
}
