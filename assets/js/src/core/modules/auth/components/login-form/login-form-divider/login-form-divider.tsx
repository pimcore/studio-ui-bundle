/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Divider } from '@Pimcore/components/divider/divider'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface LoginFormDividerProps {
  hideCredentialsForm?: boolean
}

export const LoginFormDivider = ({ hideCredentialsForm = false }: LoginFormDividerProps): React.JSX.Element => {
  const { t } = useTranslation()

  if (hideCredentialsForm) {
    return <></>
  }

  return (
    <Divider plain>{ t('login-form-additional-logins.or') }</Divider>
  )
}
