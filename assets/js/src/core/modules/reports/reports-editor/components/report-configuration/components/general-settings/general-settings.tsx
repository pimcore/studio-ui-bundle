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
import { FormKit } from '@Pimcore/components/form/form-kit'
import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { Switch } from '@Pimcore/components/switch/switch'

export const GeneralSettings = (): React.JSX.Element => {
  const { t } = useTranslation()

  const renderInputItem = ({ label, name, disabled = false }: { label: string, name: string, disabled?: boolean }): React.JSX.Element => (
    <Form.Item
      label={ label }
      name={ name }
    >
      <Input disabled={ disabled } />
    </Form.Item>
  )

  return (
    <FormKit.Panel title={ t('reports.editor.general-settings.title') }>
      {renderInputItem({ label: 'Name', name: 'name', disabled: true })}
      {renderInputItem({ label: 'Display Name', name: 'niceName' })}
      {renderInputItem({ label: 'Icon Class', name: 'iconClass' })}
      {renderInputItem({ label: 'Group', name: 'group' })}
      {renderInputItem({ label: 'Report Class', name: 'reportClass' })}
      {renderInputItem({ label: 'Group Icon Class', name: 'groupIconClass' })}
      <Form.Item name="menuShortcut">
        <Switch labelRight="Create Shortcut in Menu" />
      </Form.Item>
    </FormKit.Panel>
  )
}
