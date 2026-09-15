/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { Accordion } from '@Pimcore/components/accordion/accordion'
import { useTranslation } from 'react-i18next'
import { Flex } from '@Pimcore/components/flex/flex'
import {
  useClassAllLayoutCollectionQuery
} from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { Select } from '@Pimcore/components/select/select'
import { Form } from 'antd'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { useLanguageLookup } from '@Pimcore/modules/translations/hooks/use-language-lookup'
import { buildLanguagePermissionOptions } from './language-options'

interface ISpecialSettings {
  localizedView: string[]
  localizedEdit: string[]
  layouts: string[]
  onValuesChange: (changedValues: any) => void
}

const SpecialSettings = ({ localizedView, localizedEdit, layouts, onValuesChange }: ISpecialSettings): React.JSX.Element => {
  const { t } = useTranslation()
  const { data } = useClassAllLayoutCollectionQuery()
  const { validLanguages } = useSettings()
  const { getDisplayName } = useLanguageLookup()

  const [form] = Form.useForm()

  const availableLanguages: string[] = Array.isArray(validLanguages) ? (validLanguages as string[]) : []
  const languageOptions = buildLanguagePermissionOptions(availableLanguages, getDisplayName, t('default'))

  const layoutOptions: Array<{ value: string, label: string }> = data?.items.map((layout) => ({
    value: layout.id,
    label: layout.name ?? ''
  })).sort((a, b) => a.label.localeCompare(b.label)) ?? []

  const sortByLabel = (values: string[], options: Array<{ value: string, label: string }>): string[] => {
    const labelMap = new Map(options.map((o) => [o.value, o.label ?? '']))
    return [...values].sort((a, b) => (labelMap.get(a) ?? '').localeCompare(labelMap.get(b) ?? ''))
  }

  useEffect(() => {
    form.setFieldsValue({
      localizedView: sortByLabel(localizedView, languageOptions),
      localizedEdit: sortByLabel(localizedEdit, languageOptions),
      layouts: sortByLabel(layouts, layoutOptions)
    })
  }, [])

  return (
    <Form
      form={ form }
      layout="vertical"
      onValuesChange={ onValuesChange }
    >
      <Flex
        gap={ 'small' }
        vertical
      >
        <Accordion
          activeKey={ 'localizedFields' }
          bordered
          items={ [
            {
              key: 'localizedFields',
              title: <>{ t('user-management.workspaces.localized-fields') }</>,
              children: <>
                <Form.Item
                  label={ t('user-management.workspaces.localized-fields.view') }
                  name="localizedView"
                  normalize={ (values: string[]) => sortByLabel(values, languageOptions) }
                >
                  <Select
                    mode="multiple"
                    options={ languageOptions }
                    placeholder={ t('user-management.workspaces.localized-fields.view') }
                  ></Select>
                </Form.Item>

                <Form.Item
                  label={ t('user-management.workspaces.localized-fields.edit') }
                  name="localizedEdit"
                  normalize={ (values: string[]) => sortByLabel(values, languageOptions) }
                >
                  <Select
                    mode="multiple"
                    options={ languageOptions }
                    placeholder={ t('user-management.workspaces.localized-fields.edit') }
                  ></Select>
                </Form.Item>
              </>
            }
          ]
                    }
          size={ 'small' }
        />

        <Accordion
          activeKey={ 'customLayouts' }
          bordered
          items={ [
            {
              key: 'customLayouts',
              title: <>{ t('user-management.workspaces.custom-layouts') }</>,
              children: <Form.Item
                label={ t('user-management.workspaces.custom-layouts.select') }
                name="layouts"
                normalize={ (values: string[]) => sortByLabel(values, layoutOptions) }
                        >
                <Select
                  mode="multiple"
                  options={ layoutOptions }
                  placeholder={ t('user-management.workspaces.custom-layouts.select') }
                ></Select>
              </Form.Item>
            }
          ]
                    }
          size={ 'small' }
        />
      </Flex>
    </Form>
  )
}

export { SpecialSettings }
