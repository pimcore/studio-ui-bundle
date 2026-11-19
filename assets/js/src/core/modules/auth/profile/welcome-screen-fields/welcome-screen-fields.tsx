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
import { Switch } from '@Pimcore/components/switch/switch'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type WelcomeScreenRegistry } from '@Pimcore/modules/app/welcome-screen/services/welcome-screen-registry'

export const WelcomeScreenFields = (): React.JSX.Element => {
  const { t } = useTranslation()
  const welcomeScreen = Form.useWatch('welcomeScreen', Form.useFormInstance())
  const options = container.get<WelcomeScreenRegistry>(serviceIds['WelcomeScreen/Registry']).getOptions()
    .map((option) => ({ value: option.target, label: option.label }))

  return (
    <>
      <Form.Item
        name="welcomeScreen"
        style={ welcomeScreen === true ? { marginBottom: 0 } : undefined }
      >
        <Switch labelRight={ t('user-management.welcomeScreen') } />
      </Form.Item>

      {welcomeScreen === true && (
        <Form.Item
          // antd shows the placeholder only for undefined: no choice or a target the user can no longer open
          getValueProps={ (value?: string | null) => ({ value: options.some((option) => option.value === value) ? value : undefined }) }
          name="welcomeScreenTarget"
        >
          <Select
            aria-label={ t('user-management.welcomeScreenDashboard') }
            optionFilterProp="label"
            options={ options }
            placeholder={ t('user-management.welcomeScreenDashboard.placeholder') }
            showSearch
          />
        </Form.Item>
      )}
    </>
  )
}
