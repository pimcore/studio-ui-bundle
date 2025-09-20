/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Form } from '@Pimcore/components/form/form'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { IconSelector } from '@Pimcore/components/icon-selector/icon-selector'
import { Input } from '@Pimcore/components/input/input'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const GeneralTab = (): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <FormKit.Panel
      collapsed={ false }
      collapsible
      title={ t('widget-editor.widget-form.general.title') }
    >
      <Form.Item
        label={ t('widget-editor.widget-form.general.name') }
        name="name"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={ t('widget-editor.widget-form.general.icon') }
        name="icon"
      >
        <IconSelector />
      </Form.Item>
    </FormKit.Panel>
  )
}
