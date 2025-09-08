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

  const renderInputItem = ({ label, name, disabled = false, tooltip }: { label: string, name: string, disabled?: boolean, tooltip?: string }): React.JSX.Element => (
    <Form.Item
      label={ label }
      name={ name }
      tooltip={ tooltip }
    >
      <Input disabled={ disabled } />
    </Form.Item>
  )

  return (
    <FormKit.Panel title={ t('reports.editor.general-settings.title') }>
      {renderInputItem({ label: t('reports.editor.general-settings.name-label'), name: 'name', disabled: true })}
      {renderInputItem({ label: t('reports.editor.general-settings.display-name-label'), name: 'niceName' })}
      {renderInputItem({ label: t('reports.editor.general-settings.icon-class-label'), name: 'iconClass' })}
      {renderInputItem({
        label: t('reports.editor.general-settings.group-label'),
        name: 'group',
        tooltip: t('reports.editor.general-settings.group-tooltip')
      })}
      {renderInputItem({ label: t('reports.editor.general-settings.report-class-label'), name: 'reportClass' })}
      {renderInputItem({ label: t('reports.editor.general-settings.group-icon-class-label'), name: 'groupIconClass' })}
      <Form.Item name="menuShortcut">
        <Switch labelRight={ t('reports.editor.general-settings.shortcut-menu-label') } />
      </Form.Item>
    </FormKit.Panel>
  )
}
