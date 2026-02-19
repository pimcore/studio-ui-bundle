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
import { Form, FormKit, Input, InputNumber, Select, Switch } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { kebabCase } from 'lodash'

export const FieldDefinitionLocalizedfieldsFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const typeTranslation = t('field-definition.' + kebabCase(props.type))
  const panelTitle = `${props.id} (${t('type')}: ${typeTranslation})`

  return (
    <>
      <FormKit.Panel title={ panelTitle }>
        <Form.Item
          label={ t('title') }
          name="title"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={ t('region') }
          name="region"
        >
          <Select
            options={ [
              { label: '', value: '' },
              { label: 'center', value: 'center' },
              { label: 'north', value: 'north' },
              { label: 'south', value: 'south' },
              { label: 'east', value: 'east' },
              { label: 'west', value: 'west' }
            ] }
          />
        </Form.Item>

        <Form.Item
          label={ t('layout') }
          name="layout"
        >
          <Select
            options={ [
              { label: '', value: '' },
              { label: 'fit', value: 'fit' }
            ] }
          />
        </Form.Item>

        <Form.Item name="border">
          <Switch labelRight={ t('border') } />
        </Form.Item>

        <Form.Item
          label={ t('width') }
          name="width"
          tooltip={ t('width-tooltip') }
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={ t('height') }
          name="height"
          tooltip={ t('height-tooltip') }
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={ t('tab-position') }
          name="tabPosition"
        >
          <Select
            options={ [
              { label: 'top', value: 'top' },
              { label: 'left', value: 'left' },
              { label: 'right', value: 'right' },
              { label: 'bottom', value: 'bottom' }
            ] }
          />
        </Form.Item>

        <Form.Item
          label={ t('maximum-tabs') }
          name="maxTabs"
        >
          <InputNumber
            min={ 0 }
            precision={ 0 }
          />
        </Form.Item>

        <Form.Item
          label={ t('hide-labels-when-tabs-reached') }
          name="hideLabelsWhenTabsReached"
        >
          <InputNumber
            min={ 0 }
            precision={ 0 }
          />
        </Form.Item>

        <Form.Item
          label={ t('label-width') }
          name="labelWidth"
        >
          <InputNumber
            min={ 0 }
            precision={ 0 }
          />
        </Form.Item>

        <Form.Item
          label={ t('label-align') }
          name="labelAlign"
        >
          <Select
            options={ [
              { label: 'left', value: 'left' },
              { label: 'top', value: 'top' }
            ] }
          />
        </Form.Item>

        <Form.Item name="provideSplitView">
          <Switch labelRight={ t('provide-split-view') } />
        </Form.Item>
      </FormKit.Panel>
    </>
  )
}
