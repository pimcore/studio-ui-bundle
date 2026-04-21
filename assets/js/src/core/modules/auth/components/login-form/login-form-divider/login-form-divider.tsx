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
import { componentConfig } from '@Pimcore/modules/app/component-registry/component-config'
import { useComponentRegistry } from '@Pimcore/modules/app/component-registry/use-component-registry'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface LoginFormDividerProps {
  hideCredentialsForm?: boolean
}

export const LoginFormDivider = ({ hideCredentialsForm = false }: LoginFormDividerProps): React.JSX.Element => {
  const { t } = useTranslation()
  const ComponentRegistry = useComponentRegistry()
  const slotComponents = ComponentRegistry.getSlotComponents(componentConfig.form.login.name)
  const hasOtherComponents = slotComponents.length > 1

  if (hideCredentialsForm || !hasOtherComponents) {
    return <></>
  }

  return (
    <Divider plain>{ t('login-form-additional-logins.or') }</Divider>
  )
}
