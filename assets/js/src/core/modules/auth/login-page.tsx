/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { routes } from '@Pimcore/app/router/router'
import { LoginFormContainer } from '@Pimcore/modules/auth/components/login-form/login-form-container'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { sendStatistics } from '@Pimcore/modules/auth/services/statisticsService'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useIsAuthenticated } from './hooks/use-is-authenticated'
import { useStyle } from './login-page.styles'
import { isNil } from 'lodash'
import { useAuthentication } from './hooks/use-authentication'
import { useAppDispatch } from '@Pimcore/app/store'
import { setAuthState } from './auth-slice'
import { motion, type Variants } from 'framer-motion'

const widgetVariants: Variants = {
  hidden: {
    x: -50,
    opacity: 0,
    rotateY: -10,
    perspective: 1000
  },
  visible: {
    x: 0,
    opacity: 1,
    rotateY: 0,
    transition: {
      delay: 0.6,
      type: 'spring',
      stiffness: 120,
      damping: 14,
      mass: 0.8,
      when: 'beforeChildren',
      staggerChildren: 0.1
    }
  },
  loginExit: {
    x: -50,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    }
  }
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
}

export const LoginPage = (): React.JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const token: string | null = searchParams.get('token')
  const dispatch = useAppDispatch()

  const user = useUser()
  const { isAuthenticated } = useIsAuthenticated()
  const { loginWithToken } = useAuthentication()
  const { styles } = useStyle()
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (isAuthenticated === true) {
      setIsExiting(true)
    }
  }, [isAuthenticated])

  const handleExitComplete = (): void => {
    (async () => {
      const redirectPath: string = location?.state?.from?.pathname

      navigate(redirectPath ?? routes.root)

      await sendStatistics(user.isAdmin)
    })().catch(() => { })
  }

  useEffect(() => {
    if (!isNil(token)) {
      void loginWithToken(
        token,
        async () => {
          dispatch(setAuthState(true))
        },
        () => {
          navigate(routes.login)
        }
      )
    }
  }, [token])

  return (
    <motion.div
      className={ styles.loginPage }
      style={{ zIndex: 10 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1, transition: { duration: 0.2 } }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'url(/bundles/pimcorestudioui/img/login-bg.png) center / cover no-repeat',
          zIndex: 0
        }}
        variants={{
          loginExit: { opacity: 0, transition: { duration: 0.2 } },
          visible: { opacity: 1 }
        }}
        animate={isExiting ? "loginExit" : "visible"}
        exit="loginExit"
      />

      <motion.div
        className={ styles.loginWidget }
        variants={ widgetVariants }
        initial="hidden"
        animate={isExiting ? "loginExit" : "visible"}
        exit="loginExit"
        onAnimationComplete={(definition) => {
          if (definition === 'loginExit') {
            handleExitComplete()
          }
        }}
        style={{ zIndex: 2, transformStyle: 'preserve-3d' }}
      >
        <motion.img
          alt={ 'Pimcore Logo' }
          src={ '/bundles/pimcorestudioui/img/logo.png' }
          variants={ itemVariants }
          whileHover={{ scale: 1.05, rotate: 2, filter: 'drop-shadow(0px 0px 8px rgba(255,255,255,0.5))' }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
        <motion.div variants={ itemVariants }>
          <LoginFormContainer />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
