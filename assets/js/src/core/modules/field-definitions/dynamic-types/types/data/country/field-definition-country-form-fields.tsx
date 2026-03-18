/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type FieldDefinitionAbstractFormFieldsProps } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract'
import { Form, Input, Select } from '@sdk/components'
import React, { useMemo } from 'react'
import { isString } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useSettingsCountryCollectionQuery } from '@Pimcore/modules/app/settings/settings-slice-enhanced'

export const FieldDefinitionCountryFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { data: countriesData } = useSettingsCountryCollectionQuery()
  const isCustomLayout = props.context.area.includes('custom-layout')

  const countryOptions = useMemo(() => {
    return countriesData?.items?.map((country) => ({
      label: country.name,
      value: country.code
    })) ?? []
  }, [countriesData])
  return (
    <>
      <Form.Item
        label={ t('width') }
        name="width"
        tooltip={ t('width-tooltip') }
      >
        <Input />
      </Form.Item>

      {!isCustomLayout && (
      <>
        <Form.Item
          getValueFromEvent={ (value: string[]) => value.join(',') }
          getValueProps={ (value: string | string[]) => ({
            value: isString(value) ? value.split(',').filter(Boolean) : value
          }) }
          label={ t('restrict-selection-to') }
          name="restrictTo"
        >
          <Select
            mode="multiple"
            options={ countryOptions }
            showSearch
          />
        </Form.Item>

        <Form.Item
          label={ t('default-value') }
          name="defaultValue"
        >
          <Select
            options={ countryOptions }
            showSearch
          />
        </Form.Item>
      </>
      )
        }
    </>
  )
}
