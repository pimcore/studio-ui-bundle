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
import { type IReportConfigurationSectionProps } from '@Pimcore/modules/reports/reports-editor/types'

export const GeneralSettings = ({ currentData, updateFormData }: IReportConfigurationSectionProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <FormKit.Panel title={ t('reports.editor.general-settings.title') }>
      <Form.Item label="Name">
        <Input
          disabled
          value={ currentData.name }
        />
      </Form.Item>
      <Form.Item label="Display Name">
        <Input
          onChange={ (e) => { updateFormData({ niceName: e.target.value }) } }
          value={ currentData.niceName }
        />
      </Form.Item>
      <Form.Item label="Icon Class">
        <Input
          onChange={ (e) => { updateFormData({ iconClass: e.target.value }) } }
          value={ currentData.iconClass }
        />
      </Form.Item>
      <Form.Item label="Group">
        <Input
          onChange={ (e) => { updateFormData({ group: e.target.value }) } }
          value={ currentData.group }
        />
      </Form.Item>
      <Form.Item label="Report Class">
        <Input
          onChange={ (e) => { updateFormData({ reportClass: e.target.value }) } }
          value={ currentData.reportClass }
        />
      </Form.Item>
      <Form.Item label="Group Icon Class">
        <Input
          onChange={ (e) => { updateFormData({ groupIconClass: e.target.value }) } }
          value={ currentData.groupIconClass }
        />
      </Form.Item>
      <Switch
        labelRight="Create Shortcut in Menu"
        onChange={ (value) => { updateFormData({ menuShortcut: value }) } }
        value={ currentData.menuShortcut }
      />
    </FormKit.Panel>
  )
}
