/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useGeneralSettings } from '@Pimcore/modules/field-definitions/components/editor/items/detail/general-settings-provider'
import { FormKit, Input, Switch, TextArea } from '@sdk/components'
import { Form } from 'antd'
import { isNil } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const ObjectBrickCustomLayoutGeneralSettingsFormFields = (): React.JSX.Element => {
  const { generalSettings } = useGeneralSettings()
  const { t } = useTranslation()

  if (isNil(generalSettings)) {
    return <></>
  }

  return (
    <FormKit.Panel title={ t('general') }>
      <Form.Item
        label={ t('name') }
        name="name"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={ t('class-definition.custom-layouts.default-layout') }
        name="default"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item
        label={ t('description') }
        name="description"
      >
        <TextArea rows={ 3 } />
      </Form.Item>
    </FormKit.Panel>
  )
}
