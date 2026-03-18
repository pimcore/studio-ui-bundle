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
import { Form, Input } from '@sdk/components'
import React from 'react'
import { t } from 'i18next'

export const FieldDefinitionIframeFormFields = (props: FieldDefinitionAbstractFormFieldsProps): React.JSX.Element => {
  return (
    <>
      <Form.Item
        label={ t('iframe-url') }
        name="iframeUrl"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={ t('rendering-data') }
        name="renderingData"
      >
        <Input />
      </Form.Item>
    </>
  )
}
