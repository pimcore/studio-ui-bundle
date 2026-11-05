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
import { Form, Input, Select, Switch } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const FieldDefinitionLocalizedfieldsFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  return (
    <>
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
            { label: t('center'), value: 'center' },
            { label: t('north'), value: 'north' },
            { label: t('south'), value: 'south' },
            { label: t('east'), value: 'east' },
            { label: t('west'), value: 'west' }
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

      {/* The tab settings, labelWidth and labelAlign are deliberately not offered.
          Studio renders one locale at a time, chosen with the global selector, so
          the tab settings can never mean anything here. labelWidth and labelAlign
          cannot be honoured either: Localizedfields uses Layout\Traits\LabelTrait,
          whose defaults are 100 and 'left', so every class definition sends them
          and a configured container is indistinguishable from an untouched one.
          The legacy Admin UI that used to consume them is archived, so offering
          controls the object editor ignores would only mislead. See #704. */}
    </>
  )
}
