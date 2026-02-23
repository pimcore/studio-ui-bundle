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
import { Form, FormKit, Input, Select, Switch } from '@sdk/components'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { kebabCase } from 'lodash'

export const FieldDefinitionLayoutFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const form = Form.useFormInstance()
  const collapsible = Form.useWatch('collapsible')

  useEffect(() => {
    if (collapsible === false) {
      form.setFieldValue('collapsed', false)
    }
  }, [collapsible, form])

  const { t } = useTranslation()
  const typeTranslation = t('field-definition.' + kebabCase(props.type))
  const panelTitle = `${props.id} (${t('type')}: ${typeTranslation})`

  return (
    <FormKit.Panel
      contentPadding={ { bottom: 'none', top: 'small', x: 'small' } }
      title={ panelTitle }
    >
      <Form.Item
        label={ t('name') }
        name="name"
      >
        <Input />
      </Form.Item>

      {props.context.hideRegion !== true && (
      <Form.Item
        label={ t('region') }
        name="region"
      >
        <Select options={ [
          { label: t('center'), value: 'center' },
          { label: t('north'), value: 'north' },
          { label: t('south'), value: 'south' },
          { label: t('east'), value: 'east' },
          { label: t('west'), value: 'west' }
        ] }
        />
      </Form.Item>
      )}

      {props.context.hideTitle !== true && (
        <Form.Item
          label={ t('title') }
          name="title"
        >
          <Input />
        </Form.Item>
      )}

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

      {props.context.hideCollapsible !== true && (
      <>
        <Form.Item
          name="collapsible"
        >
          <Switch labelRight={ t('collapsible') } />
        </Form.Item>

        <Form.Item name="collapsed">
          <Switch labelRight={ t('collapsed') } />
        </Form.Item>
      </>
      )}
    </FormKit.Panel>
  )
}
