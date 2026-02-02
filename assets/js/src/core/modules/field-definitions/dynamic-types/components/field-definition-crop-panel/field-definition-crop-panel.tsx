/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Form, FormKit, InputNumber, TextArea } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const FieldDefinitionCropPanel = (): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <FormKit.Panel
      border
      theme="fieldset"
      title={ t('crop-settings') }
    >
      <Form.Item
        label={ t('ratio-x') }
        name="ratioX"
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label={ t('ratio-y') }
        name="ratioY"
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label={ t('predefined-data-templates') }
        name="predefinedDataTemplates"
      >
        <TextArea autoSize />
      </Form.Item>
    </FormKit.Panel>
  )
}
