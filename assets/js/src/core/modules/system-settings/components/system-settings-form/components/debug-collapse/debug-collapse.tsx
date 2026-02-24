/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { CollapseItem } from '@Pimcore/components/collapse/collapse'
import { Form } from '@Pimcore/components/form/form'
import { TagInput } from '@Pimcore/components/tag-input/tag-input'
import { Switch } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const DebugCollapse = (): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <CollapseItem
      forceRender
      label={ t('system-settings.collapse.debug') }
    >
      <Form.Item
        label={ t('system-settings.form.debug.field.enable-debug') }
        name={ ['general', 'debug_admin_translations'] }
      >
        <Switch />
      </Form.Item>

      <Form.Item
        label={ t('system-settings.form.debug.field.email-addresses') }
        name={ ['email', 'debug', 'email_addresses'] }
      >
        <TagInput
          placeholder={ t('system-settings.form.debug.field.email-addresses.placeholder') }
        />
      </Form.Item>
    </CollapseItem>
  )
}
