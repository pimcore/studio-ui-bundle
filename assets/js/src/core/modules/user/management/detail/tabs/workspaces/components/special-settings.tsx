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

  useEffect(() => {
    form.setFieldsValue({
      localizedView,
      localizedEdit,
      layouts
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
                >
                  <Select
                    mode="multiple"
                    options={ validLanguages.map((lang: string) => ({
                      value: lang,
                      label: getDisplayName(lang)
                    })) }
                    placeholder={ t('user-management.workspaces.localized-fields.view') }
                  ></Select>
                </Form.Item>

                <Form.Item
                  label={ t('user-management.workspaces.localized-fields.edit') }
                  name="localizedEdit"
                >
                  <Select
                    mode="multiple"
                    options={ validLanguages.map((lang: string) => ({
                      value: lang,
                      label: getDisplayName(lang)
                    })) }
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
              >
                  <Select
                      mode="multiple"
                      options={ data?.items.map((layout) => ({
                          value: layout.id,
                          label: layout.name
                      })) }
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
