/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { FormKit } from '@sdk/components'
import { isNil } from 'lodash'
import React, { useMemo } from 'react'
import { Input } from '@Pimcore/components/input/input'
import { Form } from '@Pimcore/components/form/form'
import { Switch } from 'antd'
import { useTranslation } from 'react-i18next'
import { type FormItemAnnotation } from '@Pimcore/components/form/annotations/form-annotations-provider'
import { SelectOptionUsagesGrid } from './select-option-usages-grid'
import { SelectOptionEntriesGrid } from './select-option-entries-grid'

export interface SelectOptionGeneralSettingsFormFieldsProps {
  /** the entries grid reads only; the form around it decides for the inputs (`disabled`) */
  readOnly?: boolean
  /** a review of a list that may not exist yet has no usages to ask for */
  showUsages?: boolean
  /** what a change does to each entry, keyed by the option's value */
  entryAnnotations?: Record<string, FormItemAnnotation>
}

export const SelectOptionGeneralSettingsFormFields = ({
  readOnly = false, showUsages = true, entryAnnotations
}: SelectOptionGeneralSettingsFormFieldsProps = {}): React.JSX.Element => {
  const { t } = useTranslation()
  const form = Form.useFormInstance()
  const selectOptionId = form.getFieldValue('id') as string | undefined

  return useMemo(() => (
    <>
      <FormKit.Panel title={ t('select-option.general-settings.title') }>
        <Form.Item
          label={ t('select-option.general-settings.enum-name') }
          name="enumName"
        >
          <Input readOnly />
        </Form.Item>

        <Form.Item
          label={ t('select-option.general-settings.use-traits') }
          name="useTraits"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={ t('select-option.general-settings.implements-interfaces') }
          name="implementsInterfaces"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={ t('select-option.general-settings.group') }
          name="group"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={ t('select-option.general-settings.admin-only') }
          name="adminOnly"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </FormKit.Panel>

      <FormKit.Panel title={ t('select-option.entries.title') }>
        <Form.Item name="selectOptions">
          <SelectOptionEntriesGrid
            annotations={ entryAnnotations }
            readOnly={ readOnly }
          />
        </Form.Item>
      </FormKit.Panel>

      {showUsages && !isNil(selectOptionId) && (
        <FormKit.Panel title={ t('select-option.general-settings.usages.title') }>
          <SelectOptionUsagesGrid selectOptionId={ selectOptionId } />
        </FormKit.Panel>
      )}
    </>
  ), [selectOptionId, readOnly, showUsages, entryAnnotations])
}
