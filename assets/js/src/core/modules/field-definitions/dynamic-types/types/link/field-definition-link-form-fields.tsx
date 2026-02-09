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
import { Form, FormKit, Input, Select } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const FieldDefinitionLinkFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const isCustomLayout = props.context.area.includes('custom-layout')

  return (
    <FormKit.Panel title={ t('specific-settings') }>
      {!isCustomLayout && (
        <>
          <Form.Item
            label={ t('allowed-types') }
            name="allowedTypes"
            tooltip={ t('empty-equals-allow-all-tooltip') }
          >
            <Select
              mode="multiple"
              options={ [
                { label: t('asset'), value: 'asset' },
                { label: t('document'), value: 'document' },
                { label: t('data-object'), value: 'object' }
              ] }
            />
          </Form.Item>

          <Form.Item
            label={ t('allowed-targets') }
            name="allowedTargets"
            tooltip={ t('empty-equals-allow-all-tooltip') }
          >
            <Select
              mode="multiple"
              options={ [
                { label: t('empty'), value: '' },
                { label: '_blank', value: '_blank' },
                { label: '_self', value: '_self' },
                { label: '_top', value: '_top' },
                { label: '_parent', value: '_parent' }
              ] }
            />
          </Form.Item>

          <Form.Item
            label={ t('disabled-fields') }
            name="disabledFields"
            tooltip={ t('empty-equals-allow-all-tooltip') }
          >
            <Select
              mode="multiple"
              options={ [
                { label: t('text'), value: 'text' },
                { label: t('target'), value: 'target' },
                { label: t('parameters'), value: 'parameters' },
                { label: t('anchor'), value: 'anchor' },
                { label: t('title'), value: 'title' },
                { label: t('accesskey'), value: 'accesskey' },
                { label: t('rel'), value: 'rel' },
                { label: t('tabindex'), value: 'tabindex' },
                { label: t('class'), value: 'class' },
                { label: t('attributes'), value: 'attributes' }
              ] }
            />
          </Form.Item>
        </>
      )}

    </FormKit.Panel>
  )
}
