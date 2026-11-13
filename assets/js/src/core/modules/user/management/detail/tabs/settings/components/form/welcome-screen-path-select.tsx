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
import { Select } from '@Pimcore/components/select/select'
import { useMainNav } from '@Pimcore/modules/app/base-layout/main-nav/hooks/use-main-nav'
import { getWelcomeScreenNavItems } from '@Pimcore/modules/app/welcome-screen/welcome-screen-nav-items'

export const WelcomeScreenPathSelect = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { navItems } = useMainNav()

  const options = getWelcomeScreenNavItems(navItems).map((item) => ({
    value: item.path,
    label: t(`${item.label ?? item.path}`)
  }))

  // Hidden while the switch is off; the form keeps the value, so switching on again shows the same choice
  return (
    <Form.Conditional
      condition={ (values) => values.welcomeScreen === true }
      watchFields={ ['welcomeScreen'] }
    >
      <Form.Item
        label={ t('user-management.welcomeScreenPath') }
        name="welcomeScreenPath"
      >
        <Select
          optionFilterProp="label"
          options={ options }
          placeholder={ t('user-management.welcomeScreenPath') }
          showSearch
        />
      </Form.Item>
    </Form.Conditional>
  )
}
