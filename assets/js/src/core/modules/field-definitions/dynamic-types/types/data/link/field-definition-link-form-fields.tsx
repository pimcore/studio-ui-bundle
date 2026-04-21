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
import { Form, Select } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const FieldDefinitionLinkFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
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
            { label: t('link.text'), value: 'text' },
            { label: t('link.target'), value: 'target' },
            { label: t('link.parameters'), value: 'parameters' },
            { label: t('link.anchor'), value: 'anchor' },
            { label: t('link.title'), value: 'title' },
            { label: t('link.accesskey'), value: 'accesskey' },
            { label: t('link.rel'), value: 'rel' },
            { label: t('link.tabindex'), value: 'tabindex' },
            { label: t('link.class'), value: 'class' },
            { label: t('link.attributes'), value: 'attributes' }
          ] }
        />
      </Form.Item>
    </>
  )
}
