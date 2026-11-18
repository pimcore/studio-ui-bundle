/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Form } from '@Pimcore/components/form/form'
import { Text } from '@Pimcore/components/text/text'

// The admin only turns the welcome screen on: the dashboards an admin sees are not the ones the user can open
export const WelcomeScreenHelp = (): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Form.Conditional
      condition={ (values) => values.welcomeScreen === true }
      watchFields={ ['welcomeScreen'] }
    >
      <Text type="secondary">{t('user-management.welcomeScreen.help')}</Text>
    </Form.Conditional>
  )
}
